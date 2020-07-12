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
