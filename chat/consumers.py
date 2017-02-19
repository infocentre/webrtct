import json
from urllib import parse

from channels import Group
from channels.sessions import channel_session

@channel_session
def ws_add(message, room):
    # 코드를 추가해줌
    query = parse.parse_qs(message['query_string'])
    if 'username' not in query:
        return
    # 기존 코드
    Group('chat-%s' % room ).add(message.reply_channel)
    message.channel_session['room'] = room
    # /기존 코드
    message.channel_session['username'] = query['username'][0]




@channel_session
def ws_echo(message):
    print(message.channel_session['username'])
    if 'username' not in message.channel_session:
        return
    room = message.channel_session['room']
    print(room)
    Group('chat-%s' % room).send({
        'text':json.dumps({
            'message':message.content['text'],
            'username':message.channel_session['username']
        }, ensure_ascii=False),
    })
