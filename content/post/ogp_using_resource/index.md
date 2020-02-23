---
title: "OGP イメージに resource を使う"
description: ""
image: ""
date: 2020-02-23T23:45:07+09:00
tags: ["hugo"]
archives: ["2020-02"]
draft: false
---

## なぜいまさら
[hugo で画像を最適化（リサイズ）して出力した](/post/image_processing/)のときに画像を `/static/images/` から `/content/post/[各記事]/` 以下に移動させたわけだが、完全に OGP タグのことを忘れていた。

## 変更点

/layouts/partials/head_custom.html

```head_custom.htmlのdiff.html
< <meta property="og:image" content="{{if .Params.image}}https://tbsmcd.net{{.Params.image}}{{else}}https://tbsmcd.net/images/icon_mono.jpg{{end}}" />
---
> {{ if .Params.image }}
> {{ $src := .Params.image }}
> {{ $resource := .Page.Resources.GetMatch $src }}
> <meta property="og:image" content="https://tbsmcd.net{{ $resource.Permalink }}" />
> {{ else }}
> <meta property="og:image" content="https://tbsmcd.net/images/icon_mono.jpg" />
> {{ end }}
```

記事ディレクトリ直下にある画像のうち OGP に使いたいファイル名を `index.md` に `image: "hoge.jpg"` のようにに書いておけば展開される。`image: "hoge.jpg"` がない場合はデフォルトの画像が表示される。記事直下にない画像ファイルを指定した場合はビルドでエラーになるので気付くことができる。
