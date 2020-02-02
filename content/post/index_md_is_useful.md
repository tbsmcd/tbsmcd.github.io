---
title: "xmin で `_index.md` を設定すると便利だった"
date: 2020-02-02T22:45:35+09:00
tags: ["hugo"]
draft: false
---

## 前提
自分のブログはなるべく装飾のないものにしたかったので [hugo-xmin](https://github.com/yihui/hugo-xmin)を採用した。ヘッダも余計なものに見えたので削除している。しかし Home はある程度情報を追加したいというわがままな欲求がある。

## やったこと
[xmin のサンプルサイト](https://xmin.yihui.org/)の `HUGO XMIN` から `usage of this theme.` の部分は `content/_index.markdown` に[書かれているようだ](exampleSite/content/_index.markdown)。とりあえず拡張子を `.md` に変更して自分でも追加してみた。

## 結果
すごくどうでもいいことを書ける場所が出来た。いらないものはいらないが、欲しいものは欲しいので便利。自前で新しいテーマ（github の markdown に適用される CSS でも使おうかと……）を作ろうとしていたが、その必要はなくなった。

---
Tags
- [hugo](/tags/hugo)
