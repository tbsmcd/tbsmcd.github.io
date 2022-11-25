---
title: "blog ダークモード対応（2）OS のモードに対応する方法"
description: "OS のダークモードに CSS/JavaScript で対応する方法と、ユーザ操作に対応する方法。"
date: "2022-11-25T22:08:00+09:00"
tags: ["CSS", "JavaScript"]
series: ["blogダークモード対応"]
archives: "2022-11"
image: "ogp.png"
---



{{< series name="blogダークモード対応">}}  
## この記事で書くこと

- CSS だけで OS のダークモードに追従する方法
- JavaScript で OS のダークモードに追従する方法
- ユーザが明示的に指定したカラースキームに対応する方法
	- 指定されたカラースキームを保持する方法
- 実際に行ったこと

## CSS だけで OS のダークモードに追従する方法

　CSS のメディア特性 `prefers-color-scheme` を使う。

ref. [https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme](https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-color-scheme) 


```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

## JavaScript で OS のダークモードに追従する方法

　JavaScript でも同様にモードを取得できる。

ref. [https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)


```javascript
if (matchMedia('(prefers-color-scheme: dark)').matches) {
  // ダークモードのとき
} else {
  // ダークモードではないとき
}
```

## ユーザ指定のカラースキームに対応する方法

　以下は `checkbox` で対応する場合。


```html
<input type="checkbox" id="cb-dark-theme"> Dark them
```


```javascript
const cbDark = document.getElementById("cb-dark-theme");
const setDark = () => {
    document.body.classList.add("dark-theme");
    cbDark.checked = true;
};
const setLight = () => {
    document.body.classList.remove("dark-theme");
    cbDark.checked = false;
}
cbDark.addEventListener("change", (e) => {
    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
});

```


```css
.dark-theme {
	color: #ffffff;
    opacity: 0.9;
	background: $dark_base_color;
（略）
```

通常の JavaScript と同じくイベントを捕捉したら良い。ダークカラースキームのときに `.dark-theme` を追加し、ライトカラースキームのときに削除しているが、 CSS の書き方によってはライトカラースキームのときに `.light-theme` を追加するようにしても良いだろう。

### 状態の保持方法

　`checkbox` で設定した状態はページ遷移したら保持できないので `localStorage` か `sessionStorage` を使う。単にページ遷移しても保持したい場合は `sessionStorage` で良く、ブラウザを閉じても保持したい場合は `localStorage` を使う。


```javascript
cbDark.addEventListener("change", (e) => {
    if (e.target.checked) {
        // だーく
        localStorage.setItem("selectedTheme", "dark");
    } else {
        setLight();
        localStorage.setItem("selectedTheme", "light");
    }
})
```

## 実際に行ったこと

　前回書いたように

- 当 blog においてカラースキームを明示的に選択しない場合は OS のモードに従う
- 明示的にカラースキームを選択した場合はそれに従う

としたいので、

- `localStorage` にモードが保存されている場合はそれに従う
- `localStorage` にモードが保存されていない場合は OS のモードに従う
- ユーザが `checkbox` を操作した場合はカラースキームを設定し、 `localStorage` に保存する

とした。


```javascript
document.addEventListener("DOMContentLoaded", (event) => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme == "dark") {
        setDark();
    } else if (selectedTheme == "light") {
        setLight();
    } else {
        const pcs = window.matchMedia("(prefers-color-scheme: dark)"); 
        if (pcs.matches) {
            setDark();
        } else {
            setLight();
        }
    }
});
const cbDark = document.getElementById("cb-dark-theme");
const setDark = () => {
    document.body.classList.add("dark-theme");
    cbDark.checked = true;
};
const setLight = () => {
    document.body.classList.remove("dark-theme");
    cbDark.checked = false;
}
cbDark.addEventListener("change", (e) => {
    if (e.target.checked) {
        setDark();
        localStorage.setItem("selectedTheme", "dark");
    } else {
        setLight();
        localStorage.setItem("selectedTheme", "light");
    }
});
```
