---
title: "DNP が開発した「読書アシスト」を hugo で試す"
description: "DNP が開発した「読書アシスト」を hugo で試してみた。"
image: "rashou.png"
date: 2020-07-11T23:39:07+09:00
tags: ["hugo", "Python"]
archives: ["2020-07"]
draft: false
---

このページは PC 向けになっています

## 読書アシストを適用してみた

{{< raw >}}
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">DNP&nbsp;の</span></span><span class="textline"><span class="bgcolor">開発した</span></span><span class="textline"><span class="bgcolor">「読書アシスト」を&nbsp;</span></span><span class="textline"><span class="bgcolor">hugo&nbsp;で</span></span><span class="textline"><span class="bgcolor">利用する</span></span><span class="textline"><span class="bgcolor">実験を</span></span><span class="textline"><span class="bgcolor">しているので、</span></span><span class="textline"><span class="bgcolor">これは</span></span><span class="textline"><span class="bgcolor">あえて</span></span><span class="textline"><span class="bgcolor">分かりにくい</span></span><span class="textline"><span class="bgcolor">文章に</span></span><span class="textline"><span class="bgcolor">するつもりだったが、</span></span><span class="textline"><span class="bgcolor">実際</span></span><span class="textline"><span class="bgcolor">のところ</span></span><span class="textline"><span class="bgcolor">酔っ払っているのでこのまま</span></span><span class="textline"><span class="bgcolor">勢い</span></span><span class="textline"><span class="bgcolor">に</span></span><span class="textline"><span class="bgcolor">任せて</span></span><span class="textline"><span class="bgcolor">タイピングしていけば</span></span><span class="textline"><span class="bgcolor">訳の</span></span><span class="textline"><span class="bgcolor">わからない</span></span><span class="textline"><span class="bgcolor">文章に</span></span><span class="textline"><span class="bgcolor">なることは</span></span><span class="textline"><span class="bgcolor">うけあいだ。</span></span><span class="textline"><span class="bgcolor">きょうは</span></span><span class="textline"><span class="bgcolor">博多駅の</span></span><span class="textline"><span class="bgcolor">ヨドバシカメラに</span></span><span class="textline"><span class="bgcolor">行って</span></span><span class="textline"><span class="bgcolor">オーブンレンジを</span></span><span class="textline"><span class="bgcolor">買った。</span></span><span class="textline"><span class="bgcolor">子供が</span></span><span class="textline"><span class="bgcolor">生まれると</span></span><span class="textline"><span class="bgcolor">金が</span></span><span class="textline"><span class="bgcolor">かかりますね。</span></span><span class="textline"><span class="bgcolor">先週は</span></span><span class="textline"><span class="bgcolor">トヨタの</span></span><span class="textline"><span class="bgcolor">ディーラーに</span></span><span class="textline"><span class="bgcolor">行ったので……まあ</span></span><span class="textline"><span class="bgcolor">福岡に</span></span><span class="textline"><span class="bgcolor">住んでいて</span></span><span class="textline"><span class="bgcolor">車を</span></span><span class="textline"><span class="bgcolor">持っていないというのも</span></span><span class="textline"><span class="bgcolor">不便な</span></span><span class="textline"><span class="bgcolor">話なので良い</span></span><span class="textline"><span class="bgcolor">機会だったと</span></span><span class="textline"><span class="bgcolor">思っている。</span></span><span class="textline"><span class="bgcolor">オーブンレンジも、</span></span><span class="textline"><span class="bgcolor">まあ</span></span><span class="textline"><span class="bgcolor">買ってよかったものに</span></span><span class="textline"><span class="bgcolor">なるんじゃないかな。</span></span><span class="textline"><span class="bgcolor">こんな感じに</span></span><span class="textline"><span class="bgcolor">グダグダの</span></span><span class="textline"><span class="bgcolor">文章を</span></span><span class="textline"><span class="bgcolor">書いてみて</span></span><span class="textline"><span class="bgcolor">よいのだろうか？</span></span>
</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>
<link rel="preload" as="style" href="https://reading-assist.com/css/style.css" onload="this.rel='stylesheet'">
<script type="text/javascript" src="https://reading-assist.com/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/steps_convert.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/jquery.mobile-1.4.5.js"></script>
{{< /raw >}}

---

[読書アシスト](https://read-assist-dxn.web.app/)  

## ソースの取得

　今回は Pyhton で以下のようなスクリプトを書いた。

```python
#!/usr/bin/env python3

import requests
from pprint import pprint

text = """
DNP の開発した「読書アシスト」を hugo で利用する実験をしているので、これはあえて分かりにくい文章にするつもりだったが、\
実際のところ酔っ払っているのでこのまま勢いに任せてタイピングしていけば訳のわからない文章になることはうけあいだ。\
きょうは博多駅のヨドバシカメラに行ってオーブンレンジを買った。子供が生まれると金がかかりますね。\
先週はトヨタのディーラーに行ったので……まあ福岡に住んでいて車を持っていないというのも不便な話なので良い機会だったと思っている。\
オーブンレンジも、まあ買ってよかったものになるんじゃないかな。こんな感じにグダグダの文章を書いてみてよいのだろうか？
"""

url = 'https://reading-assist.com/api/assistapi.php'
headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
item_data = {
    'action': 'conv_htmltext',
    'title': 'かいもの',
    'htmlText': text
}

print(requests.post(url, data=item_data).content.decode())
```

このスクリプトを実行したら1ページ分の html を取得できる。今回はページ内のコンテンツとして使いたいので `<div class="textblock">` を抜き出した。 CSS は以下のようにプリロードにして、 jquery-mobile は不要なので削除した。

```html
<link rel="preload" as="style" href="https://reading-assist.com/css/style.css" onload="this.rel='stylesheet'">
<script type="text/javascript" src="https://reading-assist.com/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/steps_convert.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/jquery.mobile-1.4.5.js"></script>
```

また、 html を Markdown に埋め込むにあたり [raw shortcodes](https://github.com/tbsmcd/tbsmcd.github.io/blob/b6e9104cf7eb44e002c8fb5eb75c2e6b50052c79/layouts/shortcodes/raw.html) を使った。

実際の Markdown ファイルは [Github](https://github.com/tbsmcd/tbsmcd.github.io/blob/source/content/post/dnp-reading-asist/index.md) にあるので見てほしい。
