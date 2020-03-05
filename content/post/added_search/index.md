---
title: "Vue.js + lunr.js を使い hugo サイトに全文検索を追加する"
description: "Vue.js + lunr.js + hugo で全文検索を実現する方法"
image: "lrv.png"
date: 2020-03-06T21:52:10+09:00
tags: ["hugo", "Vue.js", "lunr.js"]
archives: ["2020-03"]
draft: true
---

{{< img src="lrv.png" alt="月面バギーのイラストです" >}}

## ページ内で JavaScript を使うために生の html を書きたい
hugo では Markdown で記事を書く。たとえば Github などでは Markdown 内に html を混在して書けるが、 hugo では事情が少し違う。たとえば Markdown 内に

```
<a href="#"><img src="/img.jpg"></a>
```

と書くと、

```
<p><a href="#"><img src="/img.jpg"></a></p>
```

と出力され、たとえば Amazon のアフィリエイトなどを貼り付けると無駄な改行が入ってしまう。このままでは JavaScript でページを作る上で不都合があるので、生の html を出力するための shortcode を作成する。

/layouts/shortcodes/raw.html でこんな風に書き、

```
{{ .Inner }}
```

あとは Markdown 中で

```
{{< raw >}}
<a href="#"><img src="/img.jpg"></a>
{{< /raw >}}
```

と html を囲えばそのままの html が出力されるようになる。


## index.json を出力する

JavaScript で全記事から全文検索をするので、全記事を検索するためのソースが必要だ。今回は index.json というファイルに出力するが、別に検索ページの `<script>` タグ内に出力しても良いだろう（記事が少なければ特に）。

