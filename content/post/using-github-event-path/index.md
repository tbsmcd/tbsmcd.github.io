---
title: "GitHub Actions を github.com/GitHub Enterprise で共通化するために `${{ github.event }}/GITHUB_EVENT_PATH` を使ってほしい"
description: "GitHub Actions を github.com/GitHub Enterprise で共通化するためには ${{ github.event }}/GITHUB_EVENT_PATH が有効的。特に API を叩く時には便利。"
image: "header.png"
date: 2021-03-17T01:12:39+09:00
tags: ["GitHub Actions"]
series: ["label_timer"]
archives: ["2021-03"]
draft: false
---

{{< series name="label_timer" >}}

この記事は [Label timer](https://github.com/marketplace/actions/label-timer) を開発したことで得られた知見。

## 先に本題を
### GitHub Enterprise と github.com では API のエンドポイントが違うから

　GitHub Enterprise は利用する人たちがそれぞれホストしているものだから、URL はバラバラなはず。GitHub Actions で GitHub API を叩く記事を Qiita やブログで探すと、ドメインを api.github.com 固定で書いているものがいくつかあった。これは GitHub Enterprise では使えない。しかし `${{ github.event }}` や `GITHUB_EVENT_PATH` から API エンドポイントを取得したらその差異を考えなくても動く。できることならドメイン決め打ちではなく、`${{ github.event }}` や `GITHUB_EVENT_PATH` を使って書いてもらえると色々な環境で使えて便利なのではないかと思う。

## 以下 events について簡単に説明

[ワークフローをトリガーするイベント - GitHub Docs](https://docs.github.com/ja/actions/reference/events-that-trigger-workflows)

　上記ドキュメントにある通り、たとえばトリガしたイベントの内容を取得するには workflow の yml の中で `${{ github.event.issue.number }}` などを使えば良い。また Actions のスクリプト中では `GITHUB_EVENT_PATH` を用いて `${{ github.event }}` の内容とおなじ json ファイルを取得することができる。たとえば Python なら

```python
with open(environ.get('GITHUB_EVENT_PATH')) as f:
	events = json.load(f)
	action = events['action']
```

のように。Pull Request にラベルが付いたことを契機とするものであれば、 `action` には `labeled` が代入される。

　この `events` には API エンドポイントや各種 URL も含まれている。例として Pull Request 契機であれば

```python
url = events['pull_request']['_links']['html']['href']
api_url = events['pull_request']['_links']['comments']['href']
```

で契機となった Pull Request の URL や Pull Request のコメントを操作する API エンドポイントを取得できる。。

