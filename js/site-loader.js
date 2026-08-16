/**
 * site-loader.js
 * site-config.json を読み込み、全ページ共通の要素を動的に生成・注入する。
 *
 * このファイルと js/site-config.json が「全ページ共通部分の唯一の管理場所」です。
 * ヘッダー / フッター / ページトップボタン / アクセス案内 / 協賛・寄付セクションは
 * すべてここで組み立てられ、各HTMLには置き場所を示す目印だけが書かれています。
 *
 *   <div data-include="access-methods"></div>  → アクセス手段の説明
 *   <div data-include="access-map"></div>      → Google Map 経路ボタン
 *   <div data-include="sponsors"></div>        → ご協賛企業セクション
 *   <div data-include="supporters"></div>      → ご寄付者セクション
 */

/**
 * site-config.json の読み込み完了を購読する。
 *
 * siteConfigLoaded イベントを直接 addEventListener すると、
 * リスナー登録より先に発火した場合に取りこぼす（スクリプトの読み込み順や
 * 回線速度で結果が変わる競合状態になる）。
 * 読み込み済みなら即時実行、未了ならイベント待ちに振り分けることで
 * タイミングに依存せず必ず1回実行されるようにする。
 *
 * @param {(config: object) => void} callback
 */
window.onSiteConfig = function (callback) {
  if (window.siteConfig) {
    callback(window.siteConfig);
  } else {
    document.addEventListener("siteConfigLoaded", function (e) {
      callback(e.detail);
    });
  }
};

/**
 * 「第49回技科大祭」のような正式名称を組み立てる。
 * 複数のスクリプトが同じ文字列を必要とするため一箇所に集約する。
 * @param {object} config
 * @returns {string}
 */
window.getFestivalName = function (config) {
  return "第" + config.festivalNumber + "回" + config.festivalName;
};

/**
 * site-config.json 内の本文テキストを HTML に変換する。
 *
 * 先に escapeHtml() で無害化してから記法を展開するため、
 * JSON 側にタグを書いても HTML として解釈されることはない。
 *   \n       → 改行 (<br>)
 *   **文字** → 太字 (<strong>)
 *
 * @param {string} text
 * @returns {string}
 */
window.formatSiteText = function (text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
};

/**
 * 複数ページで使い回す共通セクションの組み立て関数群。
 * page-visibility.js の「準備中」画面からも呼び出される。
 */
