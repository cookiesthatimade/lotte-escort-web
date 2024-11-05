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

document.getElementById("home-btn").addEventListener("click", function () {
  window.location.href = "lotte";
});

document.addEventListener("DOMContentLoaded", function () {
  const topbar = document.getElementById("topbar");
  const storeArea = document.getElementById("store-area");
  const buttons = document.querySelectorAll(".floor-selection button");
  const modalImage = document.getElementById("modal-image");
  const imgModal = document.querySelector(".img-modal");

  const csvFilePath = "/static/store_xy.csv";

  function loadCSV(filePath, callback) {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCSV(csvText);
        callback(data);
      })
      .catch((error) =>
        console.error("CSV 파일을 불러오는 도중 오류 발생:", error)
      );
  }

  let storeNamesForLotte2 = [];

  function parseCSV(csvText) {
    const lines = csvText.trim().split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");
      const obj = {};

      headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index]
          ? currentLine[index].trim()
          : "";
      });

      const store_floor = currentLine[0].trim();
      const storeName = currentLine[3].trim();
      const store_x = parseFloat(currentLine[4].trim());
      const store_y = parseFloat(currentLine[5].trim());
      const click_num = parseInt(currentLine[6].trim());
      const upment = currentLine[7].trim();
      const downment = currentLine[8].trim();

      storeNamesForLotte2.push({
        store_floor,
        storeName,
        store_x,
        store_y,
        click_num,
        upment,
        downment,
      });

      obj["층"] = store_floor;
      obj["매장명"] = storeName;
      obj["x_loc"] = store_x;
      obj["y_loc"] = store_y;
      obj["click_num"] = click_num;
      obj["up_ment"] = upment;
      obj["down_ment"] = downment;

      result.push(obj);
    }

    localStorage.setItem(
      "storeNamesForLotte2",
      JSON.stringify(storeNamesForLotte2)
    );

    return result;
  }

  function createMenu(categories, floorData) {
    const menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-bar");

    const uniqueCategories = [...new Set(categories)];

    uniqueCategories.forEach((category) => {
      const menuItem = document.createElement("button");
      menuItem.textContent = category;

      menuItem.addEventListener("click", function () {
        const subCategories = floorData.filter(
          (item) => item["카테고리"] === category
        );
        if (subCategories.length > 0) {
          showStores(subCategories);
        }

        const menubuttons = document.querySelectorAll(".menu-bar button");
        menubuttons.forEach((btn) => btn.classList.remove("active"));
        menuItem.classList.add("active");
      });

      menuDiv.appendChild(menuItem);
    });

    return menuDiv;
  }

  function showStores(stores) {
    storeArea.innerHTML = "";

    const uniqueSubCategories = new Set();
    const subCategoryStoreMap = {};

    stores.forEach((storeData) => {
      const subCategory = storeData["하위카테고리"];
      const store = storeData["매장명"];
      const storeFloor = storeData["층"];
      const store_x = storeData["x_loc"];
      const store_y = storeData["y_loc"];
      const click_num = storeData["click_num"];
      const upment = storeData["up_ment"];
      const downment = storeData["down_ment"];

      if (!uniqueSubCategories.has(subCategory)) {
        uniqueSubCategories.add(subCategory);
        subCategoryStoreMap[subCategory] = [];
      }

      subCategoryStoreMap[subCategory].push({
        storeName: store,
        storeFloor: storeFloor,
        store_x: store_x,
        store_y: store_y,
        click_num: click_num,
        upment: upment,
        downment: downment,
      });
    });

    uniqueSubCategories.forEach((subCategory) => {
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

      subCategoryStoreMap[subCategory].forEach((storeData) => {
        const storeButton = document.createElement("button");
        const cancelButton = document.querySelector(".img-modal .cancel-btn");
        const GuideButton = document.querySelector(
          ".img-modal .start-guide-btn"
        );
        const moveModal = document.querySelector(".movemodal");
        const moveModalImage = document.getElementById("move-modal-image");

        storeButton.textContent = storeData.storeName;
        storeButton.classList.add("store-button");
        storeButton.style.marginRight = "10px";
        storeButton.style.marginBottom = "10px";

        if (
          storeData.storeName === "모바일상품권 바코드 교환" ||
          storeData.storeName === "내셔널지오그래픽키즈" ||
          storeData.storeName === "코데즈컴바인 이너웨어"
        ) {
          storeButton.style.fontSize = "13px";
        } else {
          storeButton.style.fontSize = "16px";
        }

        storeButton.addEventListener("click", function () {
          if (storeData.storeFloor === "2F") {
            modalImage.src = "/static/img/lotte_map2.png";
          } else {
            modalImage.src = "/static/img/lotte_map1.png";
          }
          imgModal.style.display = "block";

          const marker = document.createElement("div");
          const additionalMarker = document.createElement("div");

          marker.classList.add("store-marker");
          marker.style.position = "absolute";
          marker.style.width = "30px";
          marker.style.height = "30px";
          marker.style.backgroundImage = "url(/static/img/marker.png)";
          marker.style.backgroundSize = "contain";
          marker.style.backgroundRepeat = "no-repeat";
          marker.style.left = `${storeData.store_x}px`;
          marker.style.top = `${storeData.store_y}px`;
          marker.style.transform = "translate(-50%, -100%)";
          marker.style.pointerEvents = "none";

          imgModal.appendChild(marker);

          if (storeData.storeName === "화장실") {
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

          if (storeData.storeName === "화장실") {
            utterance = new SpeechSynthesisUtterance(
              `화장실은 이 위치에 있습니다. 안내를 시작할까요?`
            );
          } else {
            utterance = new SpeechSynthesisUtterance(
              `${storeData.storeName} 매장은 이 위치에 있습니다. 안내를 시작할까요?`
            );
          }

          if (storeData.storeFloor === "2F") {
            utterance.text = `${storeData.storeName} 매장은 2층에 있습니다.`;
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

                      if (data.direction === 1 && storeData.upment) {
                        completionMessage = new SpeechSynthesisUtterance(
                          storeData.upment
                        );
                        console.log("멘트:", storeData.upment);
                      } else if (data.direction === 0 && storeData.downment) {
                        completionMessage = new SpeechSynthesisUtterance(
                          storeData.downment
                        );
                        console.log("멘트:", storeData.downment);
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

            const clickNum = storeData.click_num;

            updateClickNumInDB(clickNum);

            moveModalImage.src = "/static/img/movemodal.png";
            moveModal.style.display = "block";
          });

          cancelButton.addEventListener("click", function () {
            imgModal.style.display = "none";
            marker.remove();
            additionalMarker.remove();
          });
        });

        storeListDiv.appendChild(storeButton);
      });

      storeArea.appendChild(storeListDiv);
    });
  }

  function showFloorData(floorData, floor, defaultCategory) {
    const categories = [...new Set(floorData.map((item) => item["카테고리"]))];
    topbar.innerHTML = "";
    topbar.appendChild(createMenu(categories, floorData));

    showStores(
      floorData.filter((item) => item["카테고리"] === defaultCategory)
    );

    const defaultMenuButton = [...topbar.querySelectorAll("button")].find(
      (btn) => btn.textContent === defaultCategory
    );
    if (defaultMenuButton) {
      defaultMenuButton.classList.add("active");
    }
  }

  document.getElementById("1f-btn").addEventListener("click", function () {
    loadCSV(csvFilePath, (data) => {
      const firstFloorData = data.filter((item) => item["층"] === "1F");
      showFloorData(firstFloorData, "1F", "여성패션");
    });

    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    storeArea.scrollTop = 0;
  });

  document.getElementById("2f-btn").addEventListener("click", function () {
    loadCSV(csvFilePath, (data) => {
      const secondFloorData = data.filter((item) => item["층"] === "2F");
      showFloorData(secondFloorData, "2F", "래져/스포츠");
    });

    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    storeArea.scrollTop = 0;
  });

  loadCSV(csvFilePath, (data) => {
    const firstFloorData = data.filter((item) => item["층"] === "1F");
    showFloorData(firstFloorData, "1F", "여성패션");
  });

  document.getElementById("1f-btn").classList.add("active");
});
