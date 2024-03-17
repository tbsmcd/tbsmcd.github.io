---
title: "AHK(AutoHotkey) V2.0系で「どのアプリからでもコピペしてググる」"
description: "「選択中のテキストをブラウザの新しいタブににコピペしてググる」という一連の動作を AHK で便利に。ブラウザ上でもそれ以外でも同一のショートカットが使えて良い。"
date: "2024-03-17T21:18:00+09:00"
tags: ["AutoHotkey", "Windows"]
series: ["AutoHotkey"]
archives: "2024-03"
image: "ogp.png"
---



{{< series name="AutoHotkey">}}  
また AHK ネタ。

## ブラウザ以外からググるのが微妙に面倒

　Web ブラウザ以外のウインドウにある単語をググるとき……

1. コピー

1. ブラウザを開く

1. 新しいタブを開く

1. アドレスバーにペースト

1. Enter 

これは微妙に面倒だし、費やす時間も塵も積もれば山となるだろう。そういうのは自動化する。

結果、ブラウザ上でもそれ以外でも同一のショートカットで同一の結果が得られるのでとても快適になった。

## 方針

- メインブラウザは MS Edge という想定
- たまに Google Chrome も使う
- Chrome からググるときはそのまま Chrome を使う
- Edge を含めた他のウインドウからググるときは Edge を使う
- ググるだけでなく URL(URI) も開く

いまどきのブラウザはアドレスバーに文字列をペーストして `Enter` を押せばググれる。素直に考えるとググるためにはコピーした文字列をクエリにした URL を開く必要があるが、「ググるだけでなく URL も開く」という条件を入れることで「新しいタブを開きコピーした文字列をペースとして `Enter`」という動作を再現すれば良くなる。MS Edge も Chrome も `Ctrl + t` で新しいタブを開き、アドレスバーが入力を待機しているという共通点があるので

1. 文字列を選択した状態で `Ctrl + c` でコピーする

1. 目的のブラウザを Active にする

1. `Ctrl + t` で新しいタブを開く

1. `Ctrl + v` でアドレスバーにペースト

1. `Enter` でググる or URL(URI) を開く

というシンプルなことを行えば良い。

（クリップボードの内容を前後で維持する処理は必要）

## 実装


```javascript
/*
===================================
どのアプリからもググる or URLを開く
右 Shift + g で発火
※ メインブラウザが Edge, Chrome も併用しているのが前提
- Chrome 上で操作した場合 → Chrome で開く
- それ以外で操作した場合
    - Edge が開いている場合は Edge で開く
    - 開いていない場合はメッセージを表示
===================================
*/

RShift & g::{
    clip_data := ClipboardAll(); クリップボードの中身を退避
    A_Clipboard := ""
    Send "^c"
    ClipWait 1
    copied := String(A_Clipboard)
    if (copied != "") {
        if not WinActive("ahk_exe chrome.exe") {
            if WinExist("ahk_exe msedge.exe") {
                WinActivate
            } else {
                MsgBox "Edge が起動していません"
                A_Clipboard := clip_data; クリップボードを復元
                return
            }
        }
        Send "^t"
        Send copied
        Send "{Enter}"
    }
    A_Clipboard := clip_data; クリップボードを復元
}

```

クリップボード関係の処理は別にいらないという人もいるかもしれない。

### おまけ

Chrome しか使わない人であればたぶん下のようにしたらよい。


```javascript
/*
===================================
どのアプリからもググる or URLを開く
右 Shift + g で発火
※ ブラウザは Chrome を使用しているのが前提
- Chrome が開いている場合は Chrome で開く
- 開いていない場合はメッセージを表示
===================================
*/

RShift & g::{
    clip_data := ClipboardAll()
    A_Clipboard := ""
    Send "^c"
    ClipWait 1
    copied := String(A_Clipboard)
    if (copied != "") {
        if WinExist("ahk_exe chrome.exe") {
		        WinActivate
            Send "^t"
            Send copied
            Send "{Enter}"
        } else {
            MsgBox "Chrome が起動していません"
        }
    }
    A_Clipboard := clip_data
}

```
