const urlParams = new URLSearchParams(window.location.search);
const queryParam = urlParams.get("q");

const sortOptions = document.getElementById("sort-options");
const filterForm = document.getElementById("filter-form");
const productList = document.getElementById("Find-products-list");

let allProducts = [];

const apiSearchUrl = queryParam
  ? `http://localhost:8080/user/search?keyword=${queryParam}`
  : null;

// Hàm gọi API tìm kiếm và hiển thị sản phẩm
async function fetchSearchResults() {
  if (!apiSearchUrl) {
    console.error("Không có tham số tìm kiếm trong URL.");
    return;
  }

  try {
    const response = await fetch(apiSearchUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Lỗi khi gọi API tìm kiếm");

    allProducts = await response.json();
    console.log("Danh sách sản phẩm bằng tìm kiếm :", allProducts);
    displayProducts(allProducts);
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
}

function str(product) {
  return (
    product.productName +
    " " +
    product.cpuType +
    "/" +
    product.ramCapacity +
    "GB/" +
    product.capacity +
    "GB"
  );
}
// Hàm hiển thị sản phẩm
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
      <a class="product-link" href="product-details.html?id=${
        product.productId
      }">
        <div class="product-image">
          <img src="${product.imageUrl}" alt="${
      product.productName
    }" style="width:144px; height: auto;">
        </div>
        <div class="product-info">
          <p style="text-align: left; font-size:14px; display: -webkit-box;            /* Dùng kết hợp với line-clamp */
  -webkit-box-orient: vertical;    /* Đặt hướng khối dọc */
  overflow: hidden;                /* Ẩn phần văn bản vượt quá */
  text-overflow: ellipsis;         /* Hiển thị dấu ba chấm */
  -webkit-line-clamp: 2;           /* Hiển thị tối đa 2 dòng */
  line-height: 1.5;                /* Chiều cao mỗi dòng (tuỳ chỉnh phù hợp) */
  max-height: calc(1.5em * 2);">${str(product)}</p>
      <p style="text-align: left; font-size:14px; font-weight:bold;" class="product-price">Giá: ${product.price.toLocaleString(
        "vi-VN"
      )} VND</p>
        </div>
      </a>
      <style>
        .Promotion_promotionImage__W_3LG {
        align-items: center;
        color: var(--neutral-gray-5);
        display: flex;
        font-size: 12px;
        font-weight: 400;
        gap: .25rem;
        line-height: 18px;
        margin-bottom: .375rem;
        }
        .Promotion_promotionDetail__X7Mhn {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        color: var(--neutral-gray-5);
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        overflow: hidden;
        text-align: left;
        }
        .Promotion_image__NQS_H {
        background-color: var(--neutral-white);
        border-color: gray;
        border-radius: 8px;
        border-style: solid;
        border-width: 3px;
        cursor: pointer;
        position: relative;
        transition-duration: .3s;
        }
    </style>
    <hr>
      <div class="ProductCard_footer__6g111">
        <div class=""><div class="Promotion_promotionImage__W_3LG">
          <div class="Promotion_image__NQS_H Promotion_imageActive__aNLfP">
            <div class="overflow-hidden rounded">
              <img alt="KM-1124-1825" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" class="h-6 w-6 pc:h-[36px] pc:w-[36px]" srcset="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/OCB-1695659775285.png?w=48&amp;q=100 1x, https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/OCB-1695659775285.png?w=96&amp;q=100 2x" src="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/OCB-1695659775285.png?w=96&amp;q=100" style="color: transparent;">
            </div>
          </div>
          <div class="Promotion_image__NQS_H"><div class="overflow-hidden rounded">
              <img alt="KM-0724-0315" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" class="h-6 w-6 pc:h-[36px] pc:w-[36px]" srcset="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/Vnapy-1693370130549.png?w=48&amp;q=100 1x, https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/Vnapy-1693370130549.png?w=96&amp;q=100 2x" src="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/Vnapy-1693370130549.png?w=96&amp;q=100" style="color: transparent;">
          </div>
        </div>
          <div class="Promotion_image__NQS_H">
            <div class="overflow-hidden rounded">
              <img alt="KM-1124-1842" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" class="h-6 w-6 pc:h-[36px] pc:w-[36px]" srcset="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/462636566_533475369687081_1230000458424744947_hd%20bank%201-1733973320478.png?w=48&amp;q=100 1x, https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/462636566_533475369687081_1230000458424744947_hd%20bank%201-1733973320478.png?w=96&amp;q=100 2x" src="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/462636566_533475369687081_1230000458424744947_hd%20bank%201-1733973320478.png?w=96&amp;q=100" style="color: transparent;">
            </div>
          </div>
          <div class="Promotion_image__NQS_H">
            <div class="overflow-hidden rounded">
              <img alt="KM-1124-1766" loading="lazy" width="36" height="36" decoding="async" data-nimg="1" class="h-6 w-6 pc:h-[36px] pc:w-[36px]" srcset="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/images-1716947256014.png?w=48&amp;q=100 1x, https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/images-1716947256014.png?w=96&amp;q=100 2x" src="https://s3-sgn09.fptcloud.com/ict-k8s-promotion-prod/images-promotion/images-1716947256014.png?w=96&amp;q=100" style="color: transparent;">
            </div>
          </div>
        </div>
        <p class="Promotion_promotionDetail__X7Mhn">Chủ thẻ OCB: Giảm thêm 500,000đ</p>
     </div>
        <p class="ProductCard_footerBtn__zpRcm mt-0"></p>
     </div>
      <button class="compare-btn" onclick="addToCompare(${product.productId})">
        <div class="icon-circle">
          <i class="fas fa-plus"></i>
        </div>
        So sánh
      </button>
    `;
    productList.appendChild(productItem);
  });
}

function sortProducts(sortCriteria) {
  let sortedProducts = [...allProducts];
  if (sortCriteria === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortCriteria === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  displayProducts(sortedProducts);
}

// Lấy giá trị từ các checkbox đã chọn
function getSelectedCheckboxes(groupName) {
  const checkboxes = document.querySelectorAll(
    `input[name="${groupName}"]:checked`
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

// Hàm xây dựng URL API với bộ lọc
function buildFilterApiUrl() {
  const apiUrl = "http://localhost:8080/user/home";
  const params = new URLSearchParams();

  const brands = getSelectedCheckboxes("brand-filter");
  brands.forEach((brand) => params.append("idBrand", brand));

  const prices = getSelectedCheckboxes("price-filter");
  prices.forEach((price) => params.append("price", price));

  const cpus = getSelectedCheckboxes("cpu-filter");
  cpus.forEach((cpu) => params.append("cpu", cpu));

  const rams = getSelectedCheckboxes("ram-filter");
  rams.forEach((ram) => params.append("ram", ram));

  const storages = getSelectedCheckboxes("hardrive-filter");
  storages.forEach((storage) => params.append("hardDrive", storage));

  const screenSizes = getSelectedCheckboxes("screen-size-filter");
  screenSizes.forEach((screenSize) => params.append("screenSize", screenSize));

  return `${apiUrl}/?${params.toString()}`;
}

// Hàm gọi API lọc và hiển thị sản phẩm
async function fetchFilteredProducts() {
  try {
    const filterApiUrl = buildFilterApiUrl();
    const response = await fetch(filterApiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Lỗi khi gọi API lọc");

    allProducts = await response.json();
    console.log("Danh sách sản phẩm khi dùng bộ lọc :", allProducts);
    displayProducts(allProducts);
  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
}

// Sự kiện submit form lọc
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchFilteredProducts();
});

// Sự kiện thay đổi sắp xếp
sortOptions.addEventListener("change", (event) => {
  sortProducts(event.target.value);
});

if (queryParam) {
  fetchSearchResults();
} else {
  console.log("Không có tham số tìm kiếm trong URL.");
}
