document.getElementById("home-btn").addEventListener("click", function () {
  window.location.href = "lotte";
});

document.addEventListener("DOMContentLoaded", function () {
  const topbar = document.getElementById("topbar");
  const storeArea = document.getElementById("store-area");
  const buttons = document.querySelectorAll(".floor-selection button");
  const modalImage = document.getElementById("modal-image");
  const imgModal = document.querySelector(".img-modal");
  const closeButton = document.querySelector(".close-btn");

  const firstFloorMenu = {
    여성패션: {
      여성캐주얼: [
        "구호",
        "더레노마",
        "더아이잗컬렉션",
        "데코",
        "르니앤맥코이",
        "모에",
        "모조에스핀",
        "미샤",
        "보니스팍스",
        "비너스",
        "비비안",
        "쉬즈미스",
        "아이잗바바",
        "올앤선드리",
        "지코트",
        "코데즈컴바인 이너웨어",
        "크레송",
        "BCBG",
      ],
      여성정장: ["리본", "벨리시앙", "쁘렝땅"],
      영캐주얼: [
        "기비앤키이스",
        "나이스크랍",
        "더아이잗",
        "더틸버리",
        "듀엘",
        "라인",
        "리스트",
        "리안뉴욕",
        "발렌시아",
        "베네통",
        "보브",
        "숲",
        "시스티나",
        "시슬리",
        "써스데이아일랜드",
        "에코이스트",
        "엘하임",
        "온앤온",
        "올리브데올리브",
        "잇미샤",
        "제시뉴욕",
        "제이제이지고트",
        "주크",
        "케네스레이디",
        "톰보이",
      ],
    },
    영패션: {
      "SPA/Street": [
        "랩",
        "스테이시",
        "에이지도르",
        "에잇세컨즈",
        "코데즈컴바인",
      ],
      "진/유니캐주얼": [
        "뉴에라",
        "라이프워크",
        "마인드브릿지",
        "버커루",
        "벤셔먼",
        "지프",
        "캉골",
        "캘빈클라인진",
        "커버낫",
        "폴햄",
        "프로젝트엠",
        "GUESS",
      ],
    },
    "패션 액세서리": {
      구두: [
        "금강제화",
        "닥스 구두",
        "무크",
        "미소페",
        "미쉘바이탠디",
        "바바라",
        "소다",
        "에스콰이아구두",
        "제옥스",
      ],
      핸드백: ["닥스 핸드백", "쌤소나이트"],
      "시즌 액세서리": ["패션갤러리"],
    },
    편의시설: {
      서비스: [
        "모바일상품권 바코드 교환",
        "분실물 안내",
        "안내",
        "유모차 대여",
        "유아휴게실",
      ],
      "A/S": ["의류수선실"],
      Fun: ["펫모차 대여"],
    },

    "래져/스포츠": {
      아웃도어: ["코닥아웃도어"],
      "스포츠/애슬레져": ["나이키", "뉴발란스", "언더아머", "젝시믹스"],
    },
    해외패션: {
      해외잡화: ["럭셔리에비뉴"],
      해외의류: ["롯데TOPS"],
    },
    "F&B": {
      "베이커리/디저트": ["베비에르"],
    },
    행사장: {
      "행사장/팝업스토어": ["점행사장"],
    },
  };

  const secondFloorMenu = {
    "래져/스포츠": {
      골프: [
        "링스",
        "마스터바니",
        "벤제프",
        "볼빅",
        "아디다스골프",
        "와이드앵글",
        "캘러웨이",
        "테일러메이드",
        "팬텀",
        "핑",
        "AK골프",
      ],
      아웃도어: [
        "내셔널지오그래픽",
        "네파",
        "디스커버리",
        "루이까스텔",
        "블랙야크",
        "스노우피크",
        "아이더",
        "컬럼비아",
        "코오롱스포츠",
        "K2",
      ],
      "스포츠/애슬레져": [
        "다이나핏",
        "데상트",
        "디아도라",
        "르꼬끄",
        "배럴",
        "스케쳐스",
        "스파이더",
        "신디",
        "아디다스",
        "아레나",
        "엄브로",
        "에이비씨마트",
        "크록스",
        "푸마",
        "휠라",
      ],
    },
    남성패션: {
      남성정장: [
        "닥스 셔츠",
        "닥스 정장",
        "레노마 셔츠",
        "레노마 정장",
        "로가디스",
        "리버클래시",
        "리얼지오지아",
        "맨잇슈트",
        "바쏘 옴므",
        "본",
        "앤드지",
        "예작",
        "지이크",
        "카운테스마라 셔츠",
        "킨록앤더슨",
        "THE OPPOSITE SITE",
      ],
      남성캐주얼: ["올젠", "웰메이드", "페라로밀라노", "헤지스"],
    },
    "아동/유아": {
      아동: [
        "게스키즈",
        "내셔널지오그래픽키즈",
        "뉴발란스키즈",
        "닥스키즈",
        "블랙야크키즈",
        "스파오키즈",
        "아이러브제이",
        "에어워크주니어",
        "티파니",
        "폴햄키즈",
        "프렌치캣",
        "플레이키즈프로",
      ],
      "유아/용품": ["오가닉맘"],
    },
    "F&B": {
      식당가: [
        "도쿄이치바",
        "두끼",
        "본우리반상",
        "부엉이돈까스",
        "하이난",
        "1977갯골",
      ],
      "베이커리/디저트": ["아메리칸에그샌드", "앤티앤스프레즐"],
      카페: ["비엔토"],
    },
    편의시설: {
      금융: ["ATM"],
      "A/S": ["의류수선실"],
      기타: ["세븐일레븐", "헤어숍(이철헤어커커)"],
    },
  };

  function createMenu(items, floorMenu) {
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-bar");

    items.forEach((item) => {
      const menuItem = document.createElement("button");
      menuItem.textContent = item;

      menuItem.addEventListener("click", function () {
        if (typeof floorMenu[item] === "object") {
          showStores(floorMenu[item]);
        } else {
          showStores(floorMenu[item]);
        }

        const menubutton = document.querySelectorAll(".menu-bar button");
        menubutton.forEach((btn) => btn.classList.remove("active"));
        menuItem.classList.add("active");
      });

      menuDiv.appendChild(menuItem);
    });

    return menuDiv;
  }

  function showStores(stores) {
    storeArea.innerHTML = "";

    if (typeof stores === "object") {
      for (const subCategory in stores) {
        const subCategoryHeader = document.createElement("h3");
        subCategoryHeader.textContent = subCategory;
        subCategoryHeader.style.color = "#ffffff";
        subCategoryHeader.style.marginTop = "20px";
        subCategoryHeader.style.fontSize = "24px";
        storeArea.appendChild(subCategoryHeader);

        const storeListDiv = document.createElement("div");
        storeListDiv.style.display = "flex";
        storeListDiv.style.flexWrap = "wrap";
        storeListDiv.style.width = "900px";

        stores[subCategory].forEach((store) => {
          const storeButton = document.createElement("button");
          storeButton.textContent = store;
          storeButton.classList.add("store-button");
          storeButton.style.marginRight = "10px";
          storeButton.style.marginBottom = "10px";

          if (store === "모바일상품권 바코드 교환") {
            storeButton.style.fontSize = "16px";
          }

          storeButton.addEventListener("click", function () {
            modalImage.src = "/static/img/store_loc/" + store + ".png";
            imgModal.style.display = "block";

            const utterance = new SpeechSynthesisUtterance(
              `${store} 매장으로 안내합니다.`
            );
            speechSynthesis.speak(utterance);

            setTimeout(() => {
              imgModal.style.display = "none";
            }, 10000);
          });

          storeListDiv.appendChild(storeButton);
        });

        storeArea.appendChild(storeListDiv);
      }
    } else {
      const storeListDiv = document.createElement("div");
      storeListDiv.style.display = "flex";
      storeListDiv.style.flexWrap = "wrap";
      storeListDiv.style.width = "900px";

      stores.forEach((store) => {
        const storeButton = document.createElement("button");
        storeButton.textContent = store;
        storeButton.classList.add("store-button");
        storeButton.style.marginRight = "10px";
        storeButton.style.marginBottom = "10px";
        storeListDiv.appendChild(storeButton);
      });

      storeArea.appendChild(storeListDiv);

      const categorySeparator = document.createElement("div");
      categorySeparator.style.marginBottom = "30px";
      storeArea.appendChild(categorySeparator);
    }
  }

  document.getElementById("1f-btn").addEventListener("click", function () {
    topbar.innerHTML = "";
    topbar.appendChild(createMenu(Object.keys(firstFloorMenu), firstFloorMenu));
    showStores(firstFloorMenu["여성패션"]);
    const firstMenuButton = topbar.querySelector("button");
    firstMenuButton.classList.add("active");
  });

  document.getElementById("2f-btn").addEventListener("click", function () {
    topbar.innerHTML = "";
    topbar.appendChild(
      createMenu(Object.keys(secondFloorMenu), secondFloorMenu)
    ); // 2F 메뉴 생성
    showStores(secondFloorMenu["래져/스포츠"]);
    const secondMenuButton = topbar.querySelector("button");
    secondMenuButton.classList.add("active");
  });

  topbar.appendChild(createMenu(Object.keys(firstFloorMenu), firstFloorMenu));
  showStores(firstFloorMenu["여성패션"]);
  const firstMenuButton = topbar.querySelector("button");
  firstMenuButton.classList.add("active");

  // Set 1F button as active when the page loads
  document.getElementById("1f-btn").classList.add("active");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
