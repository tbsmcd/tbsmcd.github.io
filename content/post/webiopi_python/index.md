---
title: "WebIOPi を使い Web ブラウザから Raspberry Pi 上で Python を実行する"
description: "WebIOPi を使いブラウザから Raspberry Pi 上で Python を実行する。WebIOPi のインストール、スクリプトの配置など。"
image: "webiopi.png"
date: 2020-03-29T23:23:45+09:00
tags: ["Raspberry Pi", "Python"]
archives: ["2020-03"]
draft: false
---

何ら新規性はないが作業記録として。

## WebIOPi のインストール

WebIOPi はラズパイ上の [GPIO](https://ja.wikipedia.org/wiki/GPIO) 、センサ、コンバータなどを Web ブラウザや他のアプリから操作するためのライブラリ（Control, debug, and use your Pi's GPIO, sensors and converters from a web browser or any app）。REST API を用意しているから他のアプリからでも操作できるということだろう。
  
{{< img400x src="webiopi.png" alt="WebIOPi とは？" >}}  
[The Raspberry Pi Internet of Things Toolkit - Now in two flavors](http://webiopi.trouch.com/) より  
  
今回は GPIO を用いないが、 Python のスクリプトを実行できる手軽な環境ということで使うことにした。『[カラー図解 最新 Raspberry Pi で学ぶ電子工作 作って動かしてしくみがわかる（ブルーバックス）](https://amzn.to/2xxiCBU)』でも使い方が書かれているし、デファクト・スタンダードなのだろう。しかし最終バージョンが2015年なので現在の Raspbian で動かすにはパッチを当てる必要がある。
  
```bash
# ダウンロード
$ wget https://sourceforge.net/projects/webiopi/files/WebIOPi-0.7.1.tar.gz
$ tar zxvf WebIOPi-0.7.1.tar.gz
# パッチをあてる
$ cd WebIOPi-0.7.1/
$ wget https://raw.githubusercontent.com/doublebind/raspi/master/webiopi-pi2bplus.patch
$ patch -p1 -i webiopi-pi2bplus.patch
# インストール
$ sudo ./setup.sh
# 今回は家庭内で使うから n
# y の場合は Weaved IoT Kit がインストールされ、外部ネットワークから利用可能に出来る
Do you want to access WebIOPi over Internet ? [y/n]
n
# systemctl のための設定
$ cd /etc/systemd/system/
$ sudo wget https://raw.githubusercontent.com/doublebind/raspi/master/webiopi.service
# 起動
$ sudo systemctl start webiopi
```

`http://[ホスト名]:8000` でアクセスし、ユーザ名 webiopi パスワード raspberry で動作を確認出来る。

## 実際にスクリプトを書く

ファイル配置は以下の通り

```bash
pi@rp0:~ $ tree webiopi/
webiopi/
├── index.html
├── main.js
└── scripts
    └── noise.py
```

今回は子供の安眠のためのピンクノイズ発生機能を[簡易ベビーモニター](https://tbsmcd.net/post/baby_monitor/)に追加したいので `noise.py` となっているが、各自好きにしたらよいだろう。

### 作業ディレクトリの追加

```bash
$ mkdir webiopi
```

### WebIOPi の設定

```bash
$ cd /etc/webiopi/
$ sudo vim config

# 以下編集内容

# Use doc-root to change default HTML and resource files location
#doc-root = /home/pi/webiopi/examples/scripts/macros
doc-root = /home/pi/webiopi/

#   each sourcefile may have setup, loop and destroy functions and macros
#myscript = /home/pi/webiopi/examples/scripts/macros/script.py
myscript = /home/pi/webiopi/scripts/noise.py
```

`doc-root` は html を配置するドキュメントルート、`myscript` は実際に動作させる Python スクリプトの path。

### index.html

```html
<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Noise</title>
        <script type="text/javascript" src="/webiopi.js"></script>
        <script type="text/javascript" src="/main.js"></script>
	<meta name="viewport" content="width=device-width">
    </head>
    <body>
	<div>
        <img src="http://rp0.local:8080/?action=stream" style="width:100%">
        </div>
        <input type="button" value="Start" class="python" onClick="start()">
        <input type="button" value="Stop" class="python" onClick="stop()">
    </body>
</html>
```

`onClick` で `main.js` の関数を呼ぶ。

### main.js

```javascript
webiopi()

function start() {
    webiopi().callMacro('start');
}
function stop() {
    webiopi().callMacro('stop');
}
```

各関数が Python の関数（マクロ関数）を呼ぶだけのシンプルなもの。`webiopi().callMacro('マクロ関数名', '引数', 'コールバック関数名')` という引数を取るが、今回は引数とコールバックを省略した。

### noise.py

```python
import webiopi
import subprocess

@webiopi.macro
def start():
    subprocess.run('pgrep -f play | xargs kill > /dev/null 2>&1', shell=True)
    subprocess.Popen('play -n synth pinknoise > /dev/null 2>&1', shell=True)

@webiopi.macro
def stop():
    subprocess.run('pgrep -f play | xargs kill > /dev/null 2>&1', shell=True)
```

Python3 で書く必要がある。とりあえずピンクノイズの発生については Python がコマンドの終了を待つ必要がないので `Popen` を使った。`@webiopi` デコレータはブラウザから実行可能にするために必要である。

`play` コマンドは Linux で音声の加工をするための Sox をインストールしたら使える。インストールコマンドは

```bash
$ sudo apt install sox
```

### 実際の画面

{{< img400x src="noise.png" alt="実際の画面" >}}

## 今後

これでブラウザから子供の睡眠環境の管理がより進むことになる。たとえば温湿度センサから値を取得しブラウザに表示するなども良いだろうし、反町隆史アイコンをタップしたら POISON が流れても良いと思う。

ref. [反町「POISON」赤ちゃん泣き止む説　ＴＶ特集され反応「すごい」「POISONマジかよ」](https://www.daily.co.jp/gossip/2020/03/05/0013167858.shtml)

いや、我が娘は泣いてる時に POISON 聴かせるとマジで泣き止むし、寝るからな。敬意を込めて「タカシ」と呼ぶことにしてる。  

閑話休題、 Web で UI を作るのは慣れたことだし Python が動けば割合なんでも出来るので、ラズパイを使う上で自由度は上がると思う。
