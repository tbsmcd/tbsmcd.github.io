---
title: "Notion をヘッドレス CMS のように使う"
description: "Notion をヘッドレス CMS のように使う。GitHub Actions で hugo 用の Markdown に変換する。"
date: "2022-04-18T22:21:00+09:00"
tags: ["GitHub Actions", "hugo", "Notion"]
series: []
archives: "2022-04"
image: "ogp.png"
---


## Notion のエディタを使いたい, hugo は捨てたくない

<br/>

　Notion を使い、そのエディタの便利さに慣れてくると、hugo で運用しているブログの更新が面倒になってくる。基本的にテキストエディタで Markdown を追加・編集して更新する必要のある hugo は気軽とは言い難い。しかしレンダリングの速さや画像をリサイズできたりなど、hugo の便利な機能も捨てがたい。なので両者を GitHub Actions で組み合わせてみることにした。

<br/>

## 実装

<br/>

- [tbsmcd/notion2hugo](https://github.com/tbsmcd/notion2hugo)

- [tbsmcd/tbsmcd.github.io](https://github.com/tbsmcd/tbsmcd.github.io)

<br/>

{{< img800x src="333060f8.png" alt="sequence" >}}

<br/>

　やっていることは単純で、 GitHub API と Notion API を利用し更新対象の記事を取得し Markdown に変換して `commit && push` 。あとは [peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo) を使うことで自動的にデプロイまで行うことができる。

　notion2hugo の workflow は `cron: '*/5 * * * *'` で5分に1回動作するようにしているが、[期待通りの時刻では動かないものらしい](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)ので、 `workflow_dispatch` を設定して手動で動くようにした。

<br/>

## 今後

<br/>

　ある程度は汎用化できそうなので Marketplace に公開したい。ただし hugo では簡単に shortcode を作ることができるので、たぶん皆それぞれのカスタマイズをしているだろうから、簡単ではないと思う。

<br/>

