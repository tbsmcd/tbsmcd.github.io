---
title: "DNP が開発した「読書アシスト」を hugo で試す"
description: "DNP が開発した「読書アシスト」を hugo で試してみた。"
image: "rashou.png"
date: 2020-07-11T23:39:07+09:00
tags: ["hugo", "Python"]
archives: ["2020-07"]
draft: false
---

{{< raw >}}
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">DNP&nbsp;の</span></span><span class="textline"><span class="bgcolor">開発した</span></span><span class="textline"><span class="bgcolor">「読書アシスト」を&nbsp;</span></span><span class="textline"><span class="bgcolor">hugo&nbsp;で</span></span><span class="textline"><span class="bgcolor">利用する</span></span><span class="textline"><span class="bgcolor">実験を</span></span><span class="textline"><span class="bgcolor">しているので、</span></span><span class="textline"><span class="bgcolor">これは</span></span><span class="textline"><span class="bgcolor">あえて</span></span><span class="textline"><span class="bgcolor">分かりにくい</span></span><span class="textline"><span class="bgcolor">文章に</span></span><span class="textline"><span class="bgcolor">するつもりだったが、</span></span><span class="textline"><span class="bgcolor"></span></span>
</div>
<div class="br">&nbsp;</div>
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">実際</span></span><span class="textline"><span class="bgcolor">のところ</span></span><span class="textline"><span class="bgcolor">酔っ払っているのでこのまま</span></span><span class="textline"><span class="bgcolor">勢い</span></span><span class="textline"><span class="bgcolor">に</span></span><span class="textline"><span class="bgcolor">任せて</span></span><span class="textline"><span class="bgcolor">タイピングしていけば</span></span><span class="textline"><span class="bgcolor">訳の</span></span><span class="textline"><span class="bgcolor">わからない</span></span><span class="textline"><span class="bgcolor">文章に</span></span><span class="textline"><span class="bgcolor">なることは</span></span><span class="textline"><span class="bgcolor">うけあいだ。</span></span><span class="textline"><span class="bgcolor"></span></span>
</div>
<div class="br">&nbsp;</div>
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">きょうは</span></span><span class="textline"><span class="bgcolor">博多駅の</span></span><span class="textline"><span class="bgcolor">ヨドバシカメラに</span></span><span class="textline"><span class="bgcolor">行って</span></span><span class="textline"><span class="bgcolor">オーブンレンジを</span></span><span class="textline"><span class="bgcolor">買った。</span></span><span class="textline"><span class="bgcolor">子供が</span></span><span class="textline"><span class="bgcolor">生まれると</span></span><span class="textline"><span class="bgcolor">金が</span></span><span class="textline"><span class="bgcolor">かかりますね。</span></span><span class="textline"><span class="bgcolor">先週は</span></span><span class="textline"><span class="bgcolor">トヨタの</span></span><span class="textline"><span class="bgcolor">ディーラーに</span></span><span class="textline"><span class="bgcolor">行ったので……</span></span>
</div>
<div class="br">&nbsp;</div>
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">まあ</span></span><span class="textline"><span class="bgcolor">福岡に</span></span><span class="textline"><span class="bgcolor">住んでいて</span></span><span class="textline"><span class="bgcolor">車を</span></span><span class="textline"><span class="bgcolor">持っていないというのも</span></span><span class="textline"><span class="bgcolor">不便な</span></span><span class="textline"><span class="bgcolor">話なので良い</span></span><span class="textline"><span class="bgcolor">機会だったと</span></span><span class="textline"><span class="bgcolor">思っている。</span></span><span class="textline"><span class="bgcolor">オーブンレンジも、</span></span><span class="textline"><span class="bgcolor">まあ</span></span><span class="textline"><span class="bgcolor">買ってよかったものに</span></span><span class="textline"><span class="bgcolor">なるんじゃないかな。</span></span><span class="textline"><span class="bgcolor"></span></span>
</div>
<div class="br">&nbsp;</div>
<div class="textblock">
<span class="textline linetop"><span class="bgcolor">こんな感じに</span></span><span class="textline"><span class="bgcolor">グダグダの</span></span><span class="textline"><span class="bgcolor">文章を</span></span><span class="textline"><span class="bgcolor">書いてみて</span></span><span class="textline"><span class="bgcolor">よいのだろうか？</span></span>
</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>
<div class="br">&nbsp;</div>

<link rel="preload" as="style" href="https://reading-assist.com/css/jquery.mobile-1.4.5.min2.css" onload="this.rel='stylesheet'">
<link rel="preload" as="style" href="https://reading-assist.com/css/style.css" onload="this.rel='stylesheet'">
<script type="text/javascript" src="https://reading-assist.com/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/steps_convert.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/jquery.mobile-1.4.5.js"></script>
{{< /raw >}}

---

[読書アシスト](https://read-assist-dxn.web.app/)  

……というふうに hugo でも使えることが分かった。ページ全体のレイアウトが崩れるが、これはご愛嬌ということで。

　今回は Pyhton で以下のようなスクリプトを書いて html を得た。

```python
#!/usr/bin/env python3

import requests
from pprint import pprint

text = """
DNP の開発した「読書アシスト」を hugo で利用する実験をしているので、これはあえて分かりにくい文章にするつもりだったが、
実際のところ酔っ払っているのでこのまま勢いに任せてタイピングしていけば訳のわからない文章になることはうけあいだ。
きょうは博多駅のヨドバシカメラに行ってオーブンレンジを買った。子供が生まれると金がかかりますね。先週はトヨタのディーラーに行ったので……
まあ福岡に住んでいて車を持っていないというのも不便な話なので良い機会だったと思っている。オーブンレンジも、まあ買ってよかったものになるんじゃないかな。
こんな感じにグダグダの文章を書いてみてよいのだろうか？
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

しかしこれで得られる html は html タグまで含むから必要な div を抜き出さなければならない。また CSS/JavaScript は https://reading-assist.com からの相対パスになっているので多少の編集が必要だし、 CSS は body 中で読み込むことになるので遅延読み込みをしたら良いだろう。以下のようにすれば良い。

```html
<link rel="preload" as="style" href="https://reading-assist.com/css/jquery.mobile-1.4.5.min2.css" onload="this.rel='stylesheet'">
<link rel="preload" as="style" href="https://reading-assist.com/css/style.css" onload="this.rel='stylesheet'">

<script type="text/javascript" src="https://reading-assist.com/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/steps_convert.js"></script>
<script type="text/javascript" src="https://reading-assist.com/js/jquery.mobile-1.4.5.js"></script>
```

実際にこの記事に使った Markdown ファイルは [Github](https://github.com/tbsmcd/tbsmcd.github.io/blob/source/content/post/dnp-reading-asist/index.md) にあるので見てほしい。
