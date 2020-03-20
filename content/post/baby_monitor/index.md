---
title: "簡易ベビーモニター（赤外線対応）を Raspberry Pi で作った（ノーコード・ノー工具）"
description: "簡易ベビーモニターを Raspberry Pi で作った話。コードは書かず、工具も使わなかった。"
image: "case.jpg"
date: 2020-03-20T19:22:23+09:00
tags: ["Raspberry Pi"]
archives: ["2020-03"]
draft: false
---
## 前提
セットアップは[こちら](https://tbsmcd.net/post/raspberry_pi_setup/)から。

## 要件
0歳児は夜寝るのが早い。だいたい20時には寝ているが、親である我々はそんなに早く寝ることが出来ない。なので子供が寝ている暗い部屋の隣の明るい部屋で夕食を食っていたりするのだけど、最近寝返りをしてそのままうつ伏せで寝ることがあり、うつ伏せ寝は危険なので監視している必要がある。部屋の仕切りを開放すると寝室が明るくなり眠りが浅くなるので、なるべく暗いままで監視がしたい。これは早めに解決したい課題なので、以下の最低限の機能を早く実現する（完成品買えば？）。

- 暗視カメラとして使用できる
- スマートフォン・PC から確認できる

## カメラモジュール

{{< raw >}}
<div>
<a href="https://www.amazon.co.jp/gp/product/B01ERDONZS/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=ca6e43e69545c11f661d779203e957ca&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01ERDONZS&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>
</div>
{{< /raw >}}

Raspberry Pi に差し込めばすぐに使える。しかし冷静に考えたら高いな……（完成品買えば？）

## mjpg-streamer のインストール
カメラの画像（静止画・動画）をストリーミング配信するツール。

```bash
$ sudo apt-get -y cmake libv4l-dev libjpeg-dev imagemagick
$ git clone https://github.com/jacksonliam/mjpg-streamer.git mjpg-streamer
$ cd mjpg-streamer/mjpg-streamer-experimental
$ make
```

## mjpg-streamer の起動

```bash
$ cd ~/mjpg-streamer/mjpg-streamer-experimental
$ $ ./mjpg_streamer -o "./output_http.so -w ./www" -i "./input_raspicam.so -x 640 -y 480 -fps 30 -q 10"
```

Raspberry Pi を起動するたびにこのコマンドを打っていても仕方ないので、`/etc/rc.local` の最終行 `exit 0` の前に雑なコマンドを書いて起動時に実行されるようにしている。

```bash
cd /home/pi/mjpg-streamer/mjpg-streamer-experimental/ && ./mjpg_streamer -o "./output_http.so -w ./www" -i "./input_raspicam.so -x 640 -y 480 -fps 30 -q 10"
```

## ケースを作成
現代家庭生活であり余る資材とは段ボールのことだ。なのでこうなる。

{{< img600x src="case.jpg" alt="段ボールケース">}}

## 光源
赤外線カメラなので赤外線を照射する必要がある。Amazon で適当に買った。強い赤外線を見つめ続けると白内障になる恐れがあるようで、たぶん神経質になるほどのものではないが、いちおう部屋の天井に向かって照射し、部屋全体に拡散するようにしている。

## ブラウザからアクセス
http://[ホスト名]:8080/?action=stream  

{{< img400x src="kuma.jpg" alt="赤外線カメラの画像">}}

## 展望
せっかく寝室にラズパイを置くので、他に使いみちがあると思っている。例えば子供の安眠のためにホワイトノイズを流しているときにインターフォンに気付かないことがあるので、インターフォンを監視しているラズパイから通知が来たら寝室のラズパイがランプを光らせるとか（スマートフォンに通知すれば良いのだけど、寝かしつけ中は案外気付けない）、ありがちだけど環境監視とか。

