---
title: "Jupyter Notebook を PyCharm（or IntelliJ IDEA）上で使う"
description: "Jupyter Notebook を JetBrains 製品（PyCharm/IntelliJ IDEA）から使う簡単な方法"
image: "select_server02.png"
date: 2020-05-31T22:21:11+09:00
tags: ["Python"]
archives: ["2020-05"]
draft: false
---

## 前提

Jupyter Notebook を使っていると、ふだん使っている IDE のカラースキームが懐かしくなったり、Python ファイルでちょっとした関数を定義したくて IDE との往復が発生したりする（した）。

## 環境

- IntelliJ IDEA 2020.1(ULTIMATE EDITION) で検証。PyCharm でも同様だと思う
- macOS 10.14.6
- Python 3.7.7（Homebrew）
- Jupyter Notebook 6.0.3（`pip3 install jupyter`）

仮想環境を使ってもたぶんあまり変わらない。Anaconda は使っていてダルくなったので現在は削除している（またいずれ使うだろうが）。

## 手順

{{< img400x src="create_project.png" alt="プロジェクト作成" >}}
  
新規プロジェクトを作成する。
{{< br >}}  
{{< br >}}  
  

{{< img400x src="create_file.png" alt="ipynb ファイル作成" >}}
  
`*.ipynb` ファイルを作成する。この画面の場合、左が編集エリアで右がプレビューエリアになっている。
{{< br >}}  
{{< br >}}  

{{< img400x src="select_view.png" alt="View の選択" >}}
  
画面右上で編集のみ、編集とプレビュー、プレビューのみを選択できる。
{{< br >}}  
{{< br >}}  

{{< img400x src="select_server.png" alt="実行ボタンを押したところ" >}}
  
「すべて実行」をクリックする。まだ Jupyter Notebook サーバは起動していない。カーネルを選択するよう求められるので Python 3 を選ぶ。
{{< br >}}  
{{< br >}}  

{{< img400x src="select_server02.png" alt="他のサーバを選ぶ場合" >}}
  
もしくは他のサーバを選ぶこともできる。これは上記カーネルの画像にある `マネージド http://〜` の箇所をクリックし `Jupyter サーバーの構成` を選択すれば良い。
{{< br >}}  
{{< br >}}  
  

{{< img400x src="run.png" alt="実行" >}}
  
無事動いた。
