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

## ページ内で JavaScript を使うための shortcode を作成
hugo では Markdown で記事を書く。たとえば Github などでは Markdown 内で html を混在して書けるが、 hugo では事情が少し違う。たとえば Markdown 内に

```
<a href="#"><img src="/img.jpg"></a>
```

と書くと、

```
<p><a href="#"><img src="/img.jpg"></a></p>
```

と出力され、たとえば Amazon のアフィリエイトなどを貼り付けると無駄な改行が入ってしまう。このままでは JavaScript でページを作る上で不都合があるので、生の html を出力するための shortcode を作成する。



