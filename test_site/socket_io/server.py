# $ pip install eventlet
# $ pip install python-socketio
import sys
import json
import logging
import eventlet
import socketio

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger_handler = logging.StreamHandler(sys.stdout)
logger_formatter = logging.Formatter('[%(levelname)s]: %(message)s')
logger_handler.setFormatter(logger_formatter)
logger.addHandler(logger_handler)


sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

@sio.on('connect')
def connect(sid, environ):
    logger.info(f'connect {sid}')

# -----------
# Регистрация
# -----------
@sio.on('registration')
def message(sid, data):
    logger.info(f'message {data}, {type(data)}')

    # -----------------------
    # Отправляем назад ошибку
    # -----------------------
    #for k, v in data.items():
        #logger.info(f'{k} -> {v}')

    reg_info = {}
    keys = ('name', 'phone', 'sms', 'login', 'passwd')
    for key in keys:
        logger.info(f'{key} => {data.get(key)}')
        reg_info[key] = data.get(key)

    sio.emit('registration', reg_info, room=sid)

# ------------------
# Тестовое сообщение
# ------------------
@sio.on('my message')
def message(sid, data):
    logger.info(f'message {data}')

@sio.on('disconnect')
def disconnect(sid):
    logger.info(f'disconnect {sid}')

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
