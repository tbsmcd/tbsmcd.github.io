---
title: "hugo new で記事を新規作成すると少しダルいから自作スクリプトで編集する"
description: "hugo new で記事を新規作成するのは少しダルいので Pyhton で対話的に記事を作成できるスクリプトを書いて使用している。プログラム間を Markdown でやり取りするのは UNIX 的だと思う。"
image: "program.png"
date: 2020-07-09T22:49:20+09:00
tags: ["hugo", "Python"]
archives: ["2020-07"]
draft: false
---

## hugo new のダルさ

　hugo で新規記事を作るときはコマンドラインで`hugo new` を打つ。たとえば http://ドメイン/sample-article という記事を作りたい場合、

1. `hugo new post/sample-article/index.md` を実行する
	- `./contetn/post/sample-article/index.md` が作成される
1. エディタで作成された index.md を開き記事を書く
1. 画像を `./content/post/sample-article/` 以下に配置する

たったこれだけを実行すればよいのだが、やってみると案外ダルい。自分としてはダルさが明確で

- `hugo new post/dir-name/index.md` なのか `hugo new content/post/dir-name/index.md` なのか `hugo new posts/dir-name/index.md` なのか分からなくなる
- `hugo new コマンドでは `post/dir-name/index.md` を指定したのにエディタでは `content/post/dir-name/index.md` を指定して開かないといけない
- 画像を載せたい場合はほぼ同じ path である `content/post/dir-name/` を開いて画像を配置しなければならない

というふうに、重複がダルい。これはプログラマの美徳でいう「怠惰」精神の発露といえよう（ダルいと怠惰はほとんど同じ言葉なのだけど）。 
   
　index.md の雛形は `archetypes/default.md` に書いておけば反映されるのでさほど面倒ではない。例えばこのブログの場合は以下のようになっている。

```
---
title: ""
description: ""
image: ""
date: {{ .Date }}
tags: []
archives: ["{{ dateFormat "2006-01" .Date }}"]
draft: true
---
```

date や archives の部分の日付は勝手に補完されるし、ふつうに考えればとても便利！しかしこれを編集する手間も省きたいのが人情というもの。そこで最近は Pyhton スクリプトを書いて、対話的に記事を作っている。  

## Python スクリプト

```python
#!/usr/bin/env python3
import os
import datetime
from subprocess import run


def input_dir_name():
    name = input('Directory name: ').replace('_', '-')
    print(name)
    path = os.path.dirname(__file__) + '/content/post/{0}'.format(name)
    if os.path.exists(path):
        edit = input('This dir_name exists. Edit this page?(Y/n) : ')
        if edit == 'y' or edit == 'Y':
            return name, False
        print('Please use other name.')
        input_dir_name()
    else:
        return name, True


try:
    dir_name, is_new = input_dir_name()
    dir_path = os.path.dirname(__file__) + '/content/post/{0}'.format(dir_name)
    if is_new is True:
        print('Create new page.')
        title = input('Title: ')
        desc = input('Description: ')
        img = input('OGP image: ')
        tags = input('Tags(comma separated): ')
        draft = input('Draft(Y/n): ')
        print('Creating page: {0}/index.md'.format(dir_path))

        # タグを整理する
        tags_list = ['"{0}"'.format(x.strip()) for x in tags.split(',')]
        tags_str = ', '.join(tags_list)

        # is draft
        if draft == 'y' or draft == 'Y':
            is_draft = 'true'
        else:
            is_draft = 'false'

        dt_now = datetime.datetime.now()
        header = """---
title: "{0}"
description: "{1}"
image: "{2}"
date: {3}
tags: [{4}]
archives: ["{5}"]
draft: {6}
---
        """.format(title, desc, img, dt_now.strftime('%Y-%m-%dT%H:%M:%S+09:00'),
                   tags_str, dt_now.strftime('%Y-%m'), is_draft)

        # ファイル作成
        os.makedirs(dir_path, exist_ok=True)
        with open(dir_path + '/index.md', mode='w') as f:
            f.write(header)
    else:
        print('Edit page.')
    # 規定のエディタを取得して編集
    EDITOR = os.environ.get('EDITOR', 'vim')
    run([EDITOR, dir_path + '/index.md'])
    run(['open', dir_path])
    print('Finished.')
except KeyboardInterrupt:
    print('\nStopped(Keyboard Interrupt).')
```

[リンク](https://github.com/tbsmcd/tbsmcd.github.io/blob/e4be2b4a8f72f87e9ca66c4727452002e77908eb/create.py)  
  
これをコマンドラインで実行すると、以下のように対話的にメタ情報を求められ、結果は index.md に反映される。あとはエディタが index.md を開いてくれるので編集するだけ。おまけとして画像を配置するための `open` コマンドも実行しているのでストレスフリーが実現する（最高だね）。
  
```
➤ ./create.py
Directory name: tired-from-hugo-new
tired-from-hugo-new
Create new page.
Title: hugo new で記事を新規作成するのは少しダルいから自作スクリプトで編集する
Description: hugo new で記事を新規作成するのは少しダルいので Pyhton で対話的に記事を作成できるスクリプトを書いて使用している。
OGP image: program.png
Tags(comma separated): hugo, Python
Draft(Y/n): n
```


## まとめ

hugo はよく出来ている。しかしよく出来ているソフトウェアも、自分に合わない部分がある。それならば適当なスクリプトで修正していけば良い。もしくは Pull Request を送ろう。幸い hugo は markdown という比較的単純なテキストファイルをベースに記事を作成する。テキストファイルを介して hugo と自作スクリプト間をやり取りするのは、 UNIX 的ともいえるのではないか。そういう気持ちで各自やっていけばアウトプットが楽になるのではないかと思う。
