---
title: "hugo にシンタックスハイライトを追加した"
date: 2020-02-05T21:41:48+09:00
tags: ["hugo"]
archives: ["2020-02"]
draft: false
---
## こういう表示になった
```simple.php
<?php
class SimpleClass
{
    // プロパティの宣言
    public $var = 'a default value';

    // メソッドの宣言
    public function displayVar() {
        echo $this->var;
    }
}
```
[PHP: クラスの基礎 - Manual ](https://www.php.net/manual/ja/language.oop5.basic.php) より

## テーマの編集

対応する Pull Request
[Add syntax highlighting #1](https://github.com/tbsmcd/hugo-xmin/pull/1)


シンタックスハイライト用の CSS を生成する。https://gohugo.io/commands/hugo_gen_chromastyles/
`style-name` は[ここ](https://xyproto.github.io/splash/docs/longer/index.html)から好きなものを選べば良い。今回は manni を選んだ。ついでにインラインコードの背景を manni と合わせた。
```
$ hugo gen chromastyles --style [style-name] > code.css
```

生成した CSS を [static/css/ 以下に配置し](https://github.com/tbsmcd/hugo-xmin/pull/1/files#diff-8b819c8434b56b4e51f882d264ee6fbe)、html から読み込みために [header を編集](https://github.com/tbsmcd/hugo-xmin/pull/1/files#diff-8ab16b2cae0b26a574b75e8e5c19e378)する。

ローカルでビルドする場合はブログのソースに CSS を追加すれば良いと思う。今回は Github Actions でビルドしているため、テーマの方に追加した。その場合でもテーマに追加せず、ビルドスクリプト上で配置することも出来ると思う。

## config.toml の編集

対応する Pull Request
[シンタックスハイライト適用 #5](https://github.com/tbsmcd/tbsmcd.github.io/pull/5)

```
# シンタックスハイライトを有効に
pygmentsUseClasses = true
# github 風に ``` で囲む
pygmentsCodefences = true
```

## ついでに

style.css の pre から border と box-shadow もいらないので削除した。

## 所感

本筋とは関係ないが Github で管理すると機能追加した P/R をブログに載せれるので便利。
