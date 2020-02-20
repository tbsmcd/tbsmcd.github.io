---
title: "hugo で画像を最適化して出力する"
description: hugo で大きすぎる画像を最適化して表示する方法。shortcode の使い方など。"
date: 2020-02-20T23:54:01+09:00
tags: ["hugo"]
archives: ["2020-02"]
draft: false
---

ex.
- [テックブログに載らない作業環境](https://tbsmcd.net/post/my_desk/)
- [スタジオアリスの撮影料（3000円）無料券をもらったので行った](https://tbsmcd.net/post/studio_alice/)

## ブログを軽くしたい
[林田ドットオンライン](https://hayashida.online/)というまあまあ狂ったブログがあり、これはペパボの同僚の手になるものだけど、とにかく異常に軽い。WordPress でこれだけ軽いのだから、 hugo ならもっと軽くなるはず。なのでこのブログも軽量路線で行こうという話。

## なにはともあれ画像がデカい
大きければ転送に時間がかかる。これは古代エジプトの時代から不変の原理であり、当時は巨石を丸太のコロを使っただとか、ソリを使っただとか、いずれにせよ重いものを運ぶのには力か工夫が必要である。幸い2020年代を生きている我々は、巨石を運ぶ古代エジプト労働者やイースター島モアイ建造従事者とは違い、ファイルを圧縮したり画像自体の表示領域を小さくすることが許されている。逆に労働の合間にビールを飲むことは許されてはいないが、ここは素直に軽くする方向で行きたい。

## hugo における画像リサイズ
参照
- [Image Processing | Hugo](https://gohugo.io/content-management/image-processing/)
- [Page Resources | Hugo](https://gohugo.io/content-management/page-resources/)

上の記事を簡単に説明すると、 Page Resource で扱える画像はリサイズできる。

### Resource とは
従来

```
├── content
│   ├── _index.md
│   ├── post
│   │   ├── added_archives.md
│   │   ├── added_favicon.md
│   │   ├── hello.md
│   │   ├── index_md_is_useful.md
│   │   ├── my_desk.md
│   │   ├── reading_card.md
│   │   ├── reading_card_addition.md
│   │   ├── studio_alice.md
│   │   └── syntax_highlighting.md
│   └── profile.md
（略）
│   ├── images
│   │   ├── desk.JPG
│   │   ├── icon_gen.jpg
│   │   ├── icon_mono.jpg
│   │   ├── reading_card.jpg
│   │   └── studio.jpg
```

変更後

```
├── content
│   ├── _index.md
│   ├── post
│   │   ├── added_archives
│   │   │   └── index.md
│   │   ├── added_favicon
│   │   │   ├── icon_gen.jpg
│   │   │   ├── icon_mono.jpg
│   │   │   └── index.md
│   │   ├── hello
│   │   │   └── index.md
│   │   ├── index_md_is_useful
│   │   │   └── index.md
│   │   ├── my_desk
│   │   │   ├── desk.JPG
│   │   │   └── index.md
│   │   ├── reading_card
│   │   │   ├── card.jpg
│   │   │   └── index.md
│   │   ├── reading_card_addition
│   │   │   └── index.md
│   │   ├── studio_alice
│   │   │   ├── index.md
│   │   │   └── studio.jpg
│   │   └── syntax_highlighting
│   │       └── index.md
│   └── profile.md
```

という感じでまずは画像を記事ごとに保持する。そうすると画像を Resource として扱えるようになる。そうすると、Image Processing が使えるようになる。
## shortcode

以下のような shortcode を用意する

`/layouts/shortcodes/img800x.html`
```html
{{ $src := .Get "src" }}
{{ $original := .Page.Resources.GetMatch $src }}
{{ if $original }}
	{{ $resized := $original.Resize "800x q90" }}
	<a href="{{ $original.RelPermalink }}">
	<img src="{{ $resized.RelPermalink }}" alt="{{ .Get "alt" }}">
	</a>
{{ end }}
```

`Resize "800x"` の部分で幅800を指定している。例えば幅400縦200の画像なら `Resize "400x200"` だし、縦300の画像なら `Resize "x300"` となる。`q90` というのは jpeg のクオリティ。このあたりは上記公式ドキュメントを読めば分かるだろう。

……と、このような shortcode を用意し、`*.md` の中でファイル名と同名で呼べば良い。

[例えばこんな感じで](https://github.com/tbsmcd/tbsmcd.github.io/blob/08924e10335127f7de076978aa49fed5ec3b2f8f/content/post/studio_alice/index.md)

shortcode の解説は後日別記事で行う（かもしれない）（いま酒飲んでて後のことはよく分からない）（期待しないで）。

