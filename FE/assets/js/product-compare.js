const params = new URLSearchParams(window.location.search);
const product1ID = params.get('product1');
const product2ID = params.get('product2');

fetch('http://localhost:3000/products')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    const product1 = products.find(product => product.ProductID === parseInt(product1ID));
    const product2 = products.find(product => product.ProductID === parseInt(product2ID));

    if (product1) {
      document.getElementById('product1__name').textContent = product1.ProductName;
      document.querySelector('.col-4:nth-child(2) .product__image').src = product1.ImageURL;
      document.querySelector('.col-4:nth-child(2) .product__name').textContent = product1.ProductName;
      document.querySelector('.col-4:nth-child(2) .product__price').textContent = product1.Price;
    } else {
      console.error('Product 1 not found');
    }

    if (product2) {
      document.getElementById('product2__name').textContent = product2.ProductName;
      document.querySelector('.col-4:nth-child(3) .product__image').src = product2.ImageURL;
      document.querySelector('.col-4:nth-child(3) .product__name').textContent = product2.ProductName;
      document.querySelector('.col-4:nth-child(3) .product__price').textContent = product2.Price;
    } else {
      console.error('Product 2 not found');
    }

    // Tiếp tục fetch thông số của sản phẩm
    return fetch('http://localhost:3000/productDescriptions');
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(productDescriptions => {
    const product1Description = productDescriptions.find(item => item.ProductID === parseInt(product1ID));
    const product2Description = productDescriptions.find(item => item.ProductID === parseInt(product2ID));

    if (product1Description && product2Description) {
      // Truyền vào cả hai sản phẩm để hiển thị thông số
      displayProductDescriptions(product1Description, product2Description);
    } else {
      console.error('One or both product descriptions not found');
    }
  })
  .catch(error => {
    console.error('Error fetching products or descriptions:', error);
  });


