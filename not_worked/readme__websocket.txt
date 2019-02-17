$ pip install channels
$ pip freeze>requirements_channels.txt

$ python test_site/manage.py startapp myws
Переносим myws на уровень с settings.py

INSTALLED_APPS = [
    ...
    'channels',
    'test_site.myws',
]
...
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'asgiref.inmemory.ChannelLayer',
        'ROUTING': 'myproj.routing.channel_routing',
    },
}

Рядом с settings.py создаём routing.py со следующим содержимым:

from channels.routing import route
channel_routing = [
    route('http.request', 'myapp.consumers.http_request_consumer')
]

myapp/consumers.py:

from django.http import HttpResponse
from channels.handler import AsgiHandler
def http_request_consumer(message):
    response = HttpResponse('Hello world! You asked for %s' % message.content['path'])
    for chunk in AsgiHandler.encode_response(response):
        message.reply_channel.send(chunk)

Запускаем приложение:
$ python manage.py runserver


При переходе на любую ссылку, видим перехваченный запрос. Обработчики сообщений (consumers) принимают первым аргументом message (channels.message.Message). Не вдаваясь в подробности, это структура, хранящая в себе всю необходимую информацию об отправителе, канале и данных, пришедших к нам.

    content: содержимое сообщения (в нашем случае информация о запросе) типа dict.
    reply_channel: структура типа Channel. Содержит в себе "адресат отправителя" по которому нужно доставить ответ, либо None, если таковой отсутствует.
