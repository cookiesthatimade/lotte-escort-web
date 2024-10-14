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
import pandas as pd

# my_settings.py 파일에서 설정 불러오기
from my_settings import API_KEY


app = Flask(__name__)

# DB 연결에 대한 락
connection_lock = threading.Lock()


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
###### 음성인식 #####
############################################################################################


# CSV 파일 경로
file_path = '/Users/factorysunny/Downloads/lotte_escort_with_pron.csv'

# CSV 데이터 읽기
df = pd.read_csv(file_path, encoding="cp949")


@app.route('/check_location')
def check_location():
    location_name = request.args.get('name')
    if location_name in df['pron'].values:
        row = df[df['pron'] == location_name].iloc[0]
        message = f"{row['location']}으로 안내합니다."
    else:
        message = "해당 장소를 찾을 수 없습니다."

    response_data = json.dumps({"message": message}, ensure_ascii=False)
    return Response(response_data, mimetype='application/json')


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
