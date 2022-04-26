---
title: "macOS Mojave (10.14.6) + zsh 環境で Rust をインストールする"
description: "macOS Mojave (10.14.6) + zsh 環境で Rust をインストールする方法について。brew install でエラーが出た場合"
date: "2022-04-27T00:51:00+09:00"
tags: ["Rust"]
series: []
archives: "2022-04"
image: "ogp.png"
---


## 環境

<br/>

{{< img800x src="83a3f0a9.png" alt="スクリーンショット_2022-04-27_0.54.55" >}}

上記 OS で zsh を使っている。

## brew install でエラーが出たので

　自分の環境では 


```shell
% rustup-init
（略）
error: could not amend shell profile: '/Users/tbsmcd/.bash_profile'
error: caused by: could not write rcfile file: '/Users/tbsmcd/.bash_profile'
error: caused by: Permission denied (os error 13)
```

というエラーが発生したので


```shell
% curl https://sh.rustup.rs -sSf | sh -s -- --no-modify-path
（略）
% source $HOME/.cargo/env
```

で正常にインストールできた（はず）。

## インストールの確認


```shell
% rustup --version
rustup 1.24.3 (ce5817a94 2021-05-31)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.60.0 (7737e0b5c 2022-04-04)`
% cargo --version
cargo 1.60.0 (d1fd9fe2c 2022-03-01)
```

コマンドは使えている。

## コードを編集して確認

　任意のディレクトリに移動して


```shell
% cd hello_rust
% cargo run                                                                                                                                                                                                     ✭
   Compiling hello_rust v0.1.0 (/Users/tbsmcd/Scripts/hello_rust)
    Finished dev [unoptimized + debuginfo] target(s) in 1.37s
     Running `target/debug/hello_rust`
Hello, world!
```

これを編集し


```shell
% vim src/main.rs
```


```rust
fn main() {
    println!("Hello, Hakata!");
}
```


```shell
% cargo run                                                                                                                                                                                                     ✭
   Compiling hello_rust v0.1.0 (/Users/tbsmcd/Scripts/hello_rust)
    Finished dev [unoptimized + debuginfo] target(s) in 0.24s
     Running `target/debug/hello_rust`
Hello, Hakata!
```

これで自分が書いたコードが反映されていることが確認できた。
