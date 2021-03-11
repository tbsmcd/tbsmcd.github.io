---
title: "Issue, Pull Request のリードタイムを計測できる GitHub Action「Label timer」をリリースした"
description: "Issue, Pull Request のリードタイムを計測できる GitHub Action「Label timer」をリリースした。ラベルの付いていた時間を計測でき、結果を後続の steps, jobs にパイプすることができるので、 DB やスプレッドシートに保存できる。Dev Ops の改善に使えると思う。"
image: "header.png"
date: 2021-03-11T23:52:21+09:00
tags: ["GitHub Actions", "Python", "OSS"]
series: ["Label timer をリリースした"]
archives: ["2021-03"]
draft: false
---

{{< series name="Label timer をリリースした" >}}

リンク

- [Label timer · Actions · GitHub Marketplace](https://github.com/marketplace/actions/label-timer)
- [日本語ドキュメント](https://github.com/tbsmcd/label_timer/blob/master/docs/README.ja.md)

## 概要

　GitHub(github.com, GitHub Enterprise) の Issue, Pull Request に特定のラベルが付与されていた時間を計測し記録するアクションを公開した。[Docker コンテナのアクション](https://docs.github.com/ja/actions/creating-actions/creating-a-docker-container-action)として作成し、言語は Pyhton を使用している。

## 利用シーン

　開発を行っているとレビュー待ちなどの時間が発生し、それが長すぎるとユーザに価値を届けるまでの時間も長くなる。運用でもチームに依頼が来てから解決するまでの時間が長ければ同様にユーザを待たせることになる。これらの時間を計測し、業務や組織を改善したい場合に使うことを想定している。

## 使い方

　基本的には README（[英語](https://github.com/tbsmcd/label_timer/blob/master/README.md), [日本語](https://github.com/tbsmcd/label_timer/blob/master/docs/README.ja.md)） の `example.yml` に書かれたコメントを元に、 `.gihub/workflows/` 以下に yaml を設定したら動く。Issue だけ、 Pull Request だけ、またはその両方を対象にすることができ、ラベルもカンマ区切りで複数指定できる。計測結果はコメントとして書き出されるが、 outputs 変数に代入されるので後続の steps または jobs でも利用ができる。これによりチームで利用している DB, BigQuery, スプレッドシート等に計測結果を記録できる。

### 計測の開始

{{< img800x src="add.png" alt="ラベルを付加したところ" >}}

　計測対象のラベルを付加するとラベル名、Issue(Pull Request)番号、開始時の Unix time （秒）を記録するためのラベルが付与される。

### 計測の終了


{{< img800x src="remove.png" alt="ラベルを削除したところ" >}}

　計測対象のラベルを削除すると記録用のラベルが削除され、コメントとして付与から削除までの時間が記録される。複数回付与・削除を繰り返した場合には `Total time` に合計値が記録される。記録用のラベルは Issue/Pull Request から除外されるだけでなくリポジトリから削除されるので不要なラベルが溜まるということはない。ただし予期せぬエラーにより削除されないことはあり得るので明らかに無駄なものが溜まった場合は削除してもらえば良いだろう。

## 技術的なトピックス

　この記事の後にいくつか投稿する予定。
