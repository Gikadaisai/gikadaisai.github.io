/**
 * escape-html.js
 * HTML エスケープの共通ヘルパー。
 *
 * 本サイトが innerHTML に流し込むデータは同一オリジンの静的 JSON 由来だが、
 * 誤ったコミットや将来の入力経路追加に備えた多層防御としてエスケープを行う。
 *
 * テキストノードと引用符付き属性値の双方で安全になるよう 5 文字を変換する。
 * 各ページのインラインスクリプトより先に読み込むこと。
 */
(function (global) {
  "use strict";

  var ESCAPE_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  /**
   * 任意の値を HTML エスケープ済み文字列に変換する。
   * null / undefined は空文字。それ以外は String() で包むため、
   * 数値や真偽値が渡っても TypeError にならない。
   * @param {*} value
   * @returns {string}
   */
  function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/[&<>"']/g, function (char) {
      return ESCAPE_MAP[char];
    });
  }

  global.escapeHtml = escapeHtml;
})(window);
