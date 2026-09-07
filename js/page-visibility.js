/**
 * page-visibility.js
 * site-config.json の pageVisibility 設定に基づき、false に設定されたページを
 * 「準備中」画面に切り替える。
 *
 * 準備中画面に並べるリンクボタンは site-config.json / site-loader.js 側で
 * 一元管理されているものを使う。
 *
 * site-loader.js が発行する siteConfigLoaded イベントを利用する。
 * 既に window.siteConfig が設定済みの場合は即時実行する。
 */
(function () {
  "use strict";

  // 現在のページキーを URL から判定
  function getPageKey() {
    var pathname = window.location.pathname;
    var parts = pathname.split("/");
    var filename = parts[parts.length - 1];
    if (!filename || filename === "") return "index";
    var key = filename.replace(/\.html$/i, "");
    return key || "index";
  }

  function applyComingSoon(config) {
    var pageKey = getPageKey();
    var visibility = config.pageVisibility;

    // pageVisibility 設定がない、または対象ページが公開 (true) なら何もしない
    if (!visibility || visibility[pageKey] !== false) return;

    var festivalName = window.getFestivalName(config);
    var comingSoon = config.comingSoon;

    // 各ページの準備中画面に共通でリンクボタンを表示
    var linksHtml =
      '<div class="coming-soon-links coming-soon-links--grid">' +
      (comingSoon.links || [])
        .map(function (link) {
          return (
            '<a href="' +
            escapeHtml(link.href) +
            '" class="coming-soon-link-btn">' +
            '<i class="fas ' +
            escapeHtml(link.icon) +
            '"></i>' +
            "<span>" +
            escapeHtml(link.label) +
            "</span>" +
            "</a>"
          );
        })
        .join("") +
      "</div>";

    var html =
      '<section class="coming-soon-section">' +
      '<div class="deco-circle deco-circle--dashed deco-circle--xl" style="top: -80px; left: -120px;"></div>' +
      '<div class="deco-circle deco-circle--filled deco-circle--lg" style="bottom: -60px; right: -40px;"></div>' +
      '<div class="deco-circle deco-circle--solid deco-circle--md" style="top: 30px; right: 10%;"></div>' +
      '<div class="coming-soon-content">' +
      '<p class="coming-soon-label">' +
      escapeHtml(comingSoon.label) +
      "</p>" +
      '<h1 class="coming-soon-title">' +
      escapeHtml(comingSoon.title) +
      "</h1>" +
      '<p class="coming-soon-desc">' +
      escapeHtml(festivalName) +
      "の情報は<br>ただいま準備中です。<br>今しばらくお待ちください。</p>" +
      linksHtml +
      "</div>" +
      "</section>";

    // site-loader.js は <body> 末尾で読み込まれるため <main> は必ず存在する
    var main = document.querySelector("main");
    if (!main) return;
    main.innerHTML = html;
  }

  // site-loader.js がすでに config を設定済みなら即時実行、そうでなければイベント待ち
  window.onSiteConfig(applyComingSoon);
})();
