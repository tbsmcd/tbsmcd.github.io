---
title: "hugo $taxonomy の $key は大文字が小文字化されるので比較に注意"
description: "hugo $taxonomy の $key は大文字が小文字化されるので比較に注意"
date: "2022-06-01T00:59:00+09:00"
tags: ["hugo"]
series: ["シリーズを追加"]
archives: "2022-06"
image: "ogp.png"
---


{{< series name="シリーズを追加">}}  
## 何のこと？

ref. [https://gohugo.io/variables/taxonomy/#example-usage-of-sitetaxonomies](https://gohugo.io/variables/taxonomy/#example-usage-of-sitetaxonomies)

　リンク先 `{{ range$ key, $value := $taxonomy }}` における `$key` のこと。

## 何が問題？

　[以前の記事](https://tbsmcd.net/post/series-list/)において以下のような Shortcode を設定した。


```html
{{ $name := .Get "name" }}
<div class="in-article-list">
<p class="in-article-list-p">Series: {{ $name }}</p>
<ul class="page-list">
{{ range $key, $series := site.Taxonomies.series }}
    {{ if eq $key $name }}
        {{ range $series.Pages }}
    <li>
        <span class="list-date">{{ .Date.Format "2006/01/02" }}</span>
        <br>
        <a href="{{ .RelPermalink }}">{{ .Title | markdownify }}</a>
    </li>
        {{ end }}
    {{ end }}
{{ end }}
</ul>
</div>
```

シリーズ名に大文字を含む場合、 `$name` は大文字のままだが、 `$key` は小文字に変換される。そのため `{{ if eq $key $name }}` は False となってしまう。

## 改善方法


```html
{{ $name := .Get "name" }}
<div class="in-article-list">
<p class="in-article-list-p">Series: {{ $name }}</p>
<ul class="page-list">
{{ range $key, $series := site.Taxonomies.series }}
    {{ $key_urlized := $key | urlize }}
    {{ $name_urlized := $name | urlize }}
    {{ if eq $key_urlized $name_urlized }}
        {{ range $series.Pages }}
    <li>
        {{ .Date.Format "2006-01-02" }} <a href="{{ .RelPermalink }}">{{ .Title | markdownify }}</a>
    </li>
        {{ end }}
    {{ end }}
{{ end }}
</ul>
</div>
```

　上記のように `urlize` を噛ませて変数に代入する。`urlize`は文字列を大文字・小文字の区別なく URL エンコードしてくれる。

[https://gohugo.io/functions/urlize/](https://gohugo.io/functions/urlize/)
