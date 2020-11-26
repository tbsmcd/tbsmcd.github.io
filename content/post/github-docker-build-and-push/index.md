---
title: "GitHub Actions を使って docker build し Docker Hub に push すると、速くて良い"
description: "GitHub Actions を使って Docker イメージをビルドし Docker Hub に push すると速くて便利だった。"
image: "gh.png"
date: 2020-11-26T23:00:06+09:00
tags: ["Docker", "GitHub Actions"]
series: [""]
archives: ["2020-11"]
draft: false
---

## GitHub Actions は便利

　2019年11月に GitHub Actions （以下 GHA）が正式に公開されて以来、おもに CI/CD を GHA に乗り換える事が増えていると思う。その後 GitHub Enterprise でも GHA が使用可能になり、弊社（GMO ペパボ）でもその動きが活発化している。じぶんはふだん Web アプリケーションのデプロイの一環として GHA を捉えているのだけど、 GHA でできるのはそれだけにとどまらない。  
　さいきん自然言語処理の練習用に Dockerfile を書いた。個人用のローカルマシンでビルドして使っているのだけど、業務でも使いたいという野望もあり、それならば2箇所でビルドするよりイメージを共有できたら良い。だったら GHA でビルドできるのでは？と考え調べると簡単にできるらしいことがわかった。

## やりたいこと

　手元のマシンで `$ git tag [tag] && git push origin [tag]` したら Docker イメージのビルドをして Docker Hub にプッシュまでを自動化したい。その際に例えば GitHub では `v0.0.1` というタグを打った場合に、 Docker Hub では `0.0.1` と `latest` というタグを使いたい。

## 実際の Workflow

　リポジトリ [tbsmcd/NLP_PyTorch](https://github.com/tbsmcd/NLP_PyTorch)

```yml
name: Publish Docker image
on:
  push:
    tags:
      - 'v*.*.*'
jobs:
  push_to_registry:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Get version number
        id: tag_number
        run: |
          CURRENT_TAG=$(git tag --sort=-creatordate | sed -n 1p)
          DOCKERHUB_TAG="${CURRENT_TAG//v/}"
          echo "::set-output name=dh_tag::${DOCKERHUB_TAG}"
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Build and Push to Docker Hub
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: |
            tbsmcd/nlp_pytorch:latest
            tbsmcd/nlp_pytorch:${{steps.tag_number.outputs.dh_tag}}
```

　docker/setup-buildx-action, docker/login-action, docker/build-push-action あたりの使い方は各リポジトリを見たらわかると思う。

```yml
on:
  push:
    tags:
      - 'v*.*.*'
```

の箇所では `v*.*.*` に当てはまるタグを付けた場合に動くようにしている。

```yml
      - name: Get version number
        id: tag_number
        run: |
          CURRENT_TAG=$(git tag --sort=-creatordate | sed -n 1p)
          DOCKERHUB_TAG="${CURRENT_TAG//v/}"
          echo "::set-output name=dh_tag::${DOCKERHUB_TAG}"
```

の箇所で 

- GitHub に push された最新のタグを取得
- タグから v を削除
- それを Docker Hub タグ用の変数に代入

ということをしている。これは簡単なシェルスクリプトなので様々な応用が効くと思う。

## 使ってみて

　速い。 Docker Hub にも GitHub と連携してビルドする機能があるので比べてみた。

### Docker Hub

25分

{{< img800x src="dh.png" alt="Docker Hub では25分" >}}

### GitHub Actions

10分

{{< img800x src="gh.png" alt="GHA では10分" >}}

　これは時間帯による影響などもあるかもしれないが、実際に動かした結果は圧倒的に速かった。また、 GHA でビルド・プッシュをするならば Docker Hub 以外（GitHub Packages など）にも展開することができて便利だと思う。

## 参考資料

- [Dockerイメージの公開 - GitHub Docs](https://docs.github.com/ja/free-pro-team@latest/actions/guides/publishing-docker-images)　

