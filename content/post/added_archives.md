---
title: "Archives ページを導入した"
date: 2020-02-03T23:26:22+09:00
tags: ["hugo"]
archives: ["2020-02"]
draft: false
---
## 対応する Pull Request
[アーカイブを追加 #4](https://github.com/tbsmcd/tbsmcd.github.io/pull/4/files)

## 変更点
- footer は config.toml で定義しているので変更
- すでにあるページには追記する必要があるので手動で変更
	- `archives: ["2020-02"]`
	- 記事が2つしか無かったので手動だったが、多ければスクリプトを書く必要がありそう
- config.toml に `[taxonomies]` を追加
- archetypes に `archives: ["{{ dateFormat "2020-02" .Date }}"]` を追加したが、このフォーマットに対応していないのか3030年とかになる
	- `archives: ["2020-02"]` のように決め打ちしといても間違いはなさそう
		- 追記: `archives: ["{{ dateFormat "2006-01" .Date }}"]` としたら問題がなかった
		- [ドキュメント](https://gohugo.io/functions/format/)で使用されている日付を採用すべきだった

---
Tags
- [hugo](/tags/hugo)
