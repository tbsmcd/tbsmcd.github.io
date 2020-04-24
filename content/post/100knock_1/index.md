---
title: "言語処理100本ノック2020 を始めた 第1章"
description: "言語処理100本ノック2020 の解答を自分なりに"
image: "ss.png"
date: 2020-04-24T23:32:34+09:00
tags: ["言語処理100本ノック", "Python"]
archives: ["2020-04"]
draft: false
---

{{< img400x src="ss.png" alt="Jupyter notebook" >}}

[言語処理100本ノック 2020 - NLP100 2020](https://nlp100.github.io/ja/)

## なぜ？
最近 Python を書いてないこともあり、思うところもあり。

## 環境
Python3 + [Anaconda](https://www.python.jp/install/anaconda/macos/install.html) + [Jupyter Notebook](https://jupyter.org/)

インストール等については気が向いた時に。

## code
以下ネタバレ
  
.
.
.
.
.
.
.
.
.

まず第1章から

```python
# 000
st = 'stressed'
ans = ''
for i in range(len(st)):
    ans += st[-i - 1]
print(ans)
```

```python
# 000
st = 'stressed'
print(st[::-1]) # [start:stop:step] start = 0 つまり1文字目の前から
```

```python
# 001
st = 'パタトクカシーー'
print(st[0] + st[2] + st[4] + st[6])
```

```python
# 001
st = 'パタトクカシーー'
print(st[::2]) # 000 と同様
```

```python
## 002
pc = 'パトカー'
tx = 'タクシー'
print(''.join([p + t for p, t in zip(pc, tx)])) # zip : 複数の list の要素をまとめて読む, 内包表記のことを忘れている
```

```python
# 003
txt = 'Now I need a drink, alcoholic of course, after the heavy lectures involving quantum mechanics.'
words = txt.replace(',', '').replace('.', '').split()
[len(word) for word in words]
```

```python
# 004
txt = 'Hi He Lied Because Boron Could Not Oxidize Fluorine. New Nations Might Also Sign Peace Security Clause. Arthur King Can.'
words = txt.replace('.', '').split()
target = [1, 5, 6, 7, 8, 9, 15, 16, 19]
res = {}
i = 1
for i, w in enumerate(words): #  enumerate 忘れる
    if (i + 1 in target):
        res[w[0:1]] = i + 1 
    else:
        res[w[0:2]] = i + 1
res
```

```python
# 005
def n_gram(target, n): # スライスは文字列でもリストでも出来る
    return [target[i:i + n] for i in range(len(target) - n + 1)]

target = 'I am an NLPer'

# 文字 bi-gram
print(n_gram(target, 2))

# 単語 bi-gram
print(n_gram(target.split(' '), 2))
```

```python
# 006
def n_gram(target, n):
    return set([target[i:i + n] for i in range(len(target) - n + 1)])

X = n_gram('paraparaparadise', 2)
Y = n_gram('paragraph', 2)

# 和集合
print(X | Y)
# 積集合
print(X & Y)
# 差集合
print(X - Y)
# 存在確認
print('se' in X)
print('se' in Y)
```

```python
# 007
def sent(x, y, z):
    return(str(x) + '時の' + str(y) + 'は' + str(z))
print(sent(12, '気温', 22.4))
```

```python
# 008
def cr(st):
    res = ''
    for s in list(st):
        if s.isalpha and s.islower
            res += chr(219 - ord(s))
        else:
            res += s
    return res

code = cr("I'm happy.")
string = cr(code)

print(code)
print(string)
```

```python
## 009
import random

def make_rand(s):
    if len(s) <= 4:
        return s
    else:
        li = list(s)
        first = li.pop(0)
        last = li.pop(-1)
        random.shuffle(li)
        return first + ''.join(li) + last

text = 'I couldn’t believe that I could actually understand what I was reading : the phenomenal power of the human mind .'
res = ''
for w in text.split(' '):
    res += make_rand(w)

print(res)
```

最初の方は内包表記などを思い出すために複数パターン書いてみたが、あとの方では飽きてる。
