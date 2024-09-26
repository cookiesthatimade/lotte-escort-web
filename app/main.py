from flask import Flask, Response, request, render_template, jsonify
import pymysql
import time
import json
from pytz import timezone
import pytz
from logging.config import dictConfig
import logging.handlers  # 필요한 모듈을 가져옵니다.
import threading  # threading 모듈 추가
import requests

# my_settings.py 파일에서 설정 불러오기
from my_settings import DB_SETTINGS, SENSOR_DB1_SETTINGS, SENSOR_DB2_SETTINGS, API_KEY


app = Flask(__name__)

# DB 연결에 대한 락
connection_lock = threading.Lock()


# DB 연결 설정
def get_connection():
    connection = pymysql.connect(host=DB_SETTINGS['host'],
                                 user=DB_SETTINGS['user'],
                                 password=DB_SETTINGS['password'],
                                 db=DB_SETTINGS['db'],
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection


@app.route('/lotte', methods=['GET', 'POST'])
def lotte():
    return render_template('lotte.html')


@app.route('/lotte1', methods=['GET', 'POST'])
def lotte1():
    return render_template('lotte1.html')


@app.route('/lotte2', methods=['GET', 'POST'])
def lotte2():
    return render_template('lotte2.html')


@app.route('/news', methods=['GET', 'POST'])
def news2():
    return render_template('news2.html')


############################################################################################
###### SSE#####
############################################################################################


@app.route('/sensing_data')
def sensing_data():
    def respond_to_client():

        while True:
            connection1 = pymysql.connect(host=SENSOR_DB1_SETTINGS['host'],
                                          user=SENSOR_DB1_SETTINGS['user'],
                                          password=SENSOR_DB1_SETTINGS['password'],
                                          db=SENSOR_DB1_SETTINGS['db'],
                                          cursorclass=pymysql.cursors.DictCursor)

            with connection1.cursor() as cursor:
                # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
                cursor.execute(
                    "SELECT * FROM `sensor`.`env_data` ORDER BY `date` DESC LIMIT 1;")
                latest_data = cursor.fetchone()  # 최신 데이터 가져오기

                # UTC로부터 대한민국 시간대로 변환
                korea_time = latest_data['date']

                # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
                _data = json.dumps({'Date': korea_time.strftime("%Y-%m-%d %H:%M:%S"), 'temperature': latest_data['temperature'], 'humidity': latest_data['humidity'],
                                    'co2': latest_data['co2'], 'lux': latest_data['lux'], 'voc': latest_data['voc']})

                yield f"id: 1\ndata: {_data}\nevent: online\n\n"
                time.sleep(5)  # 5초로 설정

    return Response(respond_to_client(), mimetype='text/event-stream')


@app.route('/sensing_data2')
def sensing_data2():
    def respond_to_client():

        while True:
            connection2 = pymysql.connect(host=SENSOR_DB2_SETTINGS['host'],
                                          user=SENSOR_DB2_SETTINGS['user'],
                                          password=SENSOR_DB2_SETTINGS['password'],
                                          db=SENSOR_DB2_SETTINGS['db'],
                                          cursorclass=pymysql.cursors.DictCursor)

            with connection2.cursor() as cursor:
                # 쿼리 실행하여 가장 최신의 데이터 하나 가져오기
                cursor.execute(
                    "SELECT * FROM `sensor2`.`env_data` ORDER BY `date` DESC LIMIT 1;")
                latest_data = cursor.fetchone()  # 최신 데이터 가져오기

                # UTC로부터 대한민국 시간대로 변환
                korea_time = latest_data['date']

                # 데이터베이스에서 가져온 컬럼명을 기준으로 Dictionary 생성
                _data = json.dumps({'Date': korea_time.strftime("%Y-%m-%d %H:%M:%S"), 'temperature': latest_data['temperature'], 'humidity': latest_data['humidity'],
                                    'co2': latest_data['co2'], 'lux': latest_data['lux'], 'voc': latest_data['voc']})

                yield f"id: 1\ndata: {_data}\nevent: online\n\n"
                time.sleep(5)  # 5초로 설정

    return Response(respond_to_client(), mimetype='text/event-stream')


@app.route('/transcribe', methods=['POST'])
def transcribe():
    data = request.json
    audio_content = data.get('audioContent')

    request_data = {
        "config": {
            "encoding": "LINEAR16",
            "sampleRateHertz": 16000,
            "languageCode": "ko-KR"
        },
        "audio": {
            "content": audio_content
        }
    }

    # Google Speech-to-Text API에 요청
    url = f'https://speech.googleapis.com/v1/speech:recognize?key={API_KEY}'
    response = requests.post(url, json=request_data)

    # 응답 반환
    return jsonify(response.json())


if __name__ == '__main__':
    # 배포 시에 debug=False, host='0.0.0.0', port=80
    app.run(debug=True)


# qunicorn 실행 코드(window) : waitress-serve --listen=0.0.0.0:5000 main:app
# qunicorn 실행 코드(mac) : gunicorn --bind 0.0.0.0:5000 main:app
