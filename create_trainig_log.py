#!/usr/local/bin/python3

import argparse
import re
import datetime
from subprocess import run
import os
import tempfile
import requests


# 正規表現で日付型を定義する
def type_date(arg_value, pat=re.compile(r"^[0-9]{4}-[0-9]{2}-[0-9]{2}$")):
    if not pat.match(arg_value):
        raise argparse.ArgumentTypeError("%r is not like '2020-06-25'." % arg_value)
    try:
        datetime.datetime.strptime(arg_value, '%Y-%m-%d')
        return arg_value
    except ValueError:
        # 日付として妥当な値ではない
        raise argparse.ArgumentTypeError("%r is not real date." % arg_value)


parser = argparse.ArgumentParser()
parser.add_argument('date', type=type_date, help='start date of target week.')
args = parser.parse_args()

start_date = datetime.datetime.strptime(args.date, '%Y-%m-%d')
dt_now = datetime.datetime.now()

dir_name = os.path.dirname(__file__) + '/content/post/training_note_' + args.date.replace('-', '')
print('Create source.\n{0}/index.md ...'.format(dir_name))

# ヘッダ
header = """
---
title: "{0} の週のトレーニングノート"
description: "{0} の週のトレーニングノート"
image: ""
date: {2}
tags: ["トレーニングノート", "ワークアウト", "プリズナートレーニング"]
archives: ["{1}"]
draft: false
---
""".format(args.date, dt_now.strftime('%Y-%m'), dt_now.strftime('%Y-%m-%dT%H:%M:%S+09:00'))

# 記録パートをつくる
log_part = """
## 記録

"""
# 1週刊分の記事を取得する
for i in range(7):
    target_date = start_date + datetime.timedelta(days=i)
    url = 'https://scrapbox.io/tbsmcd-memo/' + target_date.strftime('%Y-%m-%d')
    print('Trying get url ' + url)
    r = requests.get(url)
    if r.status_code == 200:
        print('Exists.')
        log_part = log_part + '1. [{0}]({1})\n'.format(target_date.strftime('%Y-%m-%d'), url)
    else:
        print('Not exists.')
        log_part = log_part + '1. {0}\n'.format(target_date.strftime('%Y-%m-%d'))

log_part = log_part + '  \n\n'

# 所感を編集する
tmp = tempfile.NamedTemporaryFile(suffix=".tmp", mode='w+t')
tmp.write('## 所感\n')
tmp.flush()
# 規定のエディタを取得
EDITOR = os.environ.get('EDITOR', 'vim')
run([EDITOR, tmp.name])
with open(tmp.name) as file:
    message_part = file.read()


source = header + log_part + message_part

os.makedirs(dir_name, exist_ok=True)
with open(dir_name + '/index.md', mode='w') as f:
    f.write(source)

print('Created.')
