document.getElementById("home-btn").addEventListener("click", function() {
    window.location.href = "lotte";
});


document.addEventListener("DOMContentLoaded", function () {
    var mapButton = document.querySelector(".map-button");
    var imgModal = document.querySelector(".img-modal");
    var closeButton = document.querySelector(".close-btn");
    var buttonContainer = document.querySelector(".button-container");
    var modalImage = document.getElementById("modal-image");

    // Function to set default state to 1F
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

    // Create buttons for 1F and 2F
    for (var i = 1; i <= 2; i++) {
        var button = document.createElement("button");
        button.textContent = i + "F";
        button.setAttribute("floor", i);
        button.addEventListener("click", handleButtonClick);
        buttonContainer.appendChild(button);
    }
});


/*------------------------------------------------------------*/

var audioPaths = {
    '캉골': '/static/audio1/1.wav',
    '나이키': ['/static/audio1/2.wav', ['Nike', '나이키']],
    '뉴발란스': ['/static/audio1/3.wav', ['뉴발란스', '뉴발란쓰']],
    '게스': ['/static/audio1/4.wav', ['게스', '개스', '개쓰']],
    '코닥': '/static/audio1/19.wav',
    '캘빈클라인': ['/static/audio1/20.wav', ['캘빈클라인', '클라인']],
    '미샤': '/static/audio1/21.wav',
    '쉬즈미스': ['/static/audio1/22.wav', ['쉬즈미스', '미스', '미쓰']],
    '베비에르': '/static/audio1/23.wav'
};

function playAudioForWord(transcript) {
    for (var word in audioPaths) {
        var value = audioPaths[word];

        if (Array.isArray(value)) {
            var wavPath = value[0];
            var synonyms = value[1];
            
            if (synonyms.some(synonym => transcript.includes(synonym))) {
                var audio = new Audio(wavPath);
                audio.play();
                return;
            }
        } else {
            if (transcript.includes(word)) {
                var audio = new Audio(value);
                audio.play();
                return;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var micButton = document.querySelector(".mic-button");
    var micIcon = micButton.querySelector("i");
    var micButtonLoader = micButton.querySelector(".mic-button-loader");
    var waveContainer = document.querySelector(".waveContainer");

    function hideWaveContainer() {
        waveContainer.style.display = "none";
    }

    function showWaveContainer() {
        waveContainer.style.display = "flex";
    }

    hideWaveContainer();

    const recognition = new webkitSpeechRecognition(); 
    recognition.continuous = true; 
    recognition.lang = 'ko-KR'; 
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

        playAudioForWord(transcript);

        hideWaveContainer();
        recognition.stop();
        micIcon.classList.remove("m-active");
        micButtonLoader.classList.remove("active");
        recognitionActive = false;
    };

    recognition.onerror = function (event) {
        console.error('음성 인식 오류:', event.error);
    };

    function playAudio(audioPath) {
        var audio = new Audio(audioPath);
        audio.play();
    }

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    function _0x4d78(){const _0x5200d7=['1446852ugkSWc','128835gkFPAV','AIzaSyDdhp_dq84sgH9ZdZzbDDYBwpakPrx_jUc','11EzxkRg','4119216lsuoBU','323880lqWUVr','63652aujnvg','105ojHIQQ','20gKFXEX','91NAYfmP','12RWTgQu','1997090jCILTD','388336WrfrbO'];_0x4d78=function(){return _0x5200d7;};return _0x4d78();}const _0x1b188c=_0x497d;function _0x497d(_0x1bfc8f,_0x334a50){const _0x4d783b=_0x4d78();return _0x497d=function(_0x497dc6,_0x14c96c){_0x497dc6=_0x497dc6-0x13d;let _0x8ad6bc=_0x4d783b[_0x497dc6];return _0x8ad6bc;},_0x497d(_0x1bfc8f,_0x334a50);}(function(_0x3dd67e,_0x4a5485){const _0x36e16a=_0x497d,_0x4c7c5b=_0x3dd67e();while(!![]){try{const _0x1cddf3=parseInt(_0x36e16a(0x140))/0x1+parseInt(_0x36e16a(0x141))/0x2+parseInt(_0x36e16a(0x148))/0x3*(-parseInt(_0x36e16a(0x147))/0x4)+-parseInt(_0x36e16a(0x13f))/0x5*(-parseInt(_0x36e16a(0x13e))/0x6)+parseInt(_0x36e16a(0x13d))/0x7*(-parseInt(_0x36e16a(0x146))/0x8)+parseInt(_0x36e16a(0x142))/0x9*(-parseInt(_0x36e16a(0x149))/0xa)+-parseInt(_0x36e16a(0x144))/0xb*(parseInt(_0x36e16a(0x145))/0xc);if(_0x1cddf3===_0x4a5485)break;else _0x4c7c5b['push'](_0x4c7c5b['shift']());}catch(_0x30e0fa){_0x4c7c5b['push'](_0x4c7c5b['shift']());}}}(_0x4d78,0x6f310));const apiKey=_0x1b188c(0x143);
    
    function transcribeAudio(audioContent) {
        const audioData = utf8_to_b64(audioContent);

        const url = 'https://speech.googleapis.com/v1/speech:recognize?key=' + apiKey;
        const requestData = {
            "config": {
                "encoding": "LINEAR16",
                "sampleRateHertz": 16000,
                "languageCode": "ko-KR"
            },
            "audio": {
                "content": audioData
            }
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(requestData),
            contentType: 'application/json',
            success: function (response) {
                console.log('음성 인식 결과:', response);
            },
            error: function (xhr, status, error) {
                console.error('오류 발생:', error);
            }
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