---
title: "言語処理100本ノック 2020 第2章"
description: "言語処理100本ノック2020 第2章"
image: "ss.png"
date: 2020-04-26T23:31:58+09:00
tags: ["言語処理100本ノック", "Python"]
archives: ["2020-04"]
draft: false
---

{{< img400x src="ss.png" alt="Jupyter notebook" >}}
  
[言語処理100本ノック 2020 - NLP100 2020](https://nlp100.github.io/ja/)
  
関連記事: [tag 言語処理100本ノック](/tags/言語処理100本ノック/)
 
## code
.  
.  
.  
.  
.  
.  
  
```python
target_dir = '/users/tbsmcd/Documents/'
file_path = target_dir + 'popular-names.txt'

# 010
with open(file_path) as f:
    for i, r in enumerate(f, 1): # 最初のキーを1として取得（デフォルトは0）
        pass
print(i)

# wc popular-names.txt 
#     2780   11120   55026 popular-names.txt
```

```python
# 011
res = ''
with open(file_path) as f:
    for row in f:
        res += row.replace("\t", " ")
print(res)

#cat popular-names.txt | tr '\t' ' '
```

```python
# 012
col1 = []
col2 = []
with open(file_path) as f:
    for row in f:
        cols = row.split("\t")
        col1.append(cols[0])
        col2.append(cols[1])
with open(target_dir + 'col1.txt', mode='w') as f:
    f.write('\n'.join(col1) + '\n')
with open(target_dir + 'col2.txt', mode='w') as f:
    f.write('\n'.join(col2) + '\n')
    
# cut -f 1 ./popular-names.txt
# cut -f 2 ./popular-names.txt
```

```python
# 013
col1 = []
col2 = []
with open(target_dir + 'col1.txt') as f:
    for row in f:
        col1.append(row.strip())
with open(target_dir + 'col2.txt') as f:
    for row in f:
        col2.append(row.strip())
cols = []
for c1, c2 in zip(col1, col2):
    cols.append(c1 + '\t' + c2)
with open(target_dir + 'col1+2.txt', mode='w') as f:
    f.write('\n'.join(cols))

# paste col1.txt col2.txt
```

paste コマンド超便利

```python
# 014
import argparse

parser = argparse.ArgumentParser(description='先頭からN行を出力する')
parser.add_argument('lines', help='出力したい行数')
args = parser.parse_args(args=['5']) 

with open(file_path) as f:
    text = f.read()
print('\n'.join(text.split('\n')[0:int(args.lines)]))

# head -n 5 popular-names.txt
```

Jupyter を使っているため `parser.parse_args()` にはあらかじめ引数を与えておく。実際にコマンドとして使う際には空にする。

```python
# 015
import argparse

parser = argparse.ArgumentParser(description='末尾からN行を出力する')
parser.add_argument('lines', help='出力したい行数')
args = parser.parse_args(args=['5']) 

with open(file_path) as f:
    text = f.read().strip()
print('\n'.join(text.split('\n')[-int(args.lines):]))

# tail -n 5 popular-names.txt
```

`strip()` が無いと最終行のあとの改行文字でも分割され、空の要素が生まれる。

```python
# 016
import argparse
import math

parser = argparse.ArgumentParser(description='末尾からN行を出力する')
parser.add_argument('split', help='分割したい個数')
args = parser.parse_args(args=['5']) # Jupyter なので擬似的に渡す 

step = int(args.split)

with open(file_path) as f:
    rows = f.read().strip().split('\n')
row_num = math.ceil(len(rows) / step)

splited = [rows[i:i + row_num] for i in range(0, row_num, step)]
# あとは join で文字列にするだけ

# split -n 5 popular-names.txt
# mac だと使えないオプションが違う
```

`range()` の第3引数の step 個飛ばしでループさせているだけ。split コマンドの -n は mac のデフォルトだと使えない。

```python
# 017
with open(file_path) as f:
    rows = f.read().strip().split('\n')
set([r.split('\t')[0] for r in rows])

# cut -f 1 popular-names.txt | sort | uniq
```

Python 側もだいぶ短いコードで実現できる。

```python
# 018
with open(file_path) as f:
    rows = f.read().strip().split('\n')
sorted(rows, key=lambda x: int(x.split('\t')[2])*-1)
# あとは join などで……

# sort -brn -k 3 popular-names.txt
```

文字列連結部分は繰り返しなので省略している。

```python
# 019
with open(file_path) as f:
    rows = f.read().strip().split('\n')
names = [r.split('\t')[0] for r in rows]
names_dic = {}
for n in set(names):
    names_dic[n] = names.count(n)

sorted(names_dic.items(), key=lambda x: x[1], reverse=True)

# cut -f 1 popular-names.txt | sort | uniq -c | sort -brn -k 1
```

items() を使えばタプルとして取得できるのをよく忘れる。

