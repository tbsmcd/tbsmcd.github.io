---
title: "sklearn.linear_model.Perceptron のパラメータから n_iter が削除されてた件のメモ"
description: "sklearn.linear_model.Perceptron のパラメータから n_iter が削除されてた件のメモ"
image: "ai.png"
date: 2020-06-13T22:32:52+09:00
tags: ["Python", "機械学習"]
archives: ["2020-06"]
draft: false
---

{{< raw >}}
<a href="https://www.amazon.co.jp/gp/product/4295003379/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=f3952b84118eec6a83f182b64173c12d&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4295003379&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>
{{< /raw >}}

[『Python 機械学習プログラミング 達人データサイエンティストによる理論と実践』](https://amzn.to/3hpvSej)を写経しながら進めている。第3章で scikit-learn を使うのだが、記載通りに書いても動かない部分があっったのでメモ。

54ページから55ページにかけて

```python
from sklearn.linear_model import Perceptron
ppn = Perceptron(n_iter=40, eta0=0.1, random_state=1)
# 以下略
```

というコードがあるが、このまま書いても

```
TypeError: __init__() got an unexpected keyword argument 'n_iter'
```

となる。  

[version 0.20 のドキュメント](https://scikit-learn.org/0.20/modules/generated/sklearn.linear_model.Perceptron.html#sklearn.linear_model.Perceptron)によると `The number of passes over the training data (aka epochs). Defaults to None. Deprecated, will be removed in 0.21. Changed in version 0.19: Deprecated` ということなので非推奨を経て削除済み（現在の stable release は0.23）。かわりに `max_iter` が ` (aka epochs)` とされているのでこれを使ったら良さそうだ。 


