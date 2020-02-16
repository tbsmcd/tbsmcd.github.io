---
title: "hugo に favicon を追加したメモ"
date: 2020-02-16T21:14:13+09:00
tags: ["hugo"]
archives: ["2020-02"]
draft: false
---

## 元画像の準備
![アイコン作成](/images/icon_mono.jpg)
  
Twitter などで使っているアイコンを白黒で作り直した。今回は [Piskel](https://www.piskelapp.com/) を利用した。

## favicon 化
![アイコン変換](/images/icon_gen.jpg)
[Favicon & App Icon Generator](https://www.favicon-generator.org/) を利用した。サイト名から分かるとおり、 favicon だけではなくスマートフォン用の App Icon も作成してくれるし、画像のように `<head>` 内のコードまで用意してくれるから頭を使わなくて良い。

## Head にコードを追加
hugo ではテーマの `layout` 以下にあるファイルよりブログの `layout` 以下の同名ファイルが優先して利用される[^a]。通常 `<head>` 内を変更したい場合はテーマの `layout/partials/header.html` をコピーし、ブログのディレクトリに同名で保存して編集すれば良い。このブログで使っているテーマは少し事情が違い `header.html` 内で空の `header_custom.html` を読み込むようになっているので、今回は favicon 用のコードを書いた `head_custom.html` をブログの同一 path に設置した。

[^a]: hugo の layout の優先順位については[公式ドキュメント](https://gohugo.io/templates/lookup-order/)参照のこと。