window.siteSections = (function () {
  "use strict";

  /** 装飾の円を1つ組み立てる */
  function decoCircle(modifier, size, position) {
    return (
      '<div class="deco-circle deco-circle--' +
      modifier +
      " deco-circle--" +
      size +
      '" style="' +
      position +
      '"></div>'
    );
  }

  /** セクション見出し（英語 + 日本語 + リード文） */
  function sectionHeading(section) {
    return (
      '<h2 class="c"><span>' +
      escapeHtml(section.titleEn) +
      '</span><span class="hosoku">' +
      escapeHtml(section.titleJa) +
      "</span></h2>" +
      '<p class="c">' +
      window.formatSiteText(section.lead) +
      "</p>"
    );
  }

  /** アクセス手段（電車・バス / お車）の説明ブロック */
  function accessMethods(config) {
    return (config.access.methods || [])
      .map(function (method) {
        var html =
          '<div class="access-method">' +
          '<h4><i class="fas ' +
          escapeHtml(method.icon) +
          '"></i>' +
          escapeHtml(method.heading) +
          "</h4>" +
          '<div class="access-description">';

        (method.paragraphs || []).forEach(function (text) {
          html += "<p>" + window.formatSiteText(text) + "</p>";
        });

        // バス出発案内（カウントダウンは js/bus-countdown.js が埋める）
        if (method.busCountdown) {
          html +=
            '<div class="bus-countdown-wrapper">' +
            '<h5><i class="fas fa-bus"></i>' +
            escapeHtml(method.busCountdown.heading) +
            "</h5>" +
            '<p id="bus-schedule-note" class="note"></p>' +
            '<div id="bus-countdown-display">' +
            "<p>次の出発まであと</p>" +
            '<div class="time-container">' +
            '<span id="bus-minutes">--</span><small>分</small>' +
            '<span id="bus-seconds">--</span><small>秒</small>' +
            "</div>" +
            "</div>" +
            '<p class="next-bus-info">発車時刻: <span id="next-bus-time">--:--</span></p>' +
            "</div>";
        }

        (method.notes || []).forEach(function (note) {
          html += '<p class="note">' + window.formatSiteText(note) + "</p>";
        });

        return html + "</div></div>";
      })
      .join("");
  }

  /** Google Map の経路検索ボタン */
  function accessMap(config) {
    var button = config.access.mapButton;
    return (
      '<div class="map-button-container">' +
      '<a id="map-direction-link" href="' +
      escapeHtml(config.access.googleMapsDirection) +
      '" target="_blank" rel="noopener noreferrer" class="map-button">' +
      '<span class="map-button-icon"><i class="fas fa-map-marked-alt"></i></span>' +
      '<span class="map-button-text">' +
      "<strong>" +
      escapeHtml(button.title) +
      "</strong>" +
      "<small>" +
      escapeHtml(button.subtitle) +
      "</small>" +
      "</span>" +
      "</a>" +
      "</div>"
    );
  }

  /** ご協賛企業セクション（中身は renderSupportGrids が後から埋める） */
  function sponsors(config) {
    return (
      '<section id="Sponsors" class="bg1">' +
      decoCircle("dashed", "xl", "top: -80px; left: -100px") +
      decoCircle("solid", "md", "bottom: 20px; right: 5%") +
      decoCircle("dashed", "sm", "top: 40%; right: -20px") +
      sectionHeading(config.sections.sponsors) +
      '<div id="sponsor-grid" class="sponsor-grid"></div>' +
      "</section>"
    );
  }

  /** ご寄付者セクション（中身は renderSupportGrids が後から埋める） */
  function supporters(config) {
    return (
      '<section id="Supporters" class="bg1">' +
      decoCircle("filled", "md", "top: 150px; left: -40px") +
      decoCircle("solid", "sm", "bottom: 100px; right: 8%") +
      sectionHeading(config.sections.supporters) +
      '<div id="supporter-grid" class="supporter-grid"></div>' +
      "</section>"
    );
  }

  return {
    "access-methods": accessMethods,
    "access-map": accessMap,
    sponsors: sponsors,
    supporters: supporters,
  };
})();

/**
 * 協賛企業・ご寄付者の一覧をグリッドに描画する。
 *
 * グリッドは2通りの経路で現れる:
 *   1. 通常ページ … site-loader.js が data-include を展開したとき
 *   2. 準備中ページ … page-visibility.js が <main> を差し替えたとき
 * どちらが先に起きても描画されるよう、両方から呼べる関数として公開する。
 * JSON は一度だけ取得し、2回目以降の呼び出しでは取得結果を使い回す。
 */
