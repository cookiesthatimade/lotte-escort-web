# 💁🏻‍♀️ flask-lotte-guide-web 💁🏻‍♀️



> 롯데아울렛의 매장 안내 웹



➡️ **광주 MBC 촬영 영상(18분15초~)** (이미지를 클릭하면 YouTube로 이동)
[![Image](https://github.com/user-attachments/assets/5a59dfba-c38b-4766-b3b4-550631257db7)](https://youtu.be/Nzmto5IQo74)
<img src="https://github.com/user-attachments/assets/c4578dec-2a21-42bd-a9ac-a3e243e6688c" width="500" />
<img src="https://github.com/user-attachments/assets/dee6326a-b9ae-44bc-9300-e5fe9b2287bc" width="500" />
---

## 📖 프로젝트 소개

**flask-lotte-guide-web**은 롯데아울렛 내 로봇(sunnybot)에 탑재된 웹 서비스로, 사용자가 아울렛 내 매장의 위치를 안내받을 수 있도록 설계되었습니다.

### 🔹 주요 기능

1. **매장 찾기**
   - 1층, 2층 매장 리스트 & 아울렛 지도 제공
2. **로봇 안내 시스템**
   - 로봇 연동을 통해 매장 안내
3. **음성인식을 통한 매장 검색**
   - 음성인식을 통해 매장 검색과 안내까지 가능
4. **광고 기능**
   - 로봇 후면 화면에 매장 광고 및 이벤트 노출
---

## 🛠 사용자 시나리오

<img src="https://github.com/user-attachments/assets/d649c07f-3e25-4171-ad2f-1a52f49e331f" width="500" />
<img src="https://github.com/user-attachments/assets/25cd143e-61a0-41f1-9fe2-96d18df5d8e4" width="800" />

---

## 🎥 데모

<p align="left">
    <img src="https://github.com/user-attachments/assets/4fd1b85b-e5f8-4577-80f3-c686fe3a54d5" width="500" />
    <img src="https://github.com/user-attachments/assets/0cde01ff-b762-487c-b5f3-e0fd9a4f5197" width="500" />
    <img src="https://github.com/user-attachments/assets/ad5fa8ad-9edf-4c86-95b8-a69928da4b3a" width="500" />
    <img src="https://github.com/user-attachments/assets/29e76ec6-35f5-45bf-b070-3dce09a0cdec" width="500" />
    <img src="https://github.com/user-attachments/assets/0050ea9d-2c1e-4ce2-bf99-d0da8da8126b" width="500" />
    <img src="https://github.com/user-attachments/assets/83914e8e-7774-4c3e-93a7-0e7677451880" width="500" />
</p>

---

## ⭐ 핵심 기술
### 🗄 데이터베이스 & 실시간 데이터 처리

- **MySQL** (pymysql 사용)
  - 테이블을 조회하여 로봇 이동 상태 관리
- **Thread Lock** (threading.Lock) → 다중 요청 처리 시 DB 연결 동기화 보장
- **실시간데이터 제공** → get_going_status 엔드포인트를 통해 로봇의 이동 상태를 실시간으로 반환

### 🎤 음성 인식 (STT) API 연동

- Google Speech-to-Text API 사용

### 🌍 웹 접근성 및 반응형 디자인 적용

- 다양한 디바이스에서 최적화된 UI 제공
- 버튼 클릭, 음성 입력 등의 인터랙션 지원

---

## 💻 프로젝트 실행 방법

### 프로젝트 디렉터리 이동
```
cd app
```
### 가상 환경 생성
```
python3 -m venv env
```
### 가상 환경 활성화
```
source env/bin/activate
```
### 프로젝트 종속성 설치
```
pip install -r requirements.txt
```
### 서버 실행
```
python3 main.py
```
### ➡️ Go to localhost:5000

---

## 🔧 기술 스택

| **분류**            | **기술**                        |
| ----------------- | ----------------------------- |
| **언어**            | HTML, CSS, JavaScript, Python |
| **라이브러리 & 프레임워크** | Flask                         |
| **데이터베이스**        | MySQL                         |
| **배포 환경**         | AWS EC2, Docker               |
| **실행 환경**         | Gunicorn                      |

---

## 📁 프로젝트 구조

```markdown
src
├── app
│   ├── static
│   ├── templates
│   ├── main.py
│   └── my_settings.py (개별 작성 필요)
├── README.md
└── requirements.txt
```

---

## 👨‍💻 역할 및 기여

| 역할                 | 담당 업무                                                         |
| ------------------ | ------------------------------------------------------------- |
| **Frontend (Web)** | HTML, CSS, JavaScript (UI/UX 구현)                              |
| **Backend (Web)**  | Flask, MySQL, API 개발                                          |
| **DevOps**         | AWS EC2, Docker, Gunicorn 배포 및 환경 설정                          |
| **Etc**             | 데이터베이스 운영, 보안 설정 (SSL, CORS 등), Google STT API 활용, 모달 이미지 디자인, 광고 이미지 디자인 |

---

## 👨‍👩‍👧‍👦 Developer
*  **김성하** ([cookiesthatimade](https://github.com/cookiesthatimade))
*  **김성욱** ([seonguk0893](https://github.com/seonguk0893))
