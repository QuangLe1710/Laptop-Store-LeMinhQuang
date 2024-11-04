document.addEventListener('DOMContentLoaded', function () {
  const featuredList = document.getElementById('featured-products-list');
  const regularList = document.getElementById('regular-products-list');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const sortOptions = document.getElementById('sort-options');

  let allProducts = []; // Lưu trữ tất cả sản phẩm
  let displayedProducts = []; // Sản phẩm đang hiển thị
  let filteredProducts = []; // Sản phẩm đã lọc
  let productOffset = 10; // Vị trí bắt đầu để load thêm sản phẩm
  let currentSortOption = ''; // Lưu trữ tiêu chí sắp xếp hiện tại

  // Gọi API để load sản phẩm khi trang load
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
      allProducts = data; // Lưu tất cả sản phẩm vào biến allProducts
      displayFeaturedProducts(allProducts);
      displayedProducts = allProducts.slice(4, 10); // Lưu các sản phẩm hiển thị ban đầu
      displayRegularProducts(displayedProducts);
    })
    .catch(error => console.error('Error fetching products:', error));

  // Hàm hiển thị 4 sản phẩm nổi bật
  function displayFeaturedProducts(products) {
    const featuredProducts = products.slice(0, 4);
    featuredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('featured-item');
      productDiv.innerHTML = `
        <a class="product-link" href="product-details.html?id=${product.ProductID}">
          <div class="product-image">
            <img src="${product.ImageURL}" alt="${product.ProductName}">
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.ProductName}</h3>
            <p class="product-price">Giá: ${(product.Price * 1000000).toLocaleString('vi-VN')} VND</p>
          </div>
        </a>
        <button class="compare-btn" onclick="addToCompare(${product.ProductID})">
          <div class="icon-circle">
            <i class="fas fa-plus"></i>
          </div>
          So sánh
        </button>
      `;
      featuredList.appendChild(productDiv);
    });
  }

  // Hàm hiển thị sản phẩm thường
  function displayRegularProducts(products) {
    regularList.innerHTML = ''; // Xóa danh sách hiện tại
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <a class="product-link" href="product-details.html?id=${product.ProductID}">
          <div class="product-image">
            <img src="${product.ImageURL}" alt="${product.ProductName}">
          </div>
          <div class="product-info">
            <h3 class="product-title">${product.ProductName}</h3>
            <p class="product-price">Giá: ${(product.Price * 1000000).toLocaleString('vi-VN')} VND</p>
          </div>
        </a>
        <button class="compare-btn" onclick="addToCompare(${product.ProductID})">
          <div class="icon-circle">
            <i class="fas fa-plus"></i>
          </div>
          So sánh
        </button>
      `;
      regularList.appendChild(productDiv);
    });
  }

  loadMoreBtn.addEventListener('click', function () {
    const newProducts = filteredProducts.length > 0 ? filteredProducts.slice(productOffset, productOffset + 6) : allProducts.slice(productOffset, productOffset + 6);
    if (newProducts.length > 0) {
      displayedProducts = displayedProducts.concat(newProducts); // Cập nhật danh sách sản phẩm hiển thị
      sortAndDisplayProducts(); // Sắp xếp và hiển thị lại
      productOffset += 6; // Tăng vị trí bắt đầu để load thêm lần sau
    } else {
      loadMoreBtn.style.display = 'none'; // Ẩn nút nếu không còn sản phẩm
    }
  });

  // Hàm sắp xếp sản phẩm
  sortOptions.addEventListener('change', function () {
    currentSortOption = sortOptions.value; // Lưu trữ tiêu chí sắp xếp hiện tại
    sortAndDisplayProducts(); // Gọi hàm để sắp xếp và hiển thị
  });

  function sortAndDisplayProducts() {
    let sortedProducts = filteredProducts.length > 0 ? [...filteredProducts] : [...displayedProducts]; // Sắp xếp các sản phẩm đã lọc hoặc đang hiển thị

    // Sắp xếp theo tiêu chí hiện tại
    if (currentSortOption === 'name-asc') {
      sortedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    } else if (currentSortOption === 'name-desc') {
      sortedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
    } else if (currentSortOption === 'price-asc') {
      sortedProducts.sort((a, b) => a.Price - b.Price);
    } else if (currentSortOption === 'price-desc') {
      sortedProducts.sort((a, b) => b.Price - a.Price);
    }

    // Hiển thị lại các sản phẩm đã sắp xếp
    displayRegularProducts(sortedProducts);
  }

  // Hàm để lấy giá trị từ form bộ lọc
  function getFilterValues() {
    const form = document.getElementById('filter-form');
    const formData = new FormData(form);
    const filters = {};

    // Lấy các giá trị checkbox đã chọn
    for (const [key, value] of formData.entries()) {
      if (!filters[key]) {
        filters[key] = [];
      }
      filters[key].push(value);
    }

    return filters;
  }

  // Hàm để cập nhật URL với các tham số lọc
  function setURLParams(filterCriteria) {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    // Thêm từng tiêu chí vào URL
    for (const key in filterCriteria) {
      if (filterCriteria[key].length) {
        params.set(key, filterCriteria[key].join(','));
      }
    }

    // Cập nhật URL mà không reload trang
    url.search = params.toString();
    window.history.pushState({}, '', url);
  }

  // Hàm để lấy sản phẩm và lọc theo tiêu chí
  async function getFilteredProducts(params) {
    const filterCriteria = params || getFilterValues(); // Sử dụng tham số nếu có, nếu không lấy từ form

    // Cập nhật URL với các tiêu chí lọc
    setURLParams(filterCriteria);

    try {
      // Lấy dữ liệu sản phẩm
      const productsResponse = await fetch('http://localhost:3000/products');
      const products = await productsResponse.json();

      const productDescriptionsResponse = await fetch('http://localhost:3000/productDescriptions');
      const productDescriptions = await productDescriptionsResponse.json();

      // Kết hợp sản phẩm với mô tả sản phẩm
      const combinedData = products.map(product => {
        const description = productDescriptions.find(desc => desc.ProductID === product.ProductID);
        return { ...product, ...description };
      });

      // Lọc sản phẩm theo tiêu chí
      filteredProducts = combinedData.filter(product => {
        // Kiểm tra các tiêu chí lọc
        const brandFilter = filterCriteria.brand ? filterCriteria.brand.includes(product.Brand.toLowerCase()) : true;
        const priceFilter = filterCriteria.price ? filterCriteria.price.some(priceRange => {
          const [min, max] = priceRange.split('-').map(Number);
          return product.Price >= (min || 0) && (max ? product.Price <= max : true);
        }) : true;
        const cpuFilter = filterCriteria.cpu ? filterCriteria.cpu.includes(product.CPUtechnology.toLowerCase()) : true;

        // So sánh RAM với kiểu dữ liệu phù hợp
        const ramFilter = filterCriteria.ram ? filterCriteria.ram.includes(String(product.RAMcapacity)) : true;

        // So sánh dung lượng lưu trữ (Capacity)
        const storageFilter = filterCriteria.storage ? filterCriteria.storage.includes(String(product.Capacity)) : true;

        // So sánh kích thước màn hình (ScreenSize)
        const screenSizeFilter = filterCriteria['screen-size'] ? filterCriteria['screen-size'].includes(product.ScreenSize.toString()) : true;

        return brandFilter && priceFilter && cpuFilter && ramFilter && storageFilter && screenSizeFilter;
      });

      // Hiển thị các sản phẩm đã lọc
      displayRegularProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (error) {
      console.error('Error fetching or filtering products:', error);
    }
  }

  // Gọi hàm để lấy và hiển thị sản phẩm theo tiêu chí lọc
  document.getElementById('filter-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn chặn việc submit form
    getFilteredProducts(); // Gọi hàm lọc sản phẩm
  });
});













// slider banner
let currentSlide = 0;

// Hiện slide đầu tiên khi tải trang
showSlides();

function showSlides() {
    const slides1 = document.querySelectorAll('.img-fluid-item1 img');
    slides1.forEach((slide) => {
        slide.classList.remove('show'); // Ẩn tất cả
    });
    
    slides1[currentSlide].classList.add('show'); // Hiện slide trong item1
}

function changeSlide(n) {
    const totalSlides = document.querySelectorAll('.img-fluid-item1 img').length;

    currentSlide += n;

    // Đảm bảo currentSlide không vượt quá số lượng ảnh
    if (currentSlide >= totalSlides) {
        currentSlide = 0; // Trở về đầu
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Quay lại cuối
    }

    showSlides();
}

// Tự động chuyển slide sau 5 giây
setInterval(() => changeSlide(1), 5000);
// slider banner


// ẩn hiện box khi đăng nhập,đăng xuất
document.addEventListener("DOMContentLoaded", function () {
  var userAccount = document.getElementById("userAccount");
  var userMenu = document.getElementById("userMenu");
  var loginLink = document.getElementById("loginLink");
  var userInfo = document.getElementById("userInfo");
  var orders = document.getElementById("orders");
  var logout = document.getElementById("logout");

  // Kiểm tra trạng thái đăng nhập
  var isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Cập nhật giao diện
  function updateMenu() {
      if (isLoggedIn) {
          loginLink.style.display = "none";   // Ẩn liên kết đăng nhập
          userInfo.style.display = "block";   // Hiển thị thông tin cá nhân
          orders.style.display = "block";     // Hiển thị đơn hàng
          logout.style.display = "block";     // Hiển thị đăng xuất

          // Nếu là admin, bạn có thể hiển thị thêm thông tin hoặc điều hướng khác
          if (localStorage.getItem("userRole") === 'admin') {
              // Thực hiện hành động nếu cần cho admin
          }
      } else {
          loginLink.style.display = "block";  // Hiển thị liên kết đăng nhập
          userInfo.style.display = "none";    // Ẩn thông tin cá nhân
          orders.style.display = "none";      // Ẩn đơn hàng
          logout.style.display = "none";      // Ẩn đăng xuất
      }
  }

  // Khi nhấp vào biểu tượng người dùng
  userAccount.addEventListener("click", function () {
      if (userMenu.style.display === "none" || userMenu.style.display === "") {
          userMenu.style.display = "block";
      } else {
          userMenu.style.display = "none";
      }
  });

  // Khi người dùng nhấp vào "Đăng nhập"
  loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      // Điều hướng người dùng đến trang đăng nhập
      window.location.href = "login.html";
  });

  // Khi người dùng nhấp vào "Đăng xuất"
  logout.addEventListener("click", function (event) {
      event.preventDefault();
      // Xử lý việc đăng xuất
      alert("Đăng xuất thành công!");
      localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
      localStorage.removeItem("userRole"); // Xóa thông tin vai trò
      isLoggedIn = false;
      updateMenu(); // Cập nhật lại giao diện
  });

  // Gọi hàm để cập nhật giao diện ngay khi trang load
  updateMenu();
});
// ẩn hiện box khi đăng nhập,đăng xuất


document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    // Ẩn bộ lọc hiện tại (nếu có)
    document.querySelector('.filter').classList.add('d-none');

    // Hiển thị bộ lọc
    document.querySelector('.filter').classList.remove('d-none');
    document.querySelector('.filter').classList.add('d-block');
  });
});

function toggleFilter(filterId) {
  const filterItems = document.getElementById(filterId);
  if (filterItems.style.display === "none") {
    filterItems.style.display = "block"; // Hiện các mục lọc
  } else {
    filterItems.style.display = "none"; // Ẩn các mục lọc
  }
}

//Lọc sản phẩm theo hãng khi chọn từ nav slider
const boxes = document.querySelectorAll('.custom-grid-item');
    
    // Duyệt qua từng box
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            // Bỏ class 'selected' khỏi tất cả các box khác
            boxes.forEach(item => item.classList.remove('selected'));
            
            // Thêm class 'selected' vào box được click
            this.classList.add('selected');
            
            // Lấy hãng từ span (giả sử tên hãng nằm trong thẻ span)
            const brand = this.querySelector('span').textContent;
            
            // Gọi hàm lọc sản phẩm theo hãng
            filterProductsByBrand(brand);
        });
    });
    
    // Hàm lọc sản phẩm theo hãng
    function filterProductsByBrand(brand) {
        // Giả sử bạn đã có danh sách sản phẩm và lọc chúng ở đây
        console.log(`Lọc các sản phẩm của hãng: ${brand}`);
        // Thực hiện việc lọc sản phẩm và hiển thị chúng trên giao diện
    }
//Lọc sản phẩm theo hãng khi chọn từ nav slider


// So sánh
// Biến để lưu trữ sản phẩm được so sánh
function compareProducts() {
  // Lấy danh sách các sản phẩm đang được thêm vào thanh so sánh (nav)
  if (comparedProducts.length === 2) {
    const product1ID = comparedProducts[0]; 
    const product2ID = comparedProducts[1];

    // Tạo URL để chuyển đến trang product-compare.html và truyền các ID sản phẩm
    const compareURL = `product-compare.html?product1=${product1ID}&product2=${product2ID}`;

    // Chuyển hướng đến trang so sánh
    window.location.href = compareURL;
  } else {
    alert("Bạn cần chọn 2 sản phẩm để so sánh!");
  }
}


let comparedProducts = [];

// Hàm thêm sản phẩm vào danh sách so sánh
function addToCompare(productId) {
  if (comparedProducts.length >= 2) {
    alert('Bạn chỉ có thể so sánh tối đa 2 sản phẩm!');
    return;
  }
  
  // Kiểm tra xem sản phẩm đã được thêm chưa
  if (!comparedProducts.includes(productId)) {
    comparedProducts.push(productId);
    updateCompareProducts();

    // Hiện thanh điều hướng nếu có sản phẩm
    document.querySelector('.navbar').style.display = 'flex';
  } else {
    alert('Sản phẩm đã được thêm vào danh sách so sánh!');
  }
}

// Hàm cập nhật danh sách sản phẩm so sánh trên navbar
function updateCompareProducts() {
  const compareProductsDiv = document.querySelector('.compare-products');
  const navbar = document.querySelector('.navbar');
  compareProductsDiv.innerHTML = ''; // Xóa nội dung cũ

  // Kiểm tra nếu có sản phẩm trong danh sách so sánh
  if (comparedProducts.length > 0) {
    navbar.style.display = 'flex'; // Hiện thanh navbar
    document.getElementById('toggle-arrow').style.display = 'inline'; // Hiện mũi tên

    // Lấy toàn bộ sản phẩm từ API
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        comparedProducts.forEach(productId => {
          const product = products.find(item => item.ProductID === productId);
          if (product) {
            const productItem = document.createElement('div');
            productItem.classList.add('compare-item');
            productItem.innerHTML = `
              <div class="compare-product-image">
                <img src="${product.ImageURL}" alt="${product.ProductName}">
                 <span>${product.ProductName}</span>
              </div>
              <div class="compare-product-info">
               
                <button class="remove-btn" onclick="removeFromCompare(${productId})">X</button>
              </div>
            `;
            compareProductsDiv.appendChild(productItem);
          }
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  } else {
    navbar.style.display = 'none'; // Ẩn thanh navbar nếu không có sản phẩm
    document.getElementById('toggle-arrow').style.display = 'none'; // Ẩn mũi tên
  }
}

// Hàm xóa sản phẩm khỏi danh sách so sánh
function removeFromCompare(productId) {
  comparedProducts = comparedProducts.filter(id => id !== productId);
  updateCompareProducts();
}

// Hàm xóa tất cả sản phẩm trong danh sách so sánh
function clearAllCompare() {
  comparedProducts = [];
  updateCompareProducts();
}

// Hàm để toggle navbar
function toggleNavbar() {
  const navbar = document.querySelector('.navbar');
  const arrow = document.getElementById('toggle-arrow');

  // Kiểm tra nếu navbar đang hiển thị
  if (navbar.style.display === 'flex') {
    navbar.style.display = 'none'; // Ẩn navbar
    arrow.textContent = '▲'; // Mũi tên lên
  } else {
    navbar.style.display = 'flex'; // Hiện navbar
    arrow.textContent = '▼'; // Mũi tên xuống
  }
}


// So sánh


//Bộ lọc