window.renderSupportGrids = (function () {
  "use strict";

  var dataPromise = null;

  function loadData() {
    if (!dataPromise) {
      dataPromise = Promise.all([
        fetch("js/sponsors.json").then(function (r) {
          if (!r.ok)
            throw new Error("sponsors.json の読み込みに失敗しました。");
          return r.json();
        }),
        fetch("js/supporters.json").then(function (r) {
          if (!r.ok)
            throw new Error("supporters.json の読み込みに失敗しました。");
          return r.json();
        }),
      ]);
    }
    return dataPromise;
  }

  function renderSponsors(grid, section, data) {
    var html = "";

    // tier1, tier2, tier3 の順番で描画
    ["tier1", "tier2", "tier3"].forEach(function (tierKey) {
      var tierItems = data[tierKey];
      if (tierItems && tierItems.length > 0) {
        var tierNum = tierKey.replace("tier", "");
        // ティアの前に横棒を入れる
        html += '<div class="sponsor-tier-divider"></div>';
        html += '<div class="sponsor-tier sponsor-tier-' + tierNum + '">';
        tierItems.forEach(function (s) {
          var safeName = escapeHtml(s.name);
          // HTMLコメント内は escapeHtml が効かないため、
          // コメントを閉じられる "-->" と "<" "> " を除去してから埋め込む。
          var safeAmount = String(s.amount == null ? "" : s.amount)
            .replace(/[<>]/g, "")
            .replace(/-{2,}/g, "-");
          var amountComment = safeAmount ? "<!-- " + safeAmount + " -->" : "";
          html +=
            '<span class="sponsor-item">' +
            amountComment +
            safeName +
            "</span>";
        });
        html += "</div>";
      }
    });

    if (html) {
      // 最後に締めの横棒
      html += '<div class="sponsor-tier-divider"></div>';
      grid.classList.add("text-only-sponsors");
    } else {
      html =
        '<p class="c" style="width: 100%;">' +
        escapeHtml(section.emptyText) +
        "</p>";
    }
    grid.innerHTML = html;
  }

  function renderSupporters(grid, section, data) {
    var valid = data.filter(function (sp) {
      return !sp._memo;
    });

    // 芳名帳（PDF）リンクを先頭に一元管理で追加
    var html =
      '<div class="c supporter-registry"><a href="' +
      escapeHtml(section.registryUrl) +
      '" target="_blank" rel="noopener noreferrer" class="supporter-registry-btn">' +
      '<i class="fas fa-file-pdf"></i> ' +
      escapeHtml(section.registryLabel) +
      "</a></div>";

    if (valid.length > 0) {
      valid.forEach(function (sp) {
        var safeName = escapeHtml(typeof sp === "string" ? sp : sp.name);
        if (safeName)
          html += '<div class="supporter-chip">' + safeName + "</div>";
      });
    } else {
      html +=
        '<p class="c" style="width: 100%;">' +
        escapeHtml(section.emptyText) +
        "</p>";
    }
    grid.innerHTML = html;
  }

  return async function renderSupportGrids(config) {
    var sponsorGrid = document.getElementById("sponsor-grid");
    var supporterGrid = document.getElementById("supporter-grid");
    if (!sponsorGrid && !supporterGrid) return;

    try {
      var result = await loadData();
      if (sponsorGrid)
        renderSponsors(sponsorGrid, config.sections.sponsors, result[0]);
      if (supporterGrid)
        renderSupporters(supporterGrid, config.sections.supporters, result[1]);
    } catch (error) {
      console.error(error);
      if (sponsorGrid)
        sponsorGrid.innerHTML =
          '<p class="c">' +
          escapeHtml(config.sections.sponsors.errorText) +
          "</p>";
      if (supporterGrid)
        supporterGrid.innerHTML =
          '<p class="c">' +
          escapeHtml(config.sections.supporters.errorText) +
          "</p>";
    }
  };
})();

