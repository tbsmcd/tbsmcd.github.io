---
title: "Raspberry Pi セットアップ 2020 春 ~ SSH + VNC 接続まで"
description: "Raspberry Pi をセットアップ。2020年春の記録。SSH, VNC"
image: "ssh.png"
date: 2020-03-20T00:34:00+09:00
tags: ["Raspberry Pi"]
archives: ["2020-03"]
draft: falsee
---
## 前提

作業環境は macOS Mojave  
本体は Raspberry Pi 3 model B  
  
`➤` で始まるのは mac のターミナル、 `$` で始めるのは Raspberry Pi のターミナル

## 買ったもの
### 本体とストレージ
{{< raw >}}
<div>
<a href="https://www.amazon.co.jp/gp/product/B01NHEBAN5/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=918ff93f96b787b30247dfdbd1532ffa&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B01NHEBAN5&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>

<a href="https://www.amazon.co.jp/gp/product/B009D79VH4/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=308761c98124ac120da819cbbd809c1e&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B009D79VH4&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>

<a href="https://www.amazon.co.jp/gp/product/B07YLT539N/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=f39de52f3a25628346ad5906ddc0012d&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07YLT539N&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>
</div>
{{< /raw >}}

### 電源周り
{{< raw >}}
<div>
<a href="https://www.amazon.co.jp/gp/product/B0197AP6B6/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=962dbe9cc3f58c0d5a2984f26c6a174c&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0197AP6B6&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>

<a href="https://www.amazon.co.jp/gp/product/B07TX8RT8L/ref=as_li_ss_il?ie=UTF8&psc=1&linkCode=li2&tag=tbsmcd-22&linkId=63a5417deaec890f25a05ee5ae15ac65&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07TX8RT8L&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=tbsmcd-22&language=ja_JP" ></a>
</div>
{{< /raw >}}

USB 接続のキーボード、マウスなどは家に転がっているもので良い。

## OS(Raspbian) ダウンロード

