---
title: "Vue.js + lunr.js を使い hugo サイトに全文検索を追加する"
description: "Vue.js + lunr.js + hugo で全文検索を実現する方法"
image: "lrv.png"
date: 2020-03-06T21:52:10+09:00
tags: ["hugo", "Vue.js", "lunr.js"]
archives: ["2020-03"]
draft: false
---

{{< img src="lrv.png" alt="月面バギーのイラストです" >}}

## 成果物
- [/search/](/search/)

## 生の html を書きたい
hugo では Markdown を使う。一般的な Markdown では html を混在して書けるが、 hugo では以下のようになる。

index.md
```html
<a href="#"><img src="/img.jpg"></a>
```
↓
index.html
```html
<p><a href="#"><img src="/img.jpg"></a></p>
```

このように p タグで囲われた状態で出力されるため、たとえば Amazon のアフィリエイトを貼り付けると無駄な改行が入ってしまう。このままでは JavaScript でページを作る上で多少の不都合がある（表現が自由ではない）ので、生の html を出力する shortcode を作成する。

/layouts/shortcodes/raw.html
```
{{ .Inner }}
```

[このように](https://raw.githubusercontent.com/tbsmcd/tbsmcd.github.io/d1fec30baee1b995c80a18ab6ae5baabd0f27425/content/post/my_desk/index.md)使える。

参照: [Simple Shortcode to Insert Raw HTML in Hugo &middot; Ana Ulin](https://anaulin.org/blog/hugo-raw-html-shortcode/)

## index.json を出力する

今回は [How to make a client-side search engine with Vue.js and Lunr.js - Fabio Franchino](https://fabiofranchino.com/blog/how-to-make-a-client-side-search-engine-with-vue-and-lunr/) の方法を~~パク~~踏襲して、まずは動かしてみる。リンク先のコードにおいて `axios` で読み込む json に相当する情報を hugo で出力する必要があるので、それを index.json とする。 /layouts/_default/index.json に layout を、config.toml に設定を追加すれば index.xml (RSS)のように出力することが出来る。

/layouts/_default/index.json
```
{{ $items := slice }}

{{ $counter := 0 }}
{{ range .Site.RegularPages }}
  {{ if in .Permalink "/post/" }}
  {{ $counter = add $counter 1 }}
  {{ $date := .Date.Format "2006-01-02" }}
  {{ $items = $items | append (dict "id" $counter "title" .Title "body" .Plain "url" .Permalink "date" $date) }}
  {{ end }}
{{ end }}

{{ $items | jsonify }}
```

単純に slice として定義した `$items` にページの内容を dict として追加していっている。`id` は今回のソースでは使用するというだけで、別に `url` を同じく用いてもよいだろうと思う（検証はしていないが）。何も考えず全ページを追加すると /profile/ や /search/ 自身まで対象となるので、リンクに `/post/` が含まれるページだけという条件をつけている（`if in .Permalink "/post/"`）。最終行ではループで組み立てた $items を `jsonfy` で json 化して出力している。

同じようなことを解説しているページで .Scratch を使っているパターンがあるが、このように単一ページで用いるだけの変数には必要のないと思う。[ドキュメント](https://gohugo.io/functions/scratch/)には `allow for writable page- or shortcode-scoped variables.` とある。スコープをまたぐときに使うように読めるが、今回は関係ない。物事はシンプルに記述したほうが良いだろう。

また config.toml にはこのように。

```
[outputs]
home = ["html", "json", "rss"]
```

## 検索ページを設置する

search.md
-  [https://github.com/tbsmcd/tbsmcd.github.io/blob/ed52a5bca0f828d3c046bef2bdc3577d3150c38e/content/search.md](https://github.com/tbsmcd/tbsmcd.github.io/blob/ed52a5bca0f828d3c046bef2bdc3577d3150c38e/content/search.md) 

lunr.js は[ここ](https://github.com/olivernn/lunr.js)から、lunr.stemmer.support.js tinyseg.js lunr.ja.js は[ここ](https://github.com/MihaiValentin/lunr-languages)からダウンロードする。

search.js
- [https://github.com/tbsmcd/tbsmcd.github.io/blob/ed52a5bca0f828d3c046bef2bdc3577d3150c38e/static/js/search.js](https://github.com/tbsmcd/tbsmcd.github.io/blob/ed52a5bca0f828d3c046bef2bdc3577d3150c38e/static/js/search.js)

検索対象が本文とタイトルなので、そのように指定している。

[lunr-languages の README](https://github.com/MihaiValentin/lunr-languages) では多言語に対応する方法として
```
this.use(lunr.multiLanguage('en', 'ru'));
```
と書かれているのだが、同じように日本語を、例えば `'en', 'ja'` のように指定しても希望通り動かない（英語だけが有効になる）。これは既知の問題のようだ。

- ["multiLanguage" method doesn't work with Japanese. #45 · MihaiValentin/lunr-languages](https://github.com/MihaiValentin/lunr-languages/issues/45)

そのため今回は `this.use(lunr.ja)` と日本語だけを検索するよう書いたのだが、もちろん多言語対応していないので次は英単語の resource などを検索できない問題が生じる。そのため姑息的対処として `this.resuls = this.searchIndex.search(`*${this.search}*`)` でワイルドカードで検索できるようにした。これで resource なども検索できるのだが、ならばいっそ lunr を使わず Vue だけで検索を作っても良いのではないかという気にもなる…… lunr-languages に貢献するのがいちばん良いのかな。

以上で検索ページは実現できる。

## 今後

- 全記事を表示してから絞り込み検索するのはページ増えたときに……
	- ページが増えたときに考えましょう
- 全記事を json で吐き出すのは……
	- ページが増えたときに考えましょう