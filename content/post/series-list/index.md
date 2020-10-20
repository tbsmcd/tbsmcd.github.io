---
title: "hugo でシリーズ記事一覧を表示するための Shortcode と設定"
description: "hugo でシリーズ記事を書く際に必要であろう、記事一覧を表示する設定と作成した shortcode について。"
image: ""
date: 2020-10-20T23:40:36+09:00
tags: ["hugo"]
series: ["シリーズを追加"]
archives: ["2020-10"]
draft: false
---

## シリーズ記事を書く機運

　しばらく放ったらかしだったこのブログにも書くネタはあるのでシリーズ記事を書いてみたい。それに先立ち、記事内に埋め込む「同一シリーズの記事一覧」機能を自作した。

## Shortcode

series.html

```html
{{ $name := .Get "name" }}
<h3>Series: {{ $name }}</h3>
<ul>
{{ range $key, $series := site.Taxonomies.series }}
    {{ if eq $key $name }}
        {{ range $series.Pages }}
    <li><a href="{{ .URL }}">{{ .Title }}</a></li>
        {{ end }}
    {{ end }}
{{ end }}
</ul>
```


## 設定

config.toml

```
[taxonomies]
tag = "tags"
archive = "archives"
series = "series"
```

　taxonomies に series を追加する。これでデフォルトで用意されている tag のように使えるようになる。

## 記事のメタ情報

 tag のようにページヘッダに記述。

```
series: ["シリーズを追加"]
```

## 利用法

[https://github.com/tbsmcd/tbsmcd.github.io/blob/b84e2829c021b40eb128440685259d9654b69086/content/post/series-list/index.md#L58](https://github.com/tbsmcd/tbsmcd.github.io/blob/b84e2829c021b40eb128440685259d9654b69086/content/post/series-list/index.md#L58)

## 実際の表示↓

{{< series name="シリーズを追加" >}}

## ポイント

　`{{ range $key, $series := site.Taxonomies.series }}` で `foreach (series as key => value)` のような動きができること。
