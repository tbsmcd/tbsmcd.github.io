#!/usr/bin/env python3
import os
import datetime
from subprocess import run


def input_dir_name():
    name = input('Directory name: ')
    path = os.path.dirname(__file__) + '/content/post/{0}'.format(name)
    if os.path.exists(path):
        print('This dir_name exists. Please use other name.')
        input_dir_name()
    else:
        return name


try:
    print('Create new page.')
    dir_name = input_dir_name()
    title = input('Title: ')
    desc = input('Description: ')
    img = input('OGP image: ')
    tags = input('Tags(comma separated): ')
    draft = input('Draft(Y/n): ')

    dir_path = os.path.dirname(__file__) + '/content/post/{0}'.format(dir_name)
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

    # 規定のエディタを取得して編集
    EDITOR = os.environ.get('EDITOR', 'vim')
    run([EDITOR, dir_path + '/index.md'])
    run(['open', dir_path])
except KeyboardInterrupt:
    print('\nStopped(Keyboard Interrupt).')
