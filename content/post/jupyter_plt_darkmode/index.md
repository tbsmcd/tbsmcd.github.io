---
title: "ダークモード環境で Jupyter Notebook を使ってグラフを表示する場合の style 設定"
description: "ダークモードの IDE/エディタで Jupyter Notebook を使ってグラフを表示する際には Style を指定したら良い"
image: ""
date: 2020-06-01T00:00:01+09:00
tags: ["Python"]
archives: ["2020-06"]
draft: false
---

[前回](https://tbsmcd.net/post/jetbrains_jupyter/)の続き。

## ダークモードを使いたいんだ！

わざわざ Jupyter を IntelliJ IDEA/PyCharm や VS Code から使う理由の1つに「ふだん使いのカラースキームを使いたいから」というのがある。しかしダークモードで Jupyter を使いグラフを表示すると嬉しくないことが起きる。

{{< img400x src="normal.png" alt="初期状態の表示" >}}

このように透過になる部分があり、黒い文字が見えにくくなる。  
同じように困っている人はそれなりにいるらしい（例: [Google の検索結果](https://www.google.com/search?q=pycharm+dark+theme+jupyter)）。 IDE 側の色設定で何とかしようとしている人もいるが、この場合 `plt.style.use()` でグラフのスタイルを変更したほうがはやい。

{{< img400x src="dark.png" alt="ダークモード用背景" >}}

画像では `plt.style.use(['dark_background'])` している。ほかにも `default` などがあり（ default がデフォルトじゃなくて謎）、適切に選択すればダークモードの IDE と Jupyter Notebook の標準的なカラースキームとで違和感なく共存できる。詳しくは公式ドキュメント （[リンク1](https://matplotlib.org/3.2.1/gallery/style_sheets/style_sheets_reference.html)  [リンク2](https://matplotlib.org/3.1.0/tutorials/introductory/customizing.html)）参照。