// Hàm hiển thị thông số sản phẩm
function displayProductDescriptions(product1Description, product2Description) {
  const specsTable = document.getElementById('all-specs').querySelector('tbody');
  specsTable.innerHTML = ''; // Xóa nội dung cũ

  // Tạo các hàng trong bảng với thông tin sản phẩm 1 và sản phẩm 2
  specsTable.innerHTML += `
      <!-- Mục CPU -->
      <tr class="section-title" data-toggle="cpu">
          <td colspan="3" style="font-weight: bold; cursor: pointer;">
              Bộ xử lý <span class="arrow" data-direction="down">▼</span>
          </td>
      </tr>
      <tr class="cpu hidden">
          <td>Hãng CPU</td>
          <td>${product1Description.CPUcompany}</td>
          <td>${product2Description.CPUcompany}</td>
      </tr>
      <tr class="cpu hidden">
          <td>Công nghệ CPU</td>
          <td>${product1Description.CPUtechnology}</td>
          <td>${product2Description.CPUtechnology}</td>
      </tr>
      <tr class="cpu hidden">
          <td>Loại CPU</td>
          <td>${product1Description.CPUtype}</td>
          <td>${product2Description.CPUtype}</td>
      </tr>
      <tr class="cpu hidden">
          <td>Tốc độ CPU (tối thiểu)</td>
          <td>${product1Description.MinimumCPUspeed} GHz</td>
          <td>${product2Description.MinimumCPUspeed} GHz</td>
      </tr>
      <tr class="cpu hidden">
          <td>Tốc độ CPU (tối đa)</td>
          <td>${product1Description.MaximunSpeed} GHz</td>
          <td>${product2Description.MaximunSpeed} GHz</td>
      </tr>

      <!-- Mục RAM -->
      <tr class="section-title" data-toggle="ram">
          <td colspan="3" style="font-weight: bold; cursor: pointer;">
              RAM <span class="arrow" data-direction="down">▼</span>
          </td>
      </tr>
      <tr class="ram hidden">
          <td>Loại RAM</td>
          <td>${product1Description.RAMType}</td>
          <td>${product2Description.RAMType}</td>
      </tr>
      <tr class="ram hidden">
          <td>Tốc độ RAM</td>
          <td>${product1Description.RAMspeed}</td>
          <td>${product2Description.RAMspeed}</td>
      </tr>
      <tr class="ram hidden">
          <td>Dung lượng RAM</td>
          <td>${product1Description.RAMcapacity} GB</td>
          <td>${product2Description.RAMcapacity} GB</td>
      </tr>

      <!-- Mục lưu trữ -->
      <tr class="section-title" data-toggle="storage">
          <td colspan="3" style="font-weight: bold; cursor: pointer;">
              Lưu trữ <span class="arrow" data-direction="down">▼</span>
          </td>
      </tr>
      <tr class="storage hidden">
          <td>Loại ổ cứng</td>
          <td>${product1Description.StorageType}</td>
          <td>${product2Description.StorageType}</td>
      </tr>
      <tr class="storage hidden">
          <td>Dung lượng ổ cứng</td>
          <td>${product1Description.StorageCapacity} GB</td>
          <td>${product2Description.StorageCapacity} GB</td>
      </tr>

      <!-- Mục đồ họa -->
      <tr class="section-title" data-toggle="graphics">
          <td colspan="3" style="font-weight: bold; cursor: pointer;">
              Đồ họa <span class="arrow" data-direction="down">▼</span>
          </td>
      </tr>
      <tr class="graphics hidden">
          <td>Loại GPU</td>
          <td>${product1Description.GPUtype}</td>
          <td>${product2Description.GPUtype}</td>
      </tr>
      <tr class="graphics hidden">
          <td>Bộ nhớ GPU</td>
          <td>${product1Description.GPUMemory} GB</td>
          <td>${product2Description.GPUMemory} GB</td>
      </tr>

      <!-- Mục khác... -->
      <tr class="section-title" data-toggle="battery">
          <td colspan="3" style="font-weight: bold; cursor: pointer;">
              Pin <span class="arrow" data-direction="down">▼</span>
          </td>
      </tr>
      <tr class="battery hidden">
          <td>Dung lượng pin</td>
          <td>${product1Description.BatteryCapacity} mAh</td>
          <td>${product2Description.BatteryCapacity} mAh</td>
      </tr>
      <tr class="battery hidden">
          <td>Thời gian sử dụng</td>
          <td>${product1Description.BatteryLife} giờ</td>
          <td>${product2Description.BatteryLife} giờ</td>
      </tr>
  `;
}

// Hàm để hiển thị thông số nổi bật
function showHighlightSpecs() {
  document.getElementById('highlight-specs').classList.remove('hidden');
  document.getElementById('all-specs').classList.add('hidden');
  document.getElementById('highlight-btn').classList.add('active');
  document.getElementById('all-spec-btn').classList.remove('active');
}

// Hàm để hiển thị tất cả thông số
function showAllSpecs() {
  document.getElementById('all-specs').classList.remove('hidden');
  document.getElementById('highlight-specs').classList.add('hidden');
  document.getElementById('all-spec-btn').classList.add('active');
  document.getElementById('highlight-btn').classList.remove('active');
}

// Thêm sự kiện click cho các nút hiển thị
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('highlight-btn').addEventListener('click', showHighlightSpecs);
  document.getElementById('all-spec-btn').addEventListener('click', showAllSpecs);

  // Mặc định hiển thị thông số nổi bật khi tải trang
  showHighlightSpecs(); 
});

// Mở rộng/thu gọn các mục trong bảng thông số
document.addEventListener('click', function (event) {
  if (event.target.closest('.section-title')) {
      const section = event.target.closest('.section-title');
      const sectionClass = section.getAttribute('data-toggle');
      const rows = document.querySelectorAll(`.${sectionClass}`);
      const arrow = section.querySelector('.arrow');

      // Ẩn/hiện các hàng có liên quan
      rows.forEach(row => row.classList.toggle('hidden'));

      // Đổi mũi tên
      if (arrow.getAttribute('data-direction') === 'down') {
          arrow.textContent = '▲';
          arrow.setAttribute('data-direction', 'up');
      } else {
          arrow.textContent = '▼';
          arrow.setAttribute('data-direction', 'down');
      }
  }
});