[Download Raspbian for Raspberry Pi](https://www.raspberrypi.org/downloads/raspbian/) に3種類あり、大（デスクトップ環境に LibreOffice や多くの開発環境などいろいろ入ってる）中（デスクトップの環境……ブラウザや多少の開発環境がある）小（CUI）という感じ。今回は中（Raspbian Buster with desktop）を選んだ。ただしここから直接ダウンロードすると数時間かかるようだったので、国内のミラーからダウンロードした。

[RaspbianMirrors - Raspbian](https://www.raspbian.org/RaspbianMirrors)

今回は JAIST を選択。

## microSD の準備

[公式ドキュメント](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)を参考に。

### フォーマット

microSD を接続しターミナルで `diskutil list`

```bash
➤ diskutil list
/dev/disk0 (internal):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                         251.0 GB   disk0
   1:                        EFI EFI                     314.6 MB   disk0s1
   2:                 Apple_APFS Container disk1         250.7 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +250.7 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume Macintosh HD            73.7 GB    disk1s1
   2:                APFS Volume Preboot                 45.5 MB    disk1s2
   3:                APFS Volume Recovery                510.4 MB   disk1s3
   4:                APFS Volume VM                      3.2 GB     disk1s4

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *31.9 GB    disk2
   1:             Windows_FAT_32 NO NAME                 31.9 GB    disk2s1
```

`/dev/disk2` が microSD なので、新品なら多くの場合 `FAT-32` になっているのでフォーマットの必要はないと思う（`/dev/disk2` 部分は、他のメディアを接続していたりすると変わる）。もしフォーマットする場合は以下の通り。

```bash
➤ diskutil eraseDisk MS-DOS RP0 /dev/disk2
Started erase on disk2
Unmounting disk
Creating the partition map
Waiting for partitions to activate
Formatting disk2s2 as MS-DOS (FAT) with name RP0
512 bytes per physical sector
/dev/rdisk2s2: 61891008 sectors in 1934094 FAT32 clusters (16384 bytes/cluster)
bps=512 spc=32 res=32 nft=2 mid=0xf8 spt=32 hds=255 hid=411648 drv=0x80 bsec=61921280 bspf=15111 rdcl=2 infs=1 bkbs=6
Mounting disk
Finished erase on disk2
```

`RP0` は自分で設定したデバイス名なので、任意で良い。

### イメージの書き込み

microSD をアンマウントし、

```
➤ diskutil umountDisk /dev/disk2
Unmount of all volumes on disk2 was successful
```

ダウンロードしたイメージを書き込む（path は個々人の環境による）。

```
➤ sudo dd bs=1m if=/path/to/2020-02-13-raspbian-buster.img of=/dev/rdisk2 conv=sync
```

`of=/dev/disk2` とした場合はバッファを通して書き込むのに対し、`/dev/disk2` とした場合はバッファを通さないので早い（はず）。

eject はデスクトップから行った。

## 本体を起動

イメージを書き込んだ microSD を Raspberry Pi に挿入し、電源用の Micro USB を挿せば起動する。ディスプレイ・キーボード・マウスも接続しておく。いまどきの Raspbian は設定ウィザードが充実しているので、求められる通りに設定していけば Wi-Fi の設定まで完了する。楽すぎる……

## SSH 接続
### SSH 有効化
キーボードは接続したものの、ふだんから慣れているデバイスで操作したいというのが人類の性。なので SSH 接続できるようにする。
といっても、メニュー > 設定 > Raspberry Pi の設定 から

{{< img600x src="ssh.png" alt="ssh 設定">}}

とすれば有効になる。簡単。

### ホスト名で接続

ついでにホスト名で接続したいので、まずはファイル編集用に Vim をインストール。Raspberry Pi のターミナルで

```bash
$ sudo apt-get update
$ sudo apt-get install vim
```

`/etc/hostname` の編集

```
$ sudo vim /etc/hostname
```

```
rp0.local
```

とする（rp0 は任意のホスト名に変更）。

`/etc/hosts` の編集

```
$ sudo vim /etc/hosts
```

```
127.0.1.1	rp0
```

を追加で書き込む(rp0は以下略)。

一旦再起動したら、 mac のターミナルから

```
➤ ssh pi@rp0.local
```

とすればログインできる（rp0は）。

## リモートデスクトップの設定
### Raspberry Pi に VNC サーバをインストール

**ここから追記 2020-03-20**  
  
[公式ドキュメント](https://www.raspberrypi.org/documentation/remote-access/vnc/README.md) には RealVNC での接続方法が掲載されている。  

realvnc-vnc-server のインストール
```bash
$ sudo apt install realvnc-vnc-server
```

インストールが完了すると、デスクトップのメニュー > 設定 > Raspberry Pi の設定 で VNC を有効にできる。未インストール状態ではラジオボタンが選択不可になる。

{{< img600x src="vnc_enable.png" alt="vnc 設定">}}

macOS 側では [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/macos/) をインストールする必要がある。インストール後起動し、 IP アドレスかホスト名を入力すれば接続出来る。初回は Raspberry Pi 側のユーザ名（デフォルトは pi）とパスワード（セットアップ時に設定したもの）を求められる。

{{< img600x src="realvnc.png" alt="mac 側の VNC クライアント">}}

こちらの方法が公式に案内・提供されているので、下記 tightvncserver を使う方法よりよいと思う。

**ここまで追記 2020-03-20**


```
$ sudo apt-get install tightvncserver
```

でインストールできるので、完了したら

```
$ tightvncserver
```

で起動できる。初回は VNC 用にパスワードを設定するよう要求されるので適切なものを設定する。

### mac から接続

Finder のメニューから 移動 > サーバへ接続 を選択し、

{{< img400x src="vnc.png" alt="ssh 設定">}}

（rp0はホスト名なので以下略）

以上でひとまずの動作環境は出来た。
