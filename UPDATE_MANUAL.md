# 技科大祭ホームページ 更新マニュアル

このドキュメントは、技科大祭ホームページを来年度以降に引き継ぎ・更新するための手順書です。

**最重要の原則: 更新作業のほとんどは `js/` フォルダの JSON ファイルを書き換えるだけで完了します。HTMLファイルを直接編集する必要は原則ありません。**

---

## 目次

1. [ファイル構成の概要](#1-ファイル構成の概要)
2. [毎年必ず更新するもの（チェックリスト）](#2-毎年必ず更新するものチェックリスト)
3. [全ページ共通部分のしくみ](#3-全ページ共通部分のしくみ)
4. [各JSONファイルの編集方法](#4-各jsonファイルの編集方法)
5. [ページの公開・非公開を切り替える](#5-ページの公開非公開を切り替える)
6. [JSONでは管理していない箇所（HTMLを直接編集する場所）](#6-jsonでは管理していない箇所htmlを直接編集する場所)
7. [画像ファイルの差し替え](#7-画像ファイルの差し替え)
8. [JSONの書き方の注意点](#8-jsonの書き方の注意点)
9. [ローカルでの動作確認方法](#9-ローカルでの動作確認方法)
10. [よくあるエラーと対処法](#10-よくあるエラーと対処法)
11. [開発環境のセットアップとGit運用ルール](#11-開発環境のセットアップとgit運用ルール)
12. [セキュリティ上の注意（担当者への申し送り）](#12-セキュリティ上の注意担当者への申し送り)
13. [付録: 年次更新の流れまとめ](#付録-年次更新の流れまとめ)

---

## 1. ファイル構成の概要

```
gikadaisai/
├── index.html            ← トップページ
├── guest.html            ← 今年のゲスト（ヘッダー右のボタンから遷移）
├── events.html           ← 予定イベント
├── shops.html            ← 模擬店・キッチンカー
├── timetable.html        ← タイムテーブル
├── painting-contest.html ← アイデア・デザインコンテスト
├── support.html          ← ご協賛・ご寄付
├── access.html           ← アクセス
├── contact.html          ← お問い合わせ
│
├── js/
│   ├── site-config.json    ★ サイト全体の設定（最重要・毎年ここから始める）
│   ├── guest.json          ★ ゲスト情報
│   ├── shop.json           ★ 模擬店・キッチンカー情報
│   ├── sponsors.json       ★ 協賛企業情報
│   ├── supporters.json     ★ ご寄付者情報
│   ├── timetable.json      ★ バス時刻表
│   │
│   ├── site-loader.js      ← 共通部分の生成（編集不要）
│   ├── page-visibility.js  ← 公開・非公開切り替え（編集不要）
│   ├── festival-countdown.js ← 開催カウントダウン（編集不要）
│   ├── bus-countdown.js    ← バスカウントダウン（編集不要）
│   ├── escape-html.js      ← 安全対策の共通処理（編集不要）
│   └── main.js             ← メニュー・スクロール（編集不要）
│
├── css/
│   ├── style.css           ← 全ページ共通のデザイン
│   ├── index.css           ← トップページ専用のデザイン
│   └── painting-contest.css ← コンテストページ専用のデザイン
│
├── data/
│   ├── poster.png          ★ テーマポスター画像
│   ├── poster_live.png     ★ イベントポスター画像
│   ├── timetable.png       ★ タイムテーブル画像
│   ├── map/                ★ 会場マップ画像（inside.png / outside.png）
│   ├── shop/icon/          ★ 模擬店アイコン画像
│   └── kyousan/            △ 協賛企業ロゴ画像（現在は未使用・後述）
│
├── images/                 ← サイトのデザインで使う画像（通常は変更不要）
└── sitemap.xml             ← 検索エンジン向けのページ一覧
```

**★ マークのファイルが毎年の更新対象です。**

> **`data/kyousan/` について**
> 現在、協賛企業は**ロゴ画像ではなく企業名テキスト**で表示しています（`sponsors.json` 参照）。
> そのため `data/kyousan/` の画像は今は使われていませんが、将来ロゴ表示に戻す可能性を考慮して残してあります。

---

## 2. 毎年必ず更新するもの（チェックリスト）

以下を上から順に対応してください。

- [ ] `js/site-config.json` — 回数・日程・テーマ・メールアドレス等（**最初にここ**）
- [ ] `js/guest.json` — ゲスト情報
- [ ] `js/shop.json` — 模擬店・キッチンカーのデータ
- [ ] `js/sponsors.json` — 協賛企業の情報
- [ ] `js/supporters.json` — ご寄付者の情報
- [ ] `js/timetable.json` — バス時刻表（ダイヤ改正があった場合のみ）
- [ ] `data/poster.png` — テーマポスター画像の差し替え
- [ ] `data/poster_live.png` — イベントポスター画像の差し替え
- [ ] `data/timetable.png` — タイムテーブル画像の差し替え
- [ ] `data/map/` — 会場マップ画像の差し替え（inside.png, outside.png）
- [ ] `data/shop/icon/` — 模擬店アイコン画像の差し替え
- [ ] `index.html` — トップページ本文（実績・開催概要など。[第6章](#6-jsonでは管理していない箇所htmlを直接編集する場所)参照）
- [ ] `painting-contest.html` — コンテストの締切・テーマ（[第6章](#6-jsonでは管理していない箇所htmlを直接編集する場所)参照）
- [ ] `sitemap.xml` — ページを増減した場合のみ

---

## 3. 全ページ共通部分のしくみ

**ヘッダー・フッター・ページトップボタン・アクセス案内・協賛/寄付セクションは、HTMLには書かれていません。**
`js/site-config.json` の内容をもとに `js/site-loader.js` が組み立て、全ページに差し込んでいます。

そのため、**1箇所（site-config.json）を直すだけで全ページに反映されます。**

### 3-1. HTMLに書かれている「目印」

各HTMLには、共通部分を差し込む位置を示す目印だけが置かれています。

| 目印                                        | 差し込まれるもの           |
| ------------------------------------------- | -------------------------- |
| `<header></header>`                         | ヘッダー（ロゴ・ナビ）     |
| `<footer></footer>`                         | フッター（住所・リンク集） |
| `<div data-include="access-methods"></div>` | アクセス手段の説明         |
| `<div data-include="access-map"></div>`     | Google Map の経路ボタン    |
| `<div data-include="sponsors"></div>`       | ご協賛企業セクション       |
| `<div data-include="supporters"></div>`     | ご寄付者セクション         |

ページトップへ戻るボタンは目印すら不要で、全ページに自動で追加されます。

### 3-2. 文章内で使える記法

`site-config.json` の**文章の項目**（アクセス案内・セクションの説明文など）では、次の2つが使えます。

| 書き方       | 表示結果 |
| ------------ | -------- |
| `\n`         | 改行     |
| `**文字列**` | **太字** |

例:

```json
"paragraphs": ["**JR各線・名鉄名古屋本線「豊橋駅」**で下車。\n豊橋駅東口バス乗り場から…"]
```

> **なぜタグを直接書けないの？**
> JSONに書いた文字は、安全のためすべて「ただの文字」として扱われます（HTMLタグとして解釈されません）。
> これは、誤った内容が書き込まれた場合にページが壊れたり悪用されたりするのを防ぐためです。
> 改行と太字だけは、上の専用の記法で指定できるようにしてあります。

### 3-3. HTMLの `<head>` について

各HTMLの上部にある以下の項目は、**ページごとに内容が違う必要がある**ため、各HTMLに残しています。

- `<title>` … ページのタイトル
- `<meta name="description">` … 検索結果に出る説明文
- `og:` / `twitter:` … SNSでシェアしたときの見え方（OGP）

ただし、この中の `第--回` や `{{THEME}}` といった**プレースホルダーは自動で置き換わる**ため、
回数やテーマが変わっても手を入れる必要はありません。

| プレースホルダー | 置き換わる内容                           |
| ---------------- | ---------------------------------------- |
| `第--回`         | `festivalNumber`（例：第49回）           |
| `{{THEME}}`      | `theme`（例：繋ぐ）                      |
| `{{DATE}}`       | `dates.displayText`（例：10月10日(土)…） |
| `{{UNIVERSITY}}` | `universityName`（例：豊橋技術科学大学） |

Google検索用の構造化データ（JSON-LD）の日付・住所・メールアドレスも自動で同期されます。

---

## 4. 各JSONファイルの編集方法

### 4-1. site-config.json（サイト全体の設定）

**このファイルを更新するだけで、全ページの回数・テーマ・日程・ナビゲーション・共通文章が切り替わります。**

```json
{
  "festivalNumber": 49,                  ← 開催回数（数値。クォート不要）
  "festivalName": "技科大祭",             ← 基本変更不要
  "universityName": "豊橋技術科学大学",    ← 基本変更不要
  "theme": "繋ぐ",                        ← 今年のテーマ

  "dates": {
    "start": "2026-10-10T10:00:00",       ← 1日目の開場日時
    "end": "2026-10-11T18:00:00",         ← 最終日の終了日時
    "displayText": "10月10日(土)・11日(日)" ← 表示用テキスト
  },

  "contact": { "email": "tut.festival@gmail.com" },

  "sns": {
    "x": "https://x.com/tut_festival",
    "instagram": "https://www.instagram.com/tut_festival/"
  },

  "address": {
    "postalCode": "〒441-8580",
    "text": "愛知県豊橋市天伯町雲雀ヶ丘1-1"
  },

  "images": {
    "poster": "data/poster.png",
    "posterLive": "data/poster_live.png",
    "timetable": "data/timetable.png"
  }
}
```

**日付の書き方**: `"2026-10-10T10:00:00"` の形式です。`T` の左が日付、右が時刻。
`start` は1日目の開場時刻、`end` は最終日の終了時刻を指定します。
この2つでトップページのカウントダウンと「開催中」「ご来場ありがとうございました」の切り替えが決まります。

#### access（アクセス案内）

index.html と access.html の**両方**に同じ内容が表示されます。

```json
"access": {
  "googleMapsEmbed": "https://www.google.com/maps/embed?…",   ← 埋め込み地図のURL
  "googleMapsDirection": "https://www.google.com/maps/dir/…", ← 経路検索のURL
  "mapButton": {
    "title": "Google Mapで経路を確認",
    "subtitle": "大学までのルートを検索"
  },
  "methods": [
    {
      "icon": "fa-train-subway",        ← Font Awesome のアイコン名
      "heading": "電車・バスでお越しの方",
      "paragraphs": ["本文（\n で改行、**太字**）"],
      "notes": [],                       ← 小さい注釈（※〜など）
      "busCountdown": {                  ← 次のバスまでのカウントダウンを表示する場合のみ
        "heading": "技科大線の出発案内（豊橋駅前 発）"
      }
    }
  ]
}
```

移動手段を増やしたい場合は `methods` にオブジェクトを追加してください。

#### sections（協賛・寄付セクションの文章）

index.html / support.html / 準備中ページの**すべて**に反映されます。

```json
"sections": {
  "sponsors": {
    "titleEn": "Sponsors",
    "titleJa": "ご協賛企業",
    "lead": "説明文（\n で改行）",
    "emptyText": "協賛企業が0件のときに表示する文",
    "errorText": "読み込みに失敗したときに表示する文"
  },
  "supporters": {
    "titleEn": "Supporters",
    "titleJa": "ご寄付いただいた皆様",
    "lead": "説明文",
    "emptyText": "…",
    "errorText": "…",
    "registryUrl": "https://www.tut.ac.jp/kikin/download/houmei_gikadaisai.pdf",
    "registryLabel": "芳名帳（PDF）はこちら"
  }
}
```

#### headerNav / headerActions / footerNav / footerLinks（ナビゲーション）

ヘッダーとフッターのメニューです。ここを直すと全ページのメニューが変わります。

```json
"headerNav": [
  { "href": "index.html", "label": "トップ" },
  {
    "label": "予定企画",                    ← href がない項目はドロップダウンになる
    "children": [
      { "href": "events.html", "label": "予定イベント" },
      { "href": "shops.html", "label": "模擬店・キッチンカー" }
    ]
  }
],
"headerActions": {
  "button": { "href": "guest.html", "label": "今年のゲスト" }  ← ヘッダー右の目立つボタン
},
"footerNav":   [ … ],   ← フッターの「Menu」欄（サイト内リンク）
"footerLinks": [ … ]    ← フッターの「Links」欄（外部リンク・別タブで開く）
```

> **ページを増やしたとき**は、`headerNav` / `footerNav` にリンクを追加し、
> `pageVisibility` にもキーを追加してください（[第5章](#5-ページの公開非公開を切り替える)）。

#### comingSoon（準備中ページ）

非公開ページに表示される案内です。

```json
"comingSoon": {
  "label": "Coming Soon",
  "title": "準備中",
  "links": [
    { "href": "support.html", "icon": "fa-hand-holding-heart", "label": "ご協賛・ご寄付" }
  ]
}
```

### 4-2. guest.json（ゲスト情報）

`guest.html` に表示されます。配列なので、複数のゲスト企画を並べられます。

```json
[
  {
    "title": "スペシャルお笑いライブ",
    "displayDatetime": "10月11日(日) 11:30〜",
    "description": "説明文。\n改行は \\n で記述。",
    "poster": "data/poster_live.png",
    "cautions": ["注意事項1", "注意事項2"],
    "otherNotes": ["その他の注意1"],
    "warningText": "警告文。\n複数行は \\n で。",
    "closingText": "締めの一文。"
  }
]
```

**ポイント**

- `title` はポスター画像の代替テキスト（alt）にも使われます
- `poster` を省略するとポスター画像は表示されません
- `cautions` / `otherNotes` を空配列 `[]` にすると、その見出しごと表示されません

### 4-3. shop.json（模擬店・キッチンカー）

```json
[
  {
    "circle": "アニメーション＆コミック研究会", ← 団体名
    "title": "アニメーション＆コミック研究会",   ← 店名・企画名
    "place": "室内",                          ← "室内" または "屋外"
    "location": "A-114",                      ← 場所コード
    "img": "1.png"                            ← アイコン画像のファイル名
  }
]
```

**ポイント**

- **並び順は配列に書いた順**です。順番を変えたいときは行ごと入れ替えてください
- `img` は `data/shop/icon/` 内のファイル名だけを書きます（拡張子込み）
- `img` が未指定・存在しない場合は `data/shop/icon/default.png` に切り替わりますが、
  **現在このファイルは配置されていません**。画像なしの店舗を作る予定があるなら、
  先に `data/shop/icon/default.png` を用意してください（無いと画像が壊れた表示になります）
- `place` は `"室内"` か `"屋外"` のいずれか。ページ上の絞り込み（屋内企画／屋外企画）で使われます
- キッチンカーのアイコンは `A.png`〜`D.png` のようにアルファベットを使っています

### 4-4. sponsors.json（協賛企業）

**金額のランクごとに3つのグループ（tier）に分けて、企業名を文字で表示します。**
tier1 が最も大きく表示され、tier3 が最も小さく表示されます。

```json
{
  "tier1": [{ "name": "株式会社ワイエムジー" }],
  "tier2": [
    { "name": "株式会社新来島豊橋造船" },
    { "name": "本多電子株式会社" }
  ],
  "tier3": [{ "name": "株式会社金トビ志賀" }]
}
```

**ポイント**

- `name` がページに表示されます
- **表示順・文字サイズは tier(1〜3)と配列内の並び順だけで決まります。**
  tier1 が最も大きく、tier3 が最も小さく表示されます
- 企業が1社もいない tier は、その行ごと空配列 `[]` にするか、キーごと消してかまいません
- 全体が空の場合は `sections.sponsors.emptyText` の文が表示されます

> **⚠️ 協賛金額をこのファイルに書かないでください**
> このJSONは公開サーバー上に置かれるため、`https://（サイトURL）/js/sponsors.json`
> を開けば**誰でも中身を読めます**。GitHubリポジトリも公開されています。
> 企業ごとの協賛金額は非公開情報のため、金額の管理はリポジトリの外
> （実行委員会内のスプレッドシート等）で行ってください。
> 以前は `amount` という項目がありましたが、同じ理由で廃止しました。

### 4-5. supporters.json（ご寄付者）

```json
[{ "name": "技科 太郎" }, { "name": "豊橋 花子" }]
```

**ポイント**

- 文字列だけの配列 `["技科 太郎"]` でも動作します
- `_memo` を持つ要素は表示されません（メモ書き用）。初期状態は
  `[{ "_memo": "ここに寄付個人名を追加していく" }]` になっています
- 寄付者が0人のときは `sections.supporters.emptyText` の文が表示されます
- 芳名帳PDFへのボタンは常に先頭に表示されます（URLは `site-config.json` の `registryUrl`）

### 4-6. timetable.json（バス時刻表）

```json
{
  "weekday": ["07:05", "07:10", "07:30"],
  "saturday": ["07:05", "07:30", "07:55"],
  "sunday": ["07:05", "07:30", "07:55"]
}
```

**ポイント**

- 時刻は `"HH:MM"` 形式（24時間表記）
- 必ず**昇順（早い順）**に並べてください
- バス会社のダイヤ改正があった場合のみ更新が必要です
- 平日に閲覧すると「※表示は平日ダイヤです」という注意書きが自動で出ます

---

## 5. ページの公開・非公開を切り替える

`js/site-config.json` の **`pageVisibility`** を編集するだけで切り替えられます。HTMLの編集は不要です。

```json
"pageVisibility": {
    "index":            true,
    "guest":            true,
    "events":           true,
    "shops":            true,
    "timetable":        true,
    "painting-contest": true,
    "support":          true,
    "access":           true,
    "contact":          true
}
```

| 値      | 表示                         |
| ------- | ---------------------------- |
| `true`  | 通常のページとして公開される |
| `false` | 「準備中」画面が表示される   |

**キー名は HTMLファイル名から `.html` を除いたもの**です（`painting-contest.html` → `painting-contest`）。

### 「準備中」画面に表示される内容

`false` にしたページは、どのページでも共通して次の内容に差し替わります。

1. 「Coming Soon / 準備中」の見出し
2. `comingSoon.links` で設定したリンクボタン（初期値は ご協賛・ご寄付／トップページへ／アクセス／お問い合わせ の4つ）
3. ご協賛企業セクション
4. ご寄付者セクション

検索結果やSNSシェア時の説明文も、自動的に「現在、サイトは準備中です」に切り替わります。

### 使用例：情報解禁前の運用

```json
"pageVisibility": {
    "index":            false,   ← トップは準備中
    "guest":            false,   ← ゲスト情報は未公開
    "events":           false,
    "shops":            false,
    "timetable":        false,
    "painting-contest": true,    ← コンテストは先行公開
    "support":          true,    ← ご協賛・ご寄付は常時公開
    "access":           true,
    "contact":          true
}
```

> **注意**: `pageVisibility` はブラウザ上のJavaScriptで制御しているため、URLを直接知っている人はページの元データにアクセスできてしまいます。
> 秘密情報の保護には使えません。あくまで「準備中である旨を案内する」用途に限定してください。

---

## 6. JSONでは管理していない箇所（HTMLを直接編集する場所）

ほとんどはJSONで完結しますが、次の3箇所だけはHTMLを直接編集します。

### 6-1. index.html のトップページ本文

「昨年の実績（Highlights）」「開催概要（Overview）」「特別企画（Events）」「ご支援（Support）」の各セクションは、
その年ごとに文章も構成も大きく変わるため、HTMLに直接書いています。

具体的には以下を毎年見直してください。

- 来場者数などの実績値
- 開催概要の表（前年実績 / 今年計画の各行）
- 特別企画のカード
- ご協賛・ご寄付の申込フォームURL（Googleフォーム等）

> 表の見出しにある「第○回」の部分は `festivalNumber` から自動計算されるため、編集不要です。

### 6-2. painting-contest.html

コンテストのテーマ・応募締切・問い合わせ先はこのHTML内に直接書かれています。

| 変更したいもの     | 場所                                                               |
| ------------------ | ------------------------------------------------------------------ |
| 締切カウントダウン | ページ末尾の `<script>` 内 `new Date("2026-09-05T23:59:00+09:00")` |
| 締切の表示文字     | `2026年9月5日（土）` と書かれている箇所（複数あります）            |
| 募集テーマ         | `pc-hero-theme-text` と `pc-theme-main` の2箇所                    |
| 応募フォームURL    | `https://forms.gle/…` のリンク                                     |
| 問い合わせ先       | `tutfes.kaijou@gmail.com`                                          |

> 締切カウントダウンの日付と、表示している締切の日付が**ずれないよう**に必ず両方直してください。

### 6-3. events.html

現在は「準備中です」という案内のみのページです。
イベント一覧を掲載する場合はこのHTMLの `<main>` 内を編集してください。
掲載予定がない年は `pageVisibility` の `events` を `false` にしておくのが簡単です。

---

## 7. 画像ファイルの差し替え

画像は**同じファイル名で上書き**すれば、HTMLやJSONの変更は不要です。

| 画像             | パス                   | 推奨事項                        |
| ---------------- | ---------------------- | ------------------------------- |
| テーマポスター   | `data/poster.png`      | できるだけ軽量化（1MB以下推奨） |
| イベントポスター | `data/poster_live.png` | 同上                            |
| タイムテーブル   | `data/timetable.png`   | 同上                            |
| 屋外マップ       | `data/map/outside.png` | -                               |
| 屋内マップ       | `data/map/inside.png`  | -                               |
| 模擬店アイコン   | `data/shop/icon/{img}` | shop.json の `img` と一致させる |

**ファイル名を変更した場合**は、対応するJSONのパスも更新してください。

`images/` フォルダはサイトのデザインで使う画像（ロゴ・マスコット・花火の装飾など）です。通常は変更しません。

---

## 8. JSONの書き方の注意点

JSONは書き方を少しでも間違えるとページが表示されなくなります。

### よくあるミス

| ミス               | 誤                 | 正                     |
| ------------------ | ------------------ | ---------------------- |
| 最後のカンマ       | `"name": "A",` `}` | `"name": "A"` `}`      |
| シングルクォート   | `'hello'`          | `"hello"`              |
| コメント           | `// コメント`      | ← JSONではコメント不可 |
| 全角文字の混入     | `"name"："A"`      | `"name": "A"`          |
| 改行をそのまま入力 | 文中で実際に改行   | `\n` と書く            |

### チェック方法

1. VS Code でJSONファイルを開くと、エラー箇所に赤い波線が表示されます
2. [JSONLint](https://jsonlint.com/) に貼り付けて「Validate JSON」でも確認できます

---

## 9. ローカルでの動作確認方法

JSONを `fetch()` で読み込むため、**HTMLファイルをダブルクリックして開く（file:// ）と動作しません**。
必ずローカルサーバーを起動してください。

### 方法1: VS Code の Live Server（推奨）

1. VS Code に「Live Server」拡張機能をインストール
2. `index.html` を右クリック →「Open with Live Server」

### 方法2: Python の簡易サーバー

```bash
cd gikadaisai
python -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセスしてください。

### 方法3: Node.js の簡易サーバー

```bash
npx serve .
```

### 確認するとよいポイント

- ヘッダー／フッターのメニューが正しく出ているか
- 「第○回」「テーマ」「開催日」が新しい値になっているか
- トップページのカウントダウンが動いているか
- 模擬店一覧のアイコンが表示され、絞り込み・並び替えが動くか
- ブラウザの開発者ツール（F12）→ Console タブに赤いエラーが出ていないか

---

## 10. よくあるエラーと対処法

### 「ページが真っ白になった」「ヘッダーもフッターも出ない」

**原因**: JSONの文法エラーの可能性が高いです。`site-config.json` が読めないと共通部分が一切生成されません。

**対処法**:

1. 開発者ツール（F12）→ Console タブを確認
2. エラーに出ているJSONファイルを [JSONLint](https://jsonlint.com/) でチェック

### 「file:// で開いたら何も表示されない」

**原因**: ローカルサーバーを使っていません。[第9章](#9-ローカルでの動作確認方法)の方法で起動してください。

### 「模擬店のアイコンが表示されない」

**原因**: `shop.json` の `img` と実際の画像ファイル名が一致していません。

**対処法**: `"img": "5.png"` なら `data/shop/icon/5.png` が必要です。
ファイル名が一致しているか、拡張子まで含めて確認してください。
（不一致の場合は `default.png` に切り替わりますが、現在そのファイルは未配置のため画像が壊れた表示になります）

### 「カウントダウンが 00:00:00 のまま」

**原因**: `site-config.json` の `dates.start` の書式が誤っています。

**対処法**: `"start": "2026-10-10T10:00:00"` のように `T` 区切りで記述してください。

### 「ヘッダーやフッターの回数が更新されない」

**原因**: `festivalNumber` が更新されていない、または文字列になっています。

**対処法**: `"festivalNumber": 49` のように**数値**（クォーテーションなし）で記入してください。

### 「ページが「準備中」のまま公開されない」

**対処法**: `js/site-config.json` の `pageVisibility` の該当キーを `false` → `true` に変更して保存してください。
キー名がファイル名（`.html` を除く）と一致しているかも確認してください。

### 「協賛企業／寄付者が表示されない」

**原因**: `sponsors.json` / `supporters.json` の文法エラー、または中身が空です。

**対処法**: JSONLintでチェックしてください。データが空の場合は「募集しております」等の案内文が出るのが正常です。

### 「アクセス案内や協賛セクションが出てこない」

**原因**: HTMLから `<div data-include="…"></div>` の目印が消えている可能性があります。

**対処法**: [第3章](#3-全ページ共通部分のしくみ)の表を参照し、目印を元に戻してください。

---

## 11. 開発環境のセットアップとGit運用ルール

改行コード・空白・インデントの表記ゆれを防ぐため、自動整形設定（Prettier / EditorConfig / Husky）を導入しています。
作業を開始する開発者は、以下を必ず実施してください。

1. **変更内容のコミット**
   作業中のファイルがある場合は先にコミットしてください。

2. **リポジトリの再クローン**
   改行コードの設定を正しく反映させるため、一度削除して再クローンしてください。

   ```bash
   git clone <リポジトリのURL>
   ```

3. **拡張機能のインストール**
   Antigravity または VS Code で以下2つをインストールしてください。
   - **Prettier - Code formatter**
   - **EditorConfig for VS Code**

4. **依存パッケージのインストール**

   ```bash
   npm install
   ```

   これでコミット時に自動整形する仕組み（Husky）が有効になります。

5. **git blame 設定の適用**（一度だけ）

   ```bash
   git config blame.ignoreRevsFile .git-blame-ignore-revs
   ```

### 今後の開発・運用における変化

- **保存時:** 自動でコードが整形されます
- **コミット時:** 自動整形（Husky + lint-staged）が実行されます
- **PR作成後:** GitHub Actions のフォーマットチェックに失敗するとマージできません
  （エラーが出た場合は `npm run format` を実行してから再度コミット・pushしてください）

---

## 12. セキュリティ上の注意（担当者への申し送り）

### 12-1. 公開ファイルに非公開情報を書かない

`js/` フォルダのJSONは、そのまま公開サーバーに置かれます。
つまり `https://（サイトURL）/js/sponsors.json` を開けば**誰でも中身を全部読めます**。
GitHubリポジトリも公開されているため、そちらからも読めます。

したがって、以下は**絶対にJSONやHTMLに書かないでください**。

- 企業ごとの協賛金額
- 個人の連絡先（電話番号・住所・メールアドレス）
- 実行委員会内部の連絡事項・原価・見積
- パスワードやAPIキーの類

> HTMLコメント（`<!-- ... -->`）に書けば隠せる、というのは**誤りです**。
> ブラウザの「ページのソースを表示」で普通に読めます。

### 12-2. 「準備中」設定は情報を隠す機能ではない

`pageVisibility` を `false` にしても、HTMLやJSONそのものはサーバー上に残っており、
URLを直接指定すれば取得できます。**未公開情報の保護には使えません。**

### 12-3. クリックジャッキング対策（サーバー管理者への依頼事項）

外部サイトが技科大祭のページを `<iframe>` で埋め込み、利用者の操作を誘導する攻撃
（クリックジャッキング）を防ぐには、**Webサーバー側でHTTPレスポンスヘッダーを
設定する必要があります**。

HTMLの `<meta>` タグに `frame-ancestors` を書いても、**仕様上ブラウザに無視されます**
（効果がないうえ、全ページでコンソールエラーが出ます）。書かないでください。

サーバー管理者に以下の設定を依頼してください。

**Apache の場合**（`httpd.conf` またはサイト設定ファイル）

```apache
<IfModule mod_headers.c>
    Header always set Content-Security-Policy "frame-ancestors 'none'"
    Header always set X-Frame-Options "DENY"
</IfModule>
```

**nginx の場合**

```nginx
add_header Content-Security-Policy "frame-ancestors 'none'" always;
add_header X-Frame-Options "DENY" always;
```

**設定後の確認方法**

```bash
curl -I https://（サイトURL）/ | grep -i -E "content-security-policy|x-frame-options"
```

上記が出力されれば有効です。

### 12-4. コミットに使うメールアドレス

リポジトリは公開されているため、**コミットに使ったメールアドレスは全世界から見えます**。
作業を始める前に、GitHub の設定で
「Settings → Emails → Keep my email address private」を有効にし、
`@users.noreply.github.com` のアドレスを使うようにしてください。

```bash
git config user.email "（GitHubのnoreplyアドレス）"
```

---

## 付録: 年次更新の流れまとめ

```
1. js/site-config.json を開く
   → festivalNumber, theme, dates を来年度の値に書き換え
   → pageVisibility を確認し、まだ公開しないページは false にする

2. js/guest.json を開く
   → ゲスト名・日時・説明文を来年度のものに書き換え

3. js/shop.json を開く
   → 模擬店データをすべて来年度のものに差し替え
   → data/shop/icon/ にアイコン画像を配置

4. js/sponsors.json / js/supporters.json を開く
   → 協賛企業・寄付者を来年度のものに差し替え

5. js/timetable.json を確認
   → バスダイヤに変更があれば更新

6. data/ フォルダの画像を差し替え
   → poster.png, poster_live.png, timetable.png, map/

7. index.html と painting-contest.html の本文を更新（第6章参照）

8. ローカルサーバーで動作確認（第9章参照）

9. デプロイ

10. 情報解禁のタイミングに合わせて pageVisibility を順次 true に変更・再デプロイ
```

**共通部分（ヘッダー・フッター・アクセス案内・協賛/寄付セクション）は `js/site-config.json` の1箇所を直すだけで全ページに反映されます。**
「第--回」や `{{THEME}}` などのプレースホルダー、SNSシェア時の見え方（OGP）、Google検索用の構造化データ（JSON-LD）も自動で最新化されます。
