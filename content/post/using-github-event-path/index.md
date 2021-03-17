---
title: "内部で GitHub API を用いる GitHub Actions を、 github.com と GitHub Enterprise の両方に対応させる"
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

## GitHub Enterprise と github.com で異なる API エンドポイント

　例えば GitHub API の https://api.github.com/foo に相当するものが GitHub Enterprise では https://[独自ドメイン]/api/v3/foo となるので、同一の Action を両者間で使いまわそうと思うと多少の工夫が必要だ。個人や社内で使う目的ならエンドポイントを固定してしまうのも良いだろうが、Marketplace に公開した場合などには両方でで使えたほうが嬉しいだろう。


## 共通化させる方法

　おそらくいろいろなやり方があると思う。パッと思いついたものとしては、エンドポイントが api.github.com でない場合は workflows/*.yml の中で inputs として渡すなど可能だろう。
　今回 Issue_timer を作るにあたっては `GITHUB_EVENT_PATH` を用いてワークフローをトリガするイベントを取得し、その中に記載のある API エンドポイントにアクセスする方法を採用した。

[ワークフローをトリガーするイベント - GitHub Docs](https://docs.github.com/ja/actions/reference/events-that-trigger-workflows)

　Actions のスクリプト中では `GITHUB_EVENT_PATH` を用いて上記ドキュメント中の `${{ github.event }}` に相当する内容の json ファイルを取得することができる。たとえば Python なら以下のように。Pull Request にラベルが付いたことをトリガとするものであれば、 `action` には `labeled` が代入される。

```python
with open(environ.get('GITHUB_EVENT_PATH')) as f:
    events = json.load(f)
    action = events['action']
```


　この `events` には API エンドポイントや各種 URL も含まれている。例として Pull Request に対する何らかのアクションがトリガであれば以下のようなコードでトリガとなった Pull Request の URL や Pull Request のコメントを操作する API エンドポイントを取得できる。

```python
url = events['pull_request']['_links']['html']['href']
api_url = events['pull_request']['_links']['comments']['href']
```

　今回は github.com の Marketplace で公開することをを目標にしつつ社内の GitHub Enterprise でも使えることを考えていたので、このような工夫が必要だった。単に Marketplace に公開する場合にはそのような配慮は必要ないかもしれないが、少しの工夫で多くの人が使えるようになれば、その方が面白いと思う。
