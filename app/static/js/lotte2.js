document.getElementById("home-btn").addEventListener("click", function () {
  window.location.href = "lotte";
});

document.addEventListener("DOMContentLoaded", function () {
  var doc = document.documentElement;
  var FullPage = document.getElementById("logo-image");

  // 전체화면 설정
  function openFullScreenMode() {
    if (doc.requestFullscreen) doc.requestFullscreen();
    else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
    else if (doc.mozRequestFullScreen) doc.mozRequestFullScreen();
    else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
    $(".fullscreen").hide();
    $(".close-fullscreen").show();
  }

  function closeFullScreenMode() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    $(".fullscreen").show();
    $(".close-fullscreen").hide();
  }

  FullPage.addEventListener("click", function () {
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement
    ) {
      openFullScreenMode();
    } else {
      closeFullScreenMode();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var mapButton = document.querySelector(".map-button");
  var imgModal = document.querySelector(".img-modal");
  var closeButton = document.querySelector(".close-btn");
  var buttonContainer = document.querySelector(".button-container");
  var modalImage = document.getElementById("modal-image");

  function setDefaultFloor() {
    var defaultButton = buttonContainer.querySelector("button[floor='1']");
    handleButtonClick({ target: defaultButton });
  }

  mapButton.addEventListener("click", function () {
    imgModal.style.display = "block";
    setDefaultFloor();
  });

  closeButton.addEventListener("click", function () {
    imgModal.style.display = "none";
  });

  imgModal.addEventListener("click", function (event) {
    if (event.target === imgModal) {
      imgModal.style.display = "none";
    }
  });

  function handleButtonClick(event) {
    var buttons = buttonContainer.querySelectorAll("button");
    buttons.forEach(function (button) {
      button.classList.remove("active");
    });
    event.target.classList.add("active");

    var floor = event.target.getAttribute("floor");
    modalImage.src = "/static/img/lotte_map" + floor + ".png";
  }

  for (var i = 1; i <= 2; i++) {
    var button = document.createElement("button");
    button.textContent = i + "F";
    button.setAttribute("floor", i);
    button.addEventListener("click", handleButtonClick);
    buttonContainer.appendChild(button);
  }
});

/*------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  var micButton = document.querySelector(".mic-button");
  var micIcon = micButton.querySelector("i");
  var micButtonLoader = micButton.querySelector(".mic-button-loader");
  var waveContainer = document.querySelector(".waveContainer");
  const modalImage = document.getElementById("store-modal-image");
  const imgModal = document.querySelector(".store-modal");
  const cancelButton = document.querySelector(".store-modal .cancel-btn");
  const GuideButton = document.querySelector(".store-modal .start-guide-btn");
  const moveModal = document.querySelector(".movemodal");
  const moveModalImage = document.getElementById("move-modal-image");

  function hideWaveContainer() {
    waveContainer.style.display = "none";
  }

  function showWaveContainer() {
    waveContainer.style.display = "flex";
  }

  hideWaveContainer();

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "ko-KR";
  let recognitionActive = false;
  let isVoicePlayed = false;

  micButton.addEventListener("click", function () {
    micIcon.classList.toggle("m-active");
    micButtonLoader.classList.toggle("active");

    if (micIcon.classList.contains("m-active")) {
      showWaveContainer();
    } else {
      hideWaveContainer();
    }

    if (!recognitionActive) {
      recognition.start();
      recognitionActive = true;
    } else {
      recognition.stop();
      recognitionActive = false;
    }
  });

  recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    console.log("인식된 단어:", transcript);

    checkStoreMatch(transcript);

    hideWaveContainer();
    recognition.stop();
    micIcon.classList.remove("m-active");
    micButtonLoader.classList.remove("active");
    recognitionActive = false;
  };

  recognition.onerror = function (event) {
    console.error("음성 인식 오류:", event.error);
  };

  function checkStoreMatch(transcript) {
    const storeDataList =
      JSON.parse(localStorage.getItem("storeNamesForLotte2")) || [];

    const matchedStoreData = storeDataList.find((storeData) =>
      transcript.includes(storeData.storeName)
    );

    console.log(matchedStoreData);

    if (matchedStoreData) {
      const {
        store_floor,
        storeName,
        store_x,
        store_y,
        click_num,
        upment,
        downment,
      } = matchedStoreData;

      if (modalImage && imgModal) {
        if (store_floor === "2F") {
          modalImage.src = `/static/img/lotte_map2.png`;
        } else {
          modalImage.src = `/static/img/lotte_map1.png`;
        }

        imgModal.style.display = "block";

        const existingMarker = document.querySelector(".store-marker");
        if (existingMarker) {
          existingMarker.remove();
        }

        const marker = document.createElement("div");
        const additionalMarker = document.createElement("div");

        marker.classList.add("store-marker");
        marker.style.position = "absolute";
        marker.style.width = "30px";
        marker.style.height = "30px";
        marker.style.backgroundImage = "url(/static/img/marker.png)";
        marker.style.backgroundSize = "contain";
        marker.style.backgroundRepeat = "no-repeat";
        marker.style.left = `${store_x}px`;
        marker.style.top = `${store_y}px`;
        marker.style.transform = "translate(-50%, -100%)";
        marker.style.pointerEvents = "none";

        imgModal.appendChild(marker);

        if (storeName === "화장실") {
          additionalMarker.classList.add("store-marker");
          additionalMarker.style.position = "absolute";
          additionalMarker.style.width = "30px";
          additionalMarker.style.height = "30px";
          additionalMarker.style.backgroundImage =
            "url(/static/img/marker.png)";
          additionalMarker.style.backgroundSize = "contain";
          additionalMarker.style.backgroundRepeat = "no-repeat";
          additionalMarker.style.left = "880px";
          additionalMarker.style.top = "122px";
          additionalMarker.style.transform = "translate(-50%, -100%)";
          additionalMarker.style.pointerEvents = "none";

          imgModal.appendChild(additionalMarker);
        }

        let utterance;

        if (storeName === "화장실") {
          utterance = new SpeechSynthesisUtterance(
            `화장실은 이 위치에 있습니다. 안내를 시작할까요?`
          );
        } else {
          utterance = new SpeechSynthesisUtterance(
            `${storeName} 매장은 이 위치에 있습니다. 안내를 시작할까요?`
          );
        }

        if (store_floor === "2F") {
          utterance.text = `${storeName} 매장은 2층에 있습니다.`;
        }

        speechSynthesis.speak(utterance);

        let previousClickNum = null;
        let lastGoingValue = null;

        function updateClickNumInDB(clickNum) {
          if (previousClickNum === clickNum) {
            return;
          }

          previousClickNum = clickNum;

          fetch("/update_click_num", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ click_num: clickNum }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("DB 업데이트 성공:", data);
              checkGoingStatus();
            })
            .catch((error) => {
              console.error("데이터 가져오기 실패:", error);
            });
        }

        function checkGoingStatus() {
          const interval = setInterval(() => {
            fetch("/get_going_status", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(
                  "현재 going 값:",
                  data.going,
                  "direction:",
                  data.direction
                );

                let completionMessage;
                speechSynthesis.cancel();

                if (data.going === 0) {
                  moveModal.style.display = "none";

                  if (lastGoingValue !== 0) {
                    lastGoingValue = data.going;
                    //direction == 0 (상행), direction == 1 (하행)
                    if (data.direction === 0 && upment) {
                      completionMessage = new SpeechSynthesisUtterance(upment);
                      console.log("멘트:", upment);
                    } else if (data.direction === 1 && downment) {
                      completionMessage = new SpeechSynthesisUtterance(
                        downment
                      );
                      console.log("멘트:", downment);
                    }

                    if (completionMessage) {
                      speechSynthesis.speak(completionMessage);
                    } else {
                      console.error("음성 메시지가 설정되지 않았습니다.");
                    }

                    clearInterval(interval);
                  }
                } else {
                  lastGoingValue = data.going;
                }
              })
              .catch((error) => {
                console.error("데이터 가져오기 실패:", error);
                clearInterval(interval);
              });
          }, 1000);
        }
        GuideButton.addEventListener("click", function () {
          imgModal.style.display = "none";
          marker.remove();
          additionalMarker.remove();

          const clickNum = click_num;

          updateClickNumInDB(clickNum);

          moveModalImage.src = "/static/img/movemodal.png";
          moveModal.style.display = "block";
        });

        cancelButton.addEventListener("click", function () {
          imgModal.style.display = "none";
          marker.remove();
          additionalMarker.remove();

          hideWaveContainer();
          recognition.stop();
          micIcon.classList.remove("m-active");
          micButtonLoader.classList.remove("active");
          recognitionActive = false;
        });

        // let audioFilePath;
        // switch(storeName) {
        //     case '대화':
        //         audioFilePath = '/static/audio/robot2.wav';
        //         subtitleText = '네! 고객님과 대화가 가능합니다. 어떤 것이 궁금하신가요?';
        //         break;
        //     case '어떤':
        //         audioFilePath = '/static/audio/robot3.wav';
        //         subtitleText = '저는 고객님들께 매장 안내를 돕는 일을 합니다. 무엇을 도와드릴까요? 말씀해주세요.';
        //         break;
        //     case 'bakery':
        //         audioFilePath = '/static/audio/robot4.wav';
        //         subtitleText = 'MaWang Pie is the most popular at this bakery. Try it.';
        //         break;
        //     case '톡톡히':
        //         audioFilePath = '/static/audio/robot5.wav';
        //         subtitleText = '고객님, 찾고 계시는 마왕파이가 여기 있습니다.';
        //         break;
        //     case '느낌입니다':
        //         audioFilePath = '/static/audio/robot6.wav';
        //         subtitleText = '고객님 더 필요한 것은 없나요?'
        //         break;
        //     case '고마워요':
        //         audioFilePath = '/static/audio/robot7.wav';
        //         subtitleText = '그럼 좋은하루 되세요, 고객님. 저는 다른 곳으로 먼저 이동하겠습니다.';
        //         break;
        //     default:
        //         audioFilePath = null;
        // }

        // if (audioFilePath) {
        //     const audio = new Audio(audioFilePath);
        //     audio.play();
        //     console.log(`매장명: ${storeName}, 층수: ${store_floor}, x_loc: ${store_x}, y_loc: ${store_y}`);

        //     imgModal.style.display = 'none';

        //     const overlayElement = document.createElement('div');
        //     overlayElement.style.position = 'fixed';
        //     overlayElement.style.top = '0';
        //     overlayElement.style.left = '0';
        //     overlayElement.style.width = '100%';
        //     overlayElement.style.height = '100%';
        //     overlayElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        //     overlayElement.style.zIndex = '999';

        //     const subtitleElement = document.createElement('div');
        //     subtitleElement.classList.add('subtitle');
        //     subtitleElement.style.position = 'absolute';
        //     subtitleElement.style.width = '1000px'
        //     subtitleElement.style.bottom = '30%';
        //     subtitleElement.style.left = '50%';
        //     subtitleElement.style.transform = 'translateX(-50%)';
        //     subtitleElement.style.padding = '10px';
        //     subtitleElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        //     subtitleElement.style.color = '#fff';
        //     subtitleElement.style.fontSize = '36px';
        //     subtitleElement.style.zIndex = '1000';
        //     subtitleElement.style.textAlign = 'center';
        //     subtitleElement.innerText = subtitleText;

        //     document.body.appendChild(overlayElement);
        //     document.body.appendChild(subtitleElement);

        //     setTimeout(() => {
        //         subtitleElement.remove();
        //         overlayElement.remove();
        //     }, 8000);

        // }
      } else {
        console.error("모달 이미지 또는 모달 요소를 찾을 수 없습니다.");
      }
    }
  }

  function playAudio(audioPath) {
    var audio = new Audio(audioPath);
    audio.play();
  }

  function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

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
        content: audioData,
      },
    };

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(requestData),
      contentType: "application/json",
      success: function (response) {
        console.log("음성 인식 결과:", response);
      },
      error: function (xhr, status, error) {
        console.error("오류 발생:", error);
      },
    });
  }
});

function hideWaveContainer() {
  var waveContainer = document.querySelector(".waveContainer");
  waveContainer.style.display = "none";
}

window.onload = function () {
  playWelcomeVoice();
};

function playWelcomeVoice() {
  if (typeof Audio === "undefined") {
    alert("이 브라우저는 오디오를 지원하지 않습니다.");
    return;
  }

  var welcomeAudio = new Audio("/static/audio/welcome.wav");
  welcomeAudio.play();
}

function stopWelcomeVoice() {
  if (typeof welcomeVoice !== "undefined" && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
}
