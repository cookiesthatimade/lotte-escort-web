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

      storeNamesForLotte2.push({ store_floor, storeName, store_x, store_y });

      obj["층"] = store_floor;
      obj["매장명"] = storeName;
      obj["x_loc"] = store_x;
      obj["y_loc"] = store_y;

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

      if (!uniqueSubCategories.has(subCategory)) {
        uniqueSubCategories.add(subCategory);
        subCategoryStoreMap[subCategory] = [];
      }

      subCategoryStoreMap[subCategory].push(store);
    });

    // 중복 제거된 하위카테고리별로 매장을 표시
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

      // 해당 하위카테고리에 속한 매장들을 버튼으로 표시
      subCategoryStoreMap[subCategory].forEach((store) => {
        const storeButton = document.createElement("button");
        storeButton.textContent = store;
        storeButton.classList.add("store-button");
        storeButton.style.marginRight = "10px";
        storeButton.style.marginBottom = "10px";

        if (store === "모바일상품권 바코드 교환") {
          storeButton.style.fontSize = "14px";
        } else {
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
