---
title: "Archives だけ降順にしたい"
description: "Terms は通常昇順だが、 Archives は降順のほうが良い"
image: ""
date: 2020-03-09T00:01:24+09:00
tags: ["hugo", "日記"]
archives: ["2020-03"]
draft: false
---

## Terms の昇順/降順

hugo の Terms ……このブログに於いては [/tags/](/tags/) と [/archives/](/archives/) について、通常のページでは辞書的に昇順で表示したいが、/archives/ については新しい順になるよう降順で表示したい。そこで [/layouts/_default/terms.html](https://github.com/tbsmcd/tbsmcd.github.io/blob/2be3271d4e1153febfa49c4af5a82736f9354a97/layouts/_default/terms.html) を設定したのだけど、もっとスマートな書き方があるのではないかと迷っている。

```html
{{ partial "header.html" . }}
<h1>{{ .Title }}</h1>

<ul class="terms">
{{ if eq .Title "Archives" }} 
  {{ range .Data.Terms.Alphabetical.Reverse }}
  <li>
    <a href="{{ .Page.RelPermalink }}">{{ .Page.Title }}</a> ({{ .Count }})
  </li>
  {{ end }}
{{ else }}
  {{ range .Data.Terms }}
  <li>
    <a href="{{ .Page.RelPermalink }}">{{ .Page.Title }}</a> ({{ .Count }})
  </li>
  {{ end }}
{{ end }}
</ul>

{{ partial "footer.html" . }}
```
