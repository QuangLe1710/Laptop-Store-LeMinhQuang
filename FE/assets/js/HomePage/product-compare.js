// Lấy tham số từ URL
const params = new URLSearchParams(window.location.search);
const product1ID = params.get("product1");
const product2ID = params.get("product2");

// Kiểm tra nếu có ID sản phẩm
if (product1ID && product2ID) {
  // Gọi API với các sản phẩm cần so sánh
  fetch(
    `http://localhost:8080/user/compare?ids=${product1ID}&ids=${product2ID}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Lấy dữ liệu sản phẩm từ API trả về
      const product1 = data[0];
      const product2 = data[1];

      // Cập nhật tên sản phẩm trong phần content-compare
      document.getElementById("product1__name").textContent =
        product1.productName;
      document.getElementById("product2__name").textContent =
        product2.productName;

      // Cập nhật thông tin sản phẩm 1
      document.getElementById("product1__image").src = product1.imageUrl;
      document.getElementById("product1__productName").textContent =
        product1.productName;
      document.getElementById(
        "product1__price"
      ).textContent = `${product1.price.toLocaleString()} VND`;

      // Cập nhật thông tin sản phẩm 2
      document.getElementById("product2__image").src = product2.imageUrl;
      document.getElementById("product2__productName").textContent =
        product2.productName;
      document.getElementById(
        "product2__price"
      ).textContent = `${product2.price.toLocaleString()} VND`;

      // Gắn ID sản phẩm vào nút "Thêm vào giỏ hàng"
      const addToCartButton1 = document.getElementById("add-to-cart-product1");
      const addToCartButton2 = document.getElementById("add-to-cart-product2");

      // Gán ID của sản phẩm vào nút
      addToCartButton1.setAttribute("data-product-id", product1.productId);
      addToCartButton2.setAttribute("data-product-id", product2.productId);
      displayProductDescriptions(product1, product2);
      updateProductComparison(product1, product2);
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}

// Hàm cập nhật thông tin sản phẩm
function updateProductComparison(product1, product2) {
  // Cập nhật tên sản phẩm trong phần content-compare
  document.getElementById("header__product1").textContent =
    product1.productName;
  document.getElementById("header__product2").textContent =
    product2.productName;

  // Cập nhật thông số kỹ thuật vào bảng
  document.getElementById("product1__cpuTech").textContent =
    product1.cpuTechnology || "N/A";
  document.getElementById("product2__cpuTech").textContent =
    product2.cpuTechnology || "N/A";

  document.getElementById("product1__ram").textContent =
    product1.ramCapacity || "N/A";
  document.getElementById("product2__ram").textContent =
    product2.ramCapacity || "N/A";

  document.getElementById("product1__gpu").textContent =
    product1.vgaFullName || "N/A";
  document.getElementById("product2__gpu").textContent =
    product2.vgaFullName || "N/A";

  document.getElementById("product1__screen").textContent =
    product1.screenSize || "N/A";
  document.getElementById("product2__screen").textContent =
    product2.screenSize || "N/A";
}

// Hàm hiển thị thông số sản phẩm
function displayProductDescriptions(product1Description, product2Description) {
  document.getElementById("All-header__product1").textContent =
    product1Description.productName;
  document.getElementById("All-header__product2").textContent =
    product2Description.productName;
  const specsTable = document
    .getElementById("all-specs")
    .querySelector("tbody");
  specsTable.innerHTML = ""; // Xóa nội dung cũ

  // Tạo các hàng trong bảng với thông tin sản phẩm 1 và sản phẩm 2
  specsTable.innerHTML += `
      <tr class="section-title" data-toggle="cpu">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        Bộ xử lý <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Hãng CPU</td>
                    <td>${product1Description.cpuCompany}</td>
                    <td>${product2Description.cpuCompany}</td>
                </tr>
                <tr class="">
                    <td>Công nghệ CPU</td>
                    <td>${product1Description.cpuTechnology}</td>
                    <td>${product2Description.cpuTechnology}</td>
                </tr>
                <tr class="">
                    <td>Loại CPU</td>
                    <td>${product1Description.cpuType}</td>
                    <td>${product2Description.cpuType}</td>
                </tr>
                <tr class="">
                    <td>Tốc độ CPU (tối thiểu)</td>
                    <td class="cpu-min">${product1Description.minimumCPUspeed} GHz</td>
                    <td class="cpu-min">${product2Description.minimumCPUspeed} GHz</td>
                </tr>
                <tr class="">
                    <td>Tốc độ CPU (tối đa)</td>
                    <td class="cpu-max">${product1Description.maximunSpeed} GHz</td>
                    <td class="cpu-max">${product2Description.maximunSpeed} GHz</td>
                </tr>
                <tr class="">
                    <td>Nhân CPU</td>
                    <td class="cpu-nhan">${product1Description.multiplier} GHz</td>
                    <td class="cpu-nhan">${product2Description.multiplier} GHz</td>
                </tr>
                 <tr class="">
                    <td>Bộ nhớ đệm</td>
                    <td class="bo-nho-dem">${product1Description.processorCache} GHz</td>
                    <td class="bo-nho-dem">${product2Description.processorCache} GHz</td>
                </tr>



                 <!-- Mục Đồ họa -->
                <tr class="section-title" data-toggle="graphics">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Đồ họa <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr> 

                <tr class="">
                    <td>Hãng (Card Oboard)</td>
                    <td>${product1Description.brandCardOboard}</td>
                    <td>${product2Description.brandCardOboard}</td>
                </tr>

                <tr class="">
                    <td>Model (Card Oboard)</td>
                    <td>${product1Description.modelCardOboard}</td>
                    <td>${product2Description.modelCardOboard}</td>
                </tr>

                <tr class="">
                    <td>Tên đầy đủ (Card onbroad)</td>
                    <td>${product1Description.fullNameCardOboard}</td>
                    <td>${product2Description.fullNameCardOboard}</td>
                </tr>
                <tr class="">
                    <td>Card VGA</td>
                    <td>${product1Description.vgaFullName}</td>
                    <td>${product2Description.vgaFullName}</td>
                </tr>

               

                <!-- Mục RAM -->
                <tr class="section-title" data-toggle="ram">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        RAM <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Dung lượng RAM</td>
                    <td class="ram-value">${product1Description.ramCapacity} GB</td>
                    <td class="ram-value">${product2Description.ramCapacity} GB</td>
                </tr>
                <tr class="">
                    <td>Loại RAM</td>
                    <td>${product1Description.ramType}</td>
                    <td>${product2Description.ramType}</td>
                </tr>
                <tr class="">
                    <td>Tốc độ RAM</td>
                    <td class="ram-speed">${product1Description.ramSpeed}</td>
                    <td class="ram-speed">${product2Description.ramSpeed}</td>
                </tr>


                 <tr class="">
                    <td>Số khe cắm rời</td>
                    <td class="so-khe-cam">${product1Description.numberOfRemovableSlots} </td>
                    <td class="so-khe-cam">${product2Description.numberOfRemovableSlots} </td>
                </tr>

                <tr class="">
                    <td>Số RAM onboard</td>
                    <td class="onboard">${product1Description.numberOfOnboardRAM} </td>
                    <td class="onboard">${product2Description.numberOfOnboardRAM} </td>
                </tr>

                <tr class="">
                    <td>Hỗ trợ RAM tối đa</td>
                    <td class="ho-tro-ram">${product1Description.maximumRAMSupport} GB </td>
                    <td class="ho-tro-ram">${product2Description.maximumRAMSupport} GB </td>
                </tr>

                <!-- Mục Lưu trữ -->
                <tr class="section-title" data-toggle="storage">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        Lưu trữ <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Kiểu ổ cứng</td>
                    <td>${product1Description.hardDriveType}</td>
                    <td>${product2Description.hardDriveType}</td>
                </tr>

                <tr class="">
                    <td>Số Khe</td>
                    <td class="so-khe">${product1Description.totalSSDHDDSlots}</td>
                    <td class="so-khe">${product2Description.totalSSDHDDSlots}</td>
                </tr>

                <tr class="">
                    <td>Số khe SSD/HDD còn lại</td>
                    <td class="so-khe-ssd">${product1Description.numberOfSSDHDDSlotsRemaining}</td>
                    <td class="so-khe-ssd">${product2Description.numberOfSSDHDDSlotsRemaining}</td>
                </tr>

                <tr class="">
                    <td>Dung lượng nâng cấp tối đa ổ cứng</td>
                    <td>${product1Description.maximumHardDriveUpgradeCapacity}</td>
                    <td>${product2Description.maximumHardDriveUpgradeCapacity}</td>
                </tr>

                <tr class="">
                    <td>Dung lượng ổ cứng</td>
                    <td class="dung-luong-o">${product1Description.capacity} GB</td>
                    <td class="dung-luong-o">${product2Description.capacity} GB</td>
                </tr>
              

                <!-- Mục Màn hình -->
                <tr class="section-title" data-toggle="screen">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        Màn hình <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Kích thước màn hình</td>
                    <td class="kich-thuoc-man">${product1Description.screenSize} inch</td>
                    <td class="kich-thuoc-man">${product2Description.screenSize} inch</td>
                </tr>
                <tr class="">
                    <td>Công nghệ màn hình</td>
                    <td>${product1Description.displayTechnology}</td>
                    <td>${product2Description.displayTechnology}</td>
                </tr>
                <tr class="">
                    <td>Độ phân giải</td>
                    <td>${product1Description.resolution}</td>
                    <td>${product2Description.resolution}</td>
                </tr>
               

                <tr class="">
                    <td>Loại màn hình</td>
                    <td>${product1Description.screenType}</td>
                    <td>${product2Description.screenType}</td>
                </tr>

                <tr class="">
                    <td>Tần số quét</td>
                    <td class="tan-so-quet">${product1Description.scanningFrequency} Hz</td>
                    <td class="tan-so-quet">${product2Description.scanningFrequency} Hz</td>
                </tr>

                
                <tr class="">
                    <td>Tấm nền</td>
                    <td>${product1Description.basePlate}</td>
                    <td>${product2Description.basePlate}</td>
                </tr>

                <tr class="">
                    <td>Độ sáng</td>
                    <td class="do-sang">${product1Description.brightness}</td>
                    <td class="do-sang">${product2Description.brightness}</td>
                </tr>

                <tr class="">
                    <td>Độ phủ màu</td>
                    <td>${product1Description.colorCoverage}</td>
                    <td>${product2Description.colorCoverage}</td>
                </tr>

                <tr class="">
                    <td>Tỷ lệ màn hình</td>
                    <td>${product1Description.screenRatio}</td>
                    <td>${product2Description.screenRatio}</td>
                </tr>

                <!-- Mục Giao tiếp và kết nối -->
                <tr class="section-title" data-toggle="connectivity">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        Giao tiếp và kết nối <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Cổng giao tiếp</td>
                    <td>${product1Description.communicationPort}</td>
                    <td>${product2Description.communicationPort}</td>
                </tr>
                <tr class="">
                    <td>Wi-Fi</td>
                    <td>${product1Description.wifi}</td>
                    <td>${product2Description.wifi}</td>
                </tr>
                <tr class="">
                    <td>Bluetooth</td>
                    <td>${product1Description.bluetooth}</td>
                    <td>${product2Description.bluetooth}</td>
                </tr>

                <tr class="">
                    <td>Webcam</td>
                    <td>${product1Description.webcam}</td>
                    <td>${product2Description.webcam}</td>
                </tr>

                <!-- Mục Hệ điều hành -->
                <tr class="section-title" data-toggle="os">
                    <td colspan="3" style="font-weight: bold; cursor: pointer; background-color:#bdc3c7;">
                        Hệ điều hành <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Tên hệ điều hành</td>
                    <td>${product1Description.os}</td>
                    <td>${product2Description.os}</td>
                </tr>
                <tr class="">
                    <td>Version</td>
                    <td>${product1Description.version}</td>
                    <td>${product2Description.version}</td>
                </tr>

                <!-- Mục Bảo mật -->
                <tr class="section-title" data-toggle="security">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Bảo mật <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Bảo mật hệ thống</td>
                    <td>${product1Description.security}</td>
                    <td>${product2Description.security}</td>
                </tr>

                <!-- Mục  Bàn phím & TouchPad -->
                <tr class="section-title" data-toggle="Keyboard-TouchPad">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Bàn phím & TouchPad <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>

                <tr class="">
                    <td>Kiểu bàn phím</td>
                    <td>${product1Description.keyboardType}</td>
                    <td>${product2Description.keyboardType}</td>
                </tr>

                <tr class="">
                    <td>Bàn phím số</td>
                    <td>${product1Description.numericKeypad}</td>
                    <td>${product2Description.numericKeypad}</td>
                </tr>

                <tr class="">
                    <td>Đèn bàn phím</td>
                    <td>${product1Description.keyboardLight}</td>
                    <td>${product2Description.keyboardLight}</td>
                </tr>

                 <tr class="">
                    <td>TouchPad</td>
                    <td>${product1Description.touchPad}</td>
                    <td>${product2Description.touchPad}</td>
                </tr>

                <!-- Mục  Thông tin pin & sạc -->
                <tr class="section-title" data-toggle="Battery-charging">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Thông tin pin & sạc<span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>

                <tr class="">
                    <td>Loại pin</td>
                    <td>${product1Description.batteryType}</td>
                    <td>${product2Description.batteryType}</td>
                </tr>

                 <tr class="">
                    <td>Dung lượng pin</td>
                    <td class="dung-luong-pin">${product1Description.batteryCapacity} mAh</td>
                    <td class="dung-luong-pin">${product2Description.batteryCapacity} mAh</td>
                </tr>

                 <tr class="">
                    <td>Power Supply</td>
                    <td class="cong-xuat">${product1Description.powerSupply}</td>
                    <td class="cong-xuat">${product2Description.powerSupply}</td>
                </tr>

                <!-- Mục Phụ kiện trong hộp -->
                <tr class="section-title" data-toggle="Accessories-in-the-box">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Phụ kiện trong hộp <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Phụ kiện trong hộp</td>
                    <td>${product1Description.accessoriesInTheBox}</td>
                    <td>${product2Description.accessoriesInTheBox}</td>
                </tr>

                <!-- Mục Thiết kế và trọng lượng -->
                <tr class="section-title" data-toggle="Design-weight">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Thiết kế và trọng lượng <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>Kích thước</td>
                    <td>${product1Description.size}</td>
                    <td>${product2Description.size}</td>
                </tr>

                <tr class="">
                    <td>Trọng lượng sản phẩm</td>
                    <td>${product1Description.productWeight}</td>
                    <td>${product2Description.productWeight}</td>
                </tr>

                <tr class="">
                    <td>Chất liệu</td>
                    <td>${product1Description.material}</td>
                    <td>${product2Description.material}</td>
                </tr>

                <!-- Mục Thông tin hàng hóa -->
                <tr class="section-title" data-toggle="product-info">
                    <td colspan="3" style="font-weight: bold; cursor: pointer;background-color:#bdc3c7;">
                        Thông tin hàng hóa <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="">
                    <td>P/N</td>
                    <td>${product1Description.pnProductCode}</td>
                    <td>${product2Description.pnProductCode}</td>
                </tr>

                <tr class="">
                    <td>Xuất xứ</td>
                    <td>${product1Description.origin}</td>
                    <td>${product2Description.origin}</td>
                </tr>
                <tr class="">
                    <td>Thời gian bảo hành</td>
                    <td class="thoi-gian-bao-hanh">${product1Description.warrantyPeriodMonths} tháng</td>
                    <td class="thoi-gian-bao-hanh">${product2Description.warrantyPeriodMonths} tháng</td>
                </tr>

                <tr class="">
                    <td>Hướng dẫn bảo quản</td>
                    <td>${product1Description.storageInstructions} </td>
                    <td>${product2Description.storageInstructions} </td>
                </tr>
                <tr class="">
                    <td>Hướng dẫn sử dụng</td>
                    <td>${product1Description.userManual} </td>
                    <td>${product2Description.userManual} </td>
                </tr>
                <tr class="">
                    <td>Màu sắc</td>
                    <td>${product1Description.color}</td>
                    <td>${product2Description.color}</td>
                </tr>
            `;
  setColor(".cpu-min", "GB");
  setColor(".cpu-max", "GB");
  setColor(".cpu-nhan", "GB");
  setColor(".bo-nho-dem", "GB");
  setColor(".ram-value", "GB");
  setColor(".so-khe-cam", "");
  setColor(".onboard", "GB");
  setColor(".ho-tro-ram", "GB");
  setColor(".so-khe", " ");
  setColor(".ram-speed", "GB");
  setColor(".dung-luong-o", "GB");
  setColor(".kich-thuoc-man", "inch");
  setColor(".tan-so-quet", "Hz");
  setColor(".do-sang", "");
  setColor(".dung-luong-pin", "mAh");
  setColor(".cong-xuat", "GB");
  setColor(".thoi-gian-bao-hanh", "tháng");
  setColor(".so-khe-ssd", "");
}

// Hàm để hiển thị thông số nổi bật
function showHighlightSpecs() {
  document.getElementById("highlight-specs").classList.remove("hidden");
  document.getElementById("all-specs").classList.add("hidden");
  document.getElementById("highlight-btn").classList.add("active");
  document.getElementById("all-spec-btn").classList.remove("active");
}

function extractRamValue(vl, ing) {
  return parseInt(vl.replace(ing, "").trim());
}
// Hàm để hiển thị tất cả thông số

function setColor(clas, ignore) {
  const Values = document.querySelectorAll(clas);
  // Hàm chuyển đổi chuỗi "8GB" thành số 8
  //
  // Lấy giá trị RAM của cả 2 sản phẩm
  const Product1 = extractRamValue(Values[0].textContent, ignore); // RAM của sản phẩm 1
  const Product2 = extractRamValue(Values[1].textContent, ignore); // RAM của sản phẩm 2
  const com0 = document.createElement("span");
  com0.innerHTML = "✔";
  com0.style.marginLeft = "10px";
  // So sánh và thay đổi màu sắc cho giá trị lớn hơn
  if (Product1 > Product2) {
    if (Product2 == 0) {
      Values[1].innerHTML = "X"; // Thêm icon vào sản phẩm 1
      Values[1].style.color = "red";
      Values[1].style.fontWeight = "bold";
    }
    Values[0].style.color = "#32ff7e"; // Sản phẩm 1 có RAM lớn hơn
    Values[0].style.fontWeight = "bold"; // Sản phẩm 1 có RAM lớn hơn
    Values[0].appendChild(com0); // Sản phẩm 1 có RAM lớn hơn
    Values[1].style.color = "red"; // Sản phẩm 2 có RAM nhỏ hơn
    Values[1].style.fontWeight = "bold"; // Sản phẩm 1 có RAM lớn hơn
  } else if (Product1 < Product2) {
    if (Product1 == 0) {
      Values[0].innerHTML = "X"; // Thêm icon vào sản phẩm 1
      Values[0].style.color = "red";
      Values[0].style.fontWeight = "bold";
    }
    Values[0].style.color = "red"; // Sản phẩm 1 có RAM nhỏ hơn
    Values[0].style.fontWeight = "bold"; // Sản phẩm 1 có RAM lớn hơn
    Values[1].style.color = "#32ff7e"; // Sản phẩm 2 có RAM lớn hơn
    Values[1].style.fontWeight = "bold"; // Sản phẩm 1 có RAM lớn hơn
    Values[1].appendChild(com0); // Sản phẩm 1 có RAM lớn hơn
  } else if (Product1 == 0 && Product2 == 0) {
    Values[0].innerHTML = "X"; // Thêm icon vào sản phẩm 1
    Values[0].style.color = "red";
    Values[0].style.fontWeight = "bold";
    Values[1].innerHTML = "X"; // Thêm icon vào sản phẩm 1
    Values[1].style.color = "red";
    Values[1].style.fontWeight = "bold";
  } else if (Product1 === Product2 && Product1 > 0) {
    const com1 = document.createElement("span");
    com1.innerHTML = "✔";
    com1.style.marginLeft = "10px";
    const com2 = document.createElement("span");
    com2.style.marginLeft = "10px";
    com2.innerHTML = "✔";
    Values[1].appendChild(com1);
    Values[0].appendChild(com2);
    Values[0].style.color = "#18dcff";
    Values[0].style.fontWeight = "bold";
    Values[1].style.color = "#18dcff";
    Values[1].style.fontWeight = "bold";
  }
}
function showAllSpecs() {
  document.getElementById("all-specs").classList.remove("hidden");
  document.getElementById("highlight-specs").classList.add("hidden");
  document.getElementById("all-spec-btn").classList.add("active");
  document.getElementById("highlight-btn").classList.remove("active");
}

// Thêm sự kiện click cho các nút hiển thị
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("highlight-btn")
    .addEventListener("click", showHighlightSpecs);
  document
    .getElementById("all-spec-btn")
    .addEventListener("click", showAllSpecs);

  // Mặc định hiển thị thông số nổi bật khi tải trang
  showHighlightSpecs();
});

// Mở rộng/thu gọn các mục trong bảng thông số
document.addEventListener("click", function (event) {
  if (event.target.closest(".section-title")) {
    const section = event.target.closest(".section-title");
    const sectionClass = section.getAttribute("data-toggle");
    const rows = document.querySelectorAll(`.${sectionClass}`);
    const arrow = section.querySelector(".arrow");

    // Ẩn/hiện các hàng có liên quan
    rows.forEach((row) => row.classList.toggle("hidden"));

    // Đổi mũi tên
    if (arrow.getAttribute("data-direction") === "down") {
      arrow.textContent = "▲";
      arrow.setAttribute("data-direction", "up");
    } else {
      arrow.textContent = "▼";
      arrow.setAttribute("data-direction", "down");
    }
  }
});
