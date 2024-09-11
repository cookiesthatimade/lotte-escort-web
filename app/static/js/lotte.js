document.addEventListener("DOMContentLoaded", function () {
  var mapButton = document.querySelector(".map-button");
  var imgModal = document.querySelector(".img-modal");
  var closeButton = document.querySelector(".close-btn");

  // 버튼 클릭 시 모달 열기
  mapButton.addEventListener("click", function () {
    imgModal.style.display = "block";
  });

  // 닫기 버튼 클릭 시 모달 닫기
  closeButton.addEventListener("click", function () {
    imgModal.style.display = "none";
  });

  // 모달 영역 외 클릭 시 모달 닫기
  imgModal.addEventListener("click", function (event) {
    if (event.target === imgModal) {
      imgModal.style.display = "none";
    }
  });
});

/*------------------------------------------------------------*/
var imgContainer = document.getElementById("imgContainer");

// 이미지에 대한 텍스트 배열
var buttonTexts = [
  "캉골",
  "나이키",
  "뉴발란스",
  "게스",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "코닥",
  "캘빈클라인",
  "미샤",
  "쉬즈미스",
  "베비에르",
];

// MP3 파일에 대한 경로 배열
var audioPaths = [
  "/static/audio/1.wav",
  "/static/audio/2.wav",
  "/static/audio/3.wav",
  "/static/audio/4.wav",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "/static/audio/19.wav",
  "/static/audio/20.wav",
  "/static/audio/21.wav",
  "/static/audio/22.wav",
  "/static/audio/23.wav",
  // 나머지 MP3 파일 경로를 추가합니다.
];

// MP3 파일을 재생하는 함수
function playAudio(id) {
  // id에 해당하는 인덱스를 찾습니다.
  var index = parseInt(id.replace("button", "")) - 1;
  if (index >= 0 && index < audioPaths.length) {
    var audio = new Audio(audioPaths[index]); // 해당 인덱스에 해당하는 MP3 파일 경로로 Audio 객체를 생성합니다.
    audio.play(); // MP3 파일을 재생합니다.
  } else {
    console.error("Invalid audio index");
  }
}

// 이미지 버튼을 생성하는 함수
function createImageButton(id, value) {
  var imgButton = document.createElement("div");
  imgButton.id = id;
  imgButton.className = "image-button";
  imgButton.style.backgroundImage = "url('/static/img/" + value + ".png')";
  imgButton.style.backgroundSize = "cover";
  imgButton.onclick = function () {
    openModal(value);
    playAudio(id); // 이미지 버튼 클릭 시 MP3 파일 재생
  };

  var textOverlay = document.createElement("div");
  textOverlay.className = "text-overlay";
  textOverlay.innerText = buttonTexts[value - 1];
  imgButton.appendChild(textOverlay);

  return imgButton;
}

// 1부터 4까지의 이미지 버튼 생성
for (var i = 1; i <= 4; i++) {
  var imageButton = createImageButton("button" + i, i);
  imgContainer.appendChild(imageButton);
}

// 19부터 22까지의 이미지 버튼 생성
for (var j = 19; j <= 23; j++) {
  var imageButton = createImageButton("button" + j, j);
  imgContainer.appendChild(imageButton);
}

var imagePaths = [
  "/static/img/001.png",
  "/static/img/002.png",
  "/static/img/003.png",
  "/static/img/004.png",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "/static/img/005.png",
  "/static/img/006.png",
  "/static/img/007.png",
  "/static/img/008.png",
  "/static/img/009.png",
  // 나머지 이미지 파일 경로들
];

function openModal(index) {
  var modalWrapper = document.querySelector(".modal-wrapper");
  var modalImage = document.getElementById("modalImage");
  var imagePath = imagePaths[index - 1];

  modalImage.src = imagePath;

  modalWrapper.classList.add("open");

  setTimeout(closeModal, 5000);
}

var imageButtons = document.getElementsByClassName("image-button");
var areaColorElements = document.getElementsByClassName("area-color");

// 초기에 모든 area-color 요소를 숨기기
for (var i = 0; i < areaColorElements.length; i++) {
  areaColorElements[i].style.opacity = "0";
  areaColorElements[i].style.transition = "opacity 1.5s ease";
}

