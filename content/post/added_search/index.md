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

## 生の html を書きたい
hugo では Markdown を使う。たとえば Github Markdown などでは html を混在して書けるが、 hugo では以下のようになる。

index.md
```
<a href="#"><img src="/img.jpg"></a>
```

index.html
```
<p><a href="#"><img src="/img.jpg"></a></p>
```

このように、p タグで囲われた状態で出力されるため Amazon のアフィリエイトなどを貼り付けると無駄な改行が入ってしまう。このままでは JavaScript でページを作る上で多少の不都合があるので、生の html を出力する shortcode を作成する。

/layouts/shortcodes/raw.html
```
{{ .Inner }}
```

Markdown 中で
```
{{< raw >}}
<a href="#"><img src="/img.jpg"></a>
{{< /raw >}}
```

と html を囲えばよい。


## index.json を出力する

今回は [How to make a client-side search engine with Vue.js and Lunr.js - Fabio Franchino](https://fabiofranchino.com/blog/how-to-make-a-client-side-search-engine-with-vue-and-lunr/) の方法を~~パク~~踏襲して、まずは動かしてみる。リンク先のコードにおいて `axios` で読み込む json に相当する情報を hugo で出力する必要があるので、それを index.json とする。 /layouts/_default/index.json に layout を、config.toml に設定を追加すれば index.xml(RSS) のように出力することが出来る。

/layouts/_default/index.json
```
{{ $.Scratch.Add "items" slice }}

{{ $counter := 0 }}
{{- range .Site.RegularPages -}}
  {{ if in .Permalink "/post/" }}
  {{ $counter = add $counter 1 }}
  {{ $date := .Date.Format "2006-01-02" }}
  {{- $.Scratch.Add "items" (dict "id" $counter "title" .Title "body" .Plain "url" .Permalink "date" $date) -}}
  {{ end }}
{{- end -}}

{{ $.Scratch.Get "items" | jsonify }}
```

`$.Scratch` は