(async function () {
  "use strict";

  // --- site-config.json の読み込み ---
  let config;
  try {
    const res = await fetch("js/site-config.json");
    if (!res.ok) throw new Error("site-config.json の読み込みに失敗しました。");
    config = await res.json();
  } catch (e) {
    console.error(e);
    return;
  }

  const num = config.festivalNumber;
  const theme = config.theme;
  const univName = config.universityName;
  const fullName = window.getFestivalName(config);
  const festivalDateText = config.dates.displayText;

  // --- 現在のページの公開状態を pageVisibility から判定 ---
  var pathname = window.location.pathname;
  var pageName =
    pathname
      .split("/")
      .pop()
      .replace(/\.html$/i, "") || "index";
  var visibility = config.pageVisibility || {};
  var isPageVisible = visibility[pageName] !== false;

  // --- FOUC防止スクリーンの解除 ---
  // page-visibility.js が非公開ページを「準備中」画面に差し替えるため、
  // body.site-ready は常に付与してプリレンダースクリーンを解除する
  function dismissPrerender() {
    document.body.classList.add("site-ready");
  }

  // --- オープニングアニメーション制御（初回訪問時の index のみ） ---
  var prerenderScreen = document.querySelector(".site-prerender-screen");
  var openingOverlay = prerenderScreen
    ? prerenderScreen.querySelector(".opening-overlay")
    : null;
  var isFirstVisit = !sessionStorage.getItem("opening_shown");

  if (isFirstVisit && openingOverlay && pageName === "index") {
    // 初回訪問 & index.html: オープニングを最後まで見せてからスライドアウト
    sessionStorage.setItem("opening_shown", "1");
    openingOverlay.style.display = "";
    prerenderScreen.classList.add("opening-active");

    // body.site-ready を付与（裏でコンテンツ描画開始）
    document.body.classList.add("site-ready");

    // アニメーション完了後にスライドアウト
    var animDuration = 3900;
    setTimeout(function () {
      prerenderScreen.classList.add("opening-exit");
      prerenderScreen.addEventListener(
        "animationend",
        function (e) {
          if (e.target !== prerenderScreen) return;
          prerenderScreen.remove();
        },
        { once: true },
      );
    }, animDuration);
  } else {
    // 2回目以降 or 他ページ: オープニングHTMLを削除して即座に本編を表示
    if (openingOverlay) openingOverlay.remove();
    dismissPrerender();
  }

  // --- 正規表現 ---
  const festivalReg = /第(?:\d+|--|XX)回\s*技科大祭/g;
  const numOnlyReg = /第(?:\d+|--|XX)回/g;
  const themeReg = /{{THEME}}/g;
  const dateReg = /{{DATE}}/g;
  const univReg = /豊橋技術科学大学|{{UNIVERSITY}}/g;

  // --- <title> の更新 ---
  document.title = document.title
    .replace(festivalReg, fullName)
    .replace(numOnlyReg, "第" + num + "回")
    .replace(themeReg, theme)
    .replace(univReg, univName);

  // --- 各種 Meta タグの更新 (Description, OGP, Twitter, Images) ---
  const metaUpdates = [
    { selector: 'meta[name="description"]', attr: "content" },
    { selector: 'meta[property="og:site_name"]', attr: "content" },
    { selector: 'meta[property="og:title"]', attr: "content" },
    { selector: 'meta[property="og:description"]', attr: "content" },
    { selector: 'meta[name="twitter:title"]', attr: "content" },
    { selector: 'meta[name="twitter:description"]', attr: "content" },
    {
      selector: 'meta[property="og:image"]',
      attr: "content",
      val: config.images.poster,
      overwrite: true,
    },
    {
      selector: 'meta[name="twitter:image"]',
      attr: "content",
      val: config.images.poster,
      overwrite: true,
    },
  ];

  // ページが非公開（pageVisibility が false）の場合のみ: description を準備中テキストに上書き
  // 公開（true）の場合は HTML 初期値が正規表現で正しく置換されるためそのまま
  if (!isPageVisible) {
    var comingSoonDesc =
      fullName +
      "の公式サイトです。現在、サイトは準備中です。公開までしばらくお待ちください。";
    metaUpdates.push(
      {
        selector: 'meta[name="description"]',
        attr: "content",
        val: comingSoonDesc,
        overwrite: true,
      },
      {
        selector: 'meta[property="og:description"]',
        attr: "content",
        val: comingSoonDesc,
        overwrite: true,
      },
      {
        selector: 'meta[name="twitter:description"]',
        attr: "content",
        val: comingSoonDesc,
        overwrite: true,
      },
    );
  }

  metaUpdates.forEach((m) => {
    const el = document.querySelector(m.selector);
    if (el) {
      if (m.overwrite) {
        el.setAttribute(m.attr, m.val);
      } else {
        let content = el.getAttribute(m.attr);
        content = content
          .replace(festivalReg, fullName)
          .replace(numOnlyReg, "第" + num + "回")
          .replace(themeReg, theme)
          .replace(dateReg, festivalDateText)
          .replace(univReg, univName);
        el.setAttribute(m.attr, content);
      }
    }
  });

  // --- 隠し見出し (SEO/アクセシビリティ) の更新 ---
  const srOnlyH1 = document.querySelector("h1.sr-only");
  if (srOnlyH1) {
    srOnlyH1.textContent = srOnlyH1.textContent
      .replace(festivalReg, fullName)
      .replace(numOnlyReg, "第" + num + "回")
      .replace(themeReg, theme)
      .replace(univReg, univName);
  }

  // --- JSON-LD (構造化データ) の更新 ---
  const jsonLdScript = document.querySelector(
    'script[type="application/ld+json"]',
  );
  if (jsonLdScript) {
    try {
      let ld = JSON.parse(jsonLdScript.textContent);

      const updateLd = (obj) => {
        for (let key in obj) {
          if (typeof obj[key] === "string") {
            // 特定のキーを config の値で上書き
            if (key === "startDate") obj[key] = config.dates.start;
            else if (key === "endDate") obj[key] = config.dates.end;
            else if (key === "email") obj[key] = config.contact.email;
            else if (key === "postalCode")
              obj[key] = config.address.postalCode.replace(/[^0-9-]/g, "");
            else if (key === "streetAddress") obj[key] = config.address.text;
            else if (
              key === "name" &&
              (obj["@type"] === "Place" || obj["@type"] === "Organization")
            ) {
              if (obj["@type"] === "Place") obj[key] = config.universityName;
              else if (obj["@type"] === "Organization")
                obj[key] = fullName + "実行委員会";
            } else {
              // それ以外は文字列置換
              obj[key] = obj[key]
                .replace(festivalReg, fullName)
                .replace(numOnlyReg, "第" + num + "回")
                .replace(themeReg, theme)
                .replace(dateReg, festivalDateText)
                .replace(univReg, univName);
            }
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            updateLd(obj[key]);
          }
        }
      };
      updateLd(ld);

      // カノニカルな画像パスの修正
      if (ld.image && typeof ld.image === "string") {
        ld.image =
          window.location.origin +
          window.location.pathname.replace(/\/[^\/]*$/, "/") +
          config.images.poster;
      }

      jsonLdScript.textContent = JSON.stringify(ld, null, 2);
    } catch (e) {
      console.warn("JSON-LD のパースに失敗しました:", e);
    }
  }

  // --- 本文内のプレースホルダー置換 ---
  const replaceTextInNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue
        .replace(festivalReg, fullName)
        .replace(numOnlyReg, "第" + num + "回")
        .replace(themeReg, theme)
        .replace(dateReg, festivalDateText)
        .replace(univReg, univName);
    } else {
      for (let child of node.childNodes) {
        if (child.nodeName !== "SCRIPT" && child.nodeName !== "STYLE") {
          replaceTextInNode(child);
        }
      }
    }
  };
  replaceTextInNode(document.body);

  // --- ヘッダーの動的生成 ---
  const headerEl = document.querySelector("header");
  if (headerEl) {
    // pc用ナビゲーション
    const pcNavItems = (config.headerNav || [])
      .map(function (item) {
        if (item.children) {
          const childrenHtml = item.children
            .map(function (child) {
              return (
                '<li><a href="' + child.href + '">' + child.label + "</a></li>"
              );
            })
            .join("\n\t\t\t\t\t\t\t\t");
          return (
            '<li class="ddmenu_parent"><a href="#">' +
            item.label +
            "</a>\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t" +
            childrenHtml +
            "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>"
          );
        } else {
          return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
        }
      })
      .join("\n\t\t\t\t\t\t");

    // sp用ナビゲーション (フラット化)
    let spNavItems = "";
    (config.headerNav || []).forEach(function (item) {
      if (item.children) {
        item.children.forEach(function (child) {
          spNavItems +=
            '<li><a href="' +
            child.href +
            '">' +
            child.label +
            "</a></li>\n\t\t\t\t\t\t";
        });
      } else {
        spNavItems +=
          '<li><a href="' +
          item.href +
          '">' +
          item.label +
          "</a></li>\n\t\t\t\t\t\t";
      }
    });

    const actionBtn =
      config.headerActions && config.headerActions.button
        ? '<a href="' +
          config.headerActions.button.href +
          '" class="header-contact-btn">' +
          config.headerActions.button.label +
          "</a>"
        : "";

    headerEl.innerHTML =
      '<div class="header-inner">\n' +
      '\t\t<div id="logo">\n' +
      '\t\t\t<a href="index.html">\n' +
      '\t\t\t\t<img src="images/TUTFESlogo.png" alt="技科大祭ロゴ" class="header-logo-img">\n' +
      '\t\t\t\t<div class="logo-text-group">\n' +
      '\t\t\t\t\t<div id="daigaku">' +
      univName +
      "</div>\n" +
      '\t\t\t\t\t<div id="gikadaisai">' +
      fullName +
      "</div>\n" +
      "\t\t\t\t</div>\n" +
      "\t\t\t</a>\n" +
      "\t\t</div>\n\n" +
      '\t\t<nav id="menubar-pc">\n' +
      "\t\t\t<ul>\n" +
      "\t\t\t\t" +
      pcNavItems +
      "\n" +
      "\t\t\t</ul>\n" +
      "\t\t</nav>\n\n" +
      '\t\t<div class="header-actions">\n' +
      "\t\t\t" +
      actionBtn +
      "\n" +
      '\t\t\t<div id="menubar_hdr"><span></span><span></span><span></span></div>\n' +
      "\t\t</div>\n" +
      "\t</div>\n\n" +
      '\t<div id="menubar">\n' +
      '\t\t<nav id="menubar-sp">\n' +
      "\t\t\t<ul>\n" +
      "\t\t\t\t" +
      spNavItems.trim() +
      "\n" +
      "\t\t\t</ul>\n" +
      "\t\t</nav>\n" +
      "\t</div>";
  }

  // --- フッターの動的生成 ---
  const footerEl = document.querySelector("footer");
  if (footerEl) {
    // Menu ナビゲーション
    const menuItems = (config.footerNav || [])
      .map(function (item) {
        return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
      })
      .join("\n\t\t\t\t");

    // Links（外部リンク）
    const linkItems = (config.footerLinks || [])
      .map(function (item) {
        return (
          '<li><a href="' +
          item.href +
          '" target="_blank" rel="noopener noreferrer">' +
          item.label +
          "</a></li>"
        );
      })
      .join("\n\t\t\t\t");

    footerEl.innerHTML =
      '<div class="footer-container">\n' +
      '\t\t<div class="footer-col">\n' +
      '\t\t\t<div class="logo-footer">\n' +
      '\t\t\t\t<a href="index.html">\n' +
      '\t\t\t\t\t<span class="daigaku-footer">' +
      univName +
      "</span>\n" +
      '\t\t\t\t\t<span class="gikadaisai-footer">' +
      fullName +
      "</span>\n" +
      "\t\t\t\t</a>\n" +
      "\t\t\t</div>\n" +
      '\t\t\t<address class="footer-address">\n' +
      "\t\t\t\t" +
      config.address.postalCode +
      "<br>\n" +
      "\t\t\t\t" +
      config.address.text +
      "\n" +
      "\t\t\t</address>\n" +
      '\t\t\t<img src="images/TUTFESlogo.png" alt="技科大祭ロゴ" class="footer-logo-img">\n' +
      "\t\t</div>\n" +
      '\t\t<div class="footer-col">\n' +
      "\t\t\t<h4>Menu</h4>\n" +
      '\t\t\t<ul class="footer-nav">\n' +
      "\t\t\t\t" +
      menuItems +
      "\n" +
      "\t\t\t</ul>\n" +
      "\t\t</div>\n" +
      '\t\t<div class="footer-col">\n' +
      "\t\t\t<h4>Links</h4>\n" +
      '\t\t\t<ul class="footer-nav">\n' +
      "\t\t\t\t" +
      linkItems +
      "\n" +
      "\t\t\t</ul>\n" +
      "\t\t</div>\n" +
      "\t</div>\n" +
      '\t<div class="footer-bottom">\n' +
      "\t\t<small>Copyright&copy; " +
      fullName +
      "実行委員会 All Rights Reserved.</small>\n" +
      "\t</div>";
  }

  // --- ページトップへ戻るボタン（全ページ共通） ---
  const containerEl = document.getElementById("container");
  if (containerEl && !document.querySelector(".pagetop")) {
    const pagetop = document.createElement("div");
    pagetop.className = "pagetop";
    pagetop.innerHTML =
      '<a href="#"><i class="fas fa-angle-double-up"></i></a>';
    containerEl.appendChild(pagetop);
  }

  // --- data-include の目印を共通セクションに置き換える ---
  document.querySelectorAll("[data-include]").forEach(function (el) {
    const builder = window.siteSections[el.dataset.include];
    if (builder) el.innerHTML = builder(config);
  });

  // --- グローバルに config を公開 ---
  window.siteConfig = config;
  document.dispatchEvent(
    new CustomEvent("siteConfigLoaded", { detail: config }),
  );

  // --- 協賛・寄付者の一覧を描画 ---
  await window.renderSupportGrids(config);

  // --- すべての処理が完了したのでプリレンダースクリーンを解除 ---
  dismissPrerender();
})();