// 이미지 버튼을 클릭하여 해당하는 area-color 요소를 토글하여 보이기/숨기기
for (var i = 0; i < imageButtons.length; i++) {
  imageButtons[i].addEventListener("click", function () {
    var index = Array.prototype.indexOf.call(imageButtons, this);
    // 클릭된 이미지 버튼에 대응하는 areaColorElements 요소가 존재하는지 확인
    if (index >= 0 && index < areaColorElements.length) {
      // 모든 areaColorElements 요소의 투명도를 초기화
      for (var j = 0; j < areaColorElements.length; j++) {
        areaColorElements[j].style.opacity = "0";
      }
      // 클릭된 이미지 버튼에 대응하는 areaColorElements 요소의 투명도를 설정
      areaColorElements[index].style.opacity = "1";
      openModal(value); // 모달 열기 함수 호출
    }
  });
}

var closeButton = document.querySelector(".btn-close");
closeButton.addEventListener("click", closeModal);

function closeModal() {
  var modalWrapper = document.querySelector(".modal-wrapper");
  modalWrapper.classList.remove("open");
}

/*----------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  var micButton = document.querySelector(".mic-button");
  var micIcon = micButton.querySelector("i");
  var micButtonLoader = micButton.querySelector(".mic-button-loader");
  var waveContainer = document.querySelector(".waveContainer");

  function hideWaveContainer() {
    waveContainer.style.display = "none";
  }

  // waveContainer를 보이는 함수
  function showWaveContainer() {
    waveContainer.style.display = "flex";
  }

  // 초기에 waveContainer를 숨김
  hideWaveContainer();

  const recognition = new webkitSpeechRecognition(); // 음성 인식 객체 생성
  recognition.continuous = true; // 연속적인 음성 입력을 허용
  recognition.lang = "ko-KR"; // 인식할 언어 설정 (한국어)
  let recognitionActive = false; // 음성 인식 활성화 여부를 추적하기 위한 변수
  let isVoicePlayed = false; // 음성 안내 메시지 재생 여부를 추적하기 위한 변수

  // 마이크 버튼 클릭 시 음성 인식 시작 또는 종료
  micButton.addEventListener("click", function () {
    micIcon.classList.toggle("m-active");
    micButtonLoader.classList.toggle("active"); // mic-button-loader에 active 클래스를 토글합니다.

    if (micIcon.classList.contains("m-active")) {
      showWaveContainer(); // 음성 인식이 활성화되면 waveContainer를 보이도록 설정
    } else {
      hideWaveContainer(); // 음성 인식이 비활성화되면 waveContainer를 숨기도록 설정
    }

    // 음성 인식 활성화 상태에 따라 시작 또는 종료
    if (!recognitionActive) {
      recognition.start();
      recognitionActive = true;
    } else {
      recognition.stop();
      recognitionActive = false;
    }
  });

  recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1]; // 가장 최근의 결과 가져오기
    const transcript = result[0].transcript; // 인식된 텍스트 가져오기

    // 특정 단어가 인식되면 해당 버튼을 클릭하고 음성 인식 종료
    if (transcript.includes("캉골")) {
      setTimeout(function () {
        document.getElementById("button1").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (transcript.includes("나이키")) {
      setTimeout(function () {
        document.getElementById("button2").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (
      transcript.includes("뉴발란스") ||
      transcript.includes("뉴발란쓰")
    ) {
      setTimeout(function () {
        document.getElementById("button3").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (
      transcript.includes("게스") ||
      transcript.includes("개스") ||
      transcript.includes("개쓰")
    ) {
      setTimeout(function () {
        document.getElementById("button4").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (transcript.includes("코닥")) {
      setTimeout(function () {
        document.getElementById("button19").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (
      transcript.includes("캘빈클라인") ||
      transcript.includes("클라인")
    ) {
      setTimeout(function () {
        document.getElementById("button20").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (transcript.includes("미샤")) {
      setTimeout(function () {
        document.getElementById("button21").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (
      transcript.includes("쉬즈미스") ||
      transcript.includes("미스") ||
      transcript.includes("미쓰")
    ) {
      setTimeout(function () {
        document.getElementById("button22").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    } else if (transcript.includes("베비에르")) {
      setTimeout(function () {
        document.getElementById("button23").click();
        isVoicePlayed = true;
        recognition.stop();
      }, 1000);
    }

    transcribeAudio(result[0].transcript);

    hideWaveContainer();
    recognition.stop();
    micIcon.classList.remove("m-active");
    micButtonLoader.classList.remove("active");
    recognitionActive = false;
  };

  recognition.onerror = function (event) {
    console.error("음성 인식 오류:", event.error);
  };

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  //API_KEY값 난독화 코드
  function _0x4d78() {
    const _0x5200d7 = [
      "1446852ugkSWc",
      "128835gkFPAV",
      "AIzaSyDdhp_dq84sgH9ZdZzbDDYBwpakPrx_jUc",
      "11EzxkRg",
      "4119216lsuoBU",
      "323880lqWUVr",
      "63652aujnvg",
      "105ojHIQQ",
      "20gKFXEX",
      "91NAYfmP",
      "12RWTgQu",
      "1997090jCILTD",
      "388336WrfrbO",
    ];
    _0x4d78 = function () {
      return _0x5200d7;
    };
    return _0x4d78();
  }
  const _0x1b188c = _0x497d;
  function _0x497d(_0x1bfc8f, _0x334a50) {
    const _0x4d783b = _0x4d78();
    return (
      (_0x497d = function (_0x497dc6, _0x14c96c) {
        _0x497dc6 = _0x497dc6 - 0x13d;
        let _0x8ad6bc = _0x4d783b[_0x497dc6];
        return _0x8ad6bc;
      }),
      _0x497d(_0x1bfc8f, _0x334a50)
    );
  }
  (function (_0x3dd67e, _0x4a5485) {
    const _0x36e16a = _0x497d,
      _0x4c7c5b = _0x3dd67e();
    while (!![]) {
      try {
        const _0x1cddf3 =
          parseInt(_0x36e16a(0x140)) / 0x1 +
          parseInt(_0x36e16a(0x141)) / 0x2 +
          (parseInt(_0x36e16a(0x148)) / 0x3) *
            (-parseInt(_0x36e16a(0x147)) / 0x4) +
          (-parseInt(_0x36e16a(0x13f)) / 0x5) *
            (-parseInt(_0x36e16a(0x13e)) / 0x6) +
          (parseInt(_0x36e16a(0x13d)) / 0x7) *
            (-parseInt(_0x36e16a(0x146)) / 0x8) +
          (parseInt(_0x36e16a(0x142)) / 0x9) *
            (-parseInt(_0x36e16a(0x149)) / 0xa) +
          (-parseInt(_0x36e16a(0x144)) / 0xb) *
            (parseInt(_0x36e16a(0x145)) / 0xc);
        if (_0x1cddf3 === _0x4a5485) break;
        else _0x4c7c5b["push"](_0x4c7c5b["shift"]());
      } catch (_0x30e0fa) {
        _0x4c7c5b["push"](_0x4c7c5b["shift"]());
      }
    }
  })(_0x4d78, 0x6f310);
  const apiKey = _0x1b188c(0x143);

  function transcribeAudio(audioContent) {
    // UTF-8로 문자열을 Base64로 인코딩
    const audioData = utf8_to_b64(audioContent);

    const url =
      "https://speech.googleapis.com/v1/speech:recognize?key=" + apiKey;
    const requestData = {
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: 16000,
        languageCode: "ko-KR",
      },
      audio: {
        content: audioData, // Base64로 인코딩된 오디오 데이터 전달
      },
    };

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: function (response) {
        console.log("음성 인식 결과:", response);
        // 여기에 인식된 텍스트를 처리하는 코드를 추가할 수 있습니다.
      },
      error: function (xhr, status, error) {
        console.error("오류 발생:", error);
      },
    });
  }
});

// 이미지 버튼 클릭 처리
function clickButton(buttonId) {
  let button = document.getElementById(buttonId);
  if (button) {
    button.click();
    hideWaveContainer(); // waveContainer 숨기기
    let micButton = document.querySelector(".mic-button");
    let micIcon = micButton.querySelector("i");
    let micButtonLoader = micButton.querySelector(".mic-button-loader");
    micIcon.classList.remove("m-active");
    micButtonLoader.classList.remove("active");
    recognitionActive = false;
  }
}

// waveContainer를 숨기는 함수
function hideWaveContainer() {
  var waveContainer = document.querySelector(".waveContainer");
  waveContainer.style.display = "none";
}

// 문서 로드가 완료되면 버튼 클릭 이벤트 설정
document.querySelectorAll(".image-button").forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const buttonId = button.getAttribute("id").replace("button", ""); // 버튼의 ID에서 번호 추출
    clickButton(buttonId);
  });
});

window.onload = function () {
  // 페이지 로드 시에 실행될 코드
  playWelcomeVoice();
};

// 페이지 로드 시 실행할 함수
function playWelcomeVoice() {
  if (typeof Audio === "undefined") {
    alert("이 브라우저는 오디오를 지원하지 않습니다.");
    return;
  }

  var welcomeAudio = new Audio("/static/audio/welcome.wav");
  welcomeAudio.play();
}

// 페이지를 이동할 때 음성 재생을 멈추는 함수
function stopWelcomeVoice() {
  if (typeof welcomeVoice !== "undefined" && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
}
