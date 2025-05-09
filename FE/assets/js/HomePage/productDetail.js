document.addEventListener('DOMContentLoaded', function () {
  // Lấy ProductID từ URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id'); // Lấy giá trị của tham số id từ URL

  if (productId) {
    // Gọi API để lấy tất cả sản phẩm
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        // Tìm sản phẩm có ProductID khớp với giá trị từ URL
        const product = products.find(item => item.ProductID === Number(productId));

        if (product) {
          // Hiển thị thông tin chi tiết sản phẩm
          displayProductDetails(product);
        } else {
          console.error('Product not found');
        }
      })
      .catch(error => console.error('Error fetching product details:', error));

    // Gọi API để lấy thông số sản phẩm
    fetch('http://localhost:3000/productDescriptions')
      .then(response => response.json())
      .then(productDescriptions => {
        // Tìm thông số sản phẩm có ProductID khớp với giá trị từ URL
        const productDescription = productDescriptions.find(item => item.ProductID === Number(productId));

        if (productDescription) {
          // Hiển thị thông số sản phẩm
          displayProductDescriptions(productDescription);
        } else {
          console.error('Product description not found');
        }
      })
      .catch(error => console.error('Error fetching product descriptions:', error));
  } else {
    console.error('Product ID not found in URL');
  }

  function displayProductDetails(product) {
    document.getElementById('product-name').textContent = product.ProductName;
    document.getElementById('product-name-breadcrumb').textContent = product.ProductName; // Hiển thị tên trong breadcrumb
    document.getElementById('product-image').src = product.ImageURL;
    document.getElementById('product-status').textContent = "Tình Trạng: Còn hàng"; // Sửa lại id ở đây
    document.getElementById('product-price').textContent = `Giá: ${(product.Price *1000000).toLocaleString('vi-VN')} VND`;
  }

  function displayProductDescriptions(productDescription) {
    const specsTable = document.getElementById('all-specs');
            specsTable.innerHTML = ''; // Xóa nội dung cũ

            // Tạo các hàng trong bảng với thông tin sản phẩm
            specsTable.innerHTML += `
                <tr class="section-title" data-toggle="cpu">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Bộ xử lý <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="cpu hidden">
                    <td>Hãng CPU</td>
                    <td>${productDescription.CPUcompany}</td>
                </tr>
                <tr class="cpu hidden">
                    <td>Công nghệ CPU</td>
                    <td>${productDescription.CPUtechnology}</td>
                </tr>
                <tr class="cpu hidden">
                    <td>Loại CPU</td>
                    <td>${productDescription.CPUtype}</td>
                </tr>
                <tr class="cpu hidden">
                    <td>Tốc độ CPU (tối thiểu)</td>
                    <td>${productDescription.MinimumCPUspeed} GHz</td>
                </tr>
                <tr class="cpu hidden">
                    <td>Tốc độ CPU (tối đa)</td>
                    <td>${productDescription.MaximunSpeed} GHz</td>
                </tr>

                <!-- Mục RAM -->
                <tr class="section-title" data-toggle="ram">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        RAM <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="ram hidden">
                    <td>Loại RAM</td>
                    <td>${productDescription.RAMType}</td>
                </tr>
                <tr class="ram hidden">
                    <td>Tốc độ RAM</td>
                    <td>${productDescription.RAMspeed}</td>
                </tr>
                <tr class="ram hidden">
                    <td>Dung lượng RAM</td>
                    <td>${productDescription.RAMcapacity} GB</td>
                </tr>

                <!-- Mục Lưu trữ -->
                <tr class="section-title" data-toggle="storage">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Lưu trữ <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="storage hidden">
                    <td>Loại ổ cứng</td>
                    <td>SSD</td>
                </tr>
                <tr class="storage hidden">
                    <td>Dung lượng ổ cứng</td>
                    <td>${productDescription.Capacity} GB</td>
                </tr>
                <tr class="storage hidden">
                    <td>Số khe ổ cứng SSD/HDD</td>
                    <td>${productDescription.TotalSSDHDDSlots}</td>
                </tr>
                <tr class="storage hidden">
                    <td>Số khe còn lại</td>
                    <td>${productDescription.NumberOfSSDHDDSlotsRemaining}</td>
                </tr>

                <!-- Mục Màn hình -->
                <tr class="section-title" data-toggle="screen">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Màn hình <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="screen hidden">
                    <td>Kích thước màn hình</td>
                    <td>${productDescription.ScreenSize} inch</td>
                </tr>
                <tr class="screen hidden">
                    <td>Công nghệ hiển thị</td>
                    <td>${productDescription.DisplayTechnology}</td>
                </tr>
                <tr class="screen hidden">
                    <td>Độ phân giải</td>
                    <td>${productDescription.Resolution}</td>
                </tr>

                <!-- Mục Giao tiếp và kết nối -->
                <tr class="section-title" data-toggle="connectivity">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Giao tiếp và kết nối <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="connectivity hidden">
                    <td>Cổng giao tiếp</td>
                    <td>${productDescription.CommunicationPort}</td>
                </tr>
                <tr class="connectivity hidden">
                    <td>Wi-Fi</td>
                    <td>${productDescription.Wifi}</td>
                </tr>
                <tr class="connectivity hidden">
                    <td>Bluetooth</td>
                    <td>${productDescription.Bluetooth}</td>
                </tr>

                <!-- Mục Hệ điều hành -->
                <tr class="section-title" data-toggle="os">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Hệ điều hành <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="os hidden">
                    <td>Tên hệ điều hành</td>
                    <td>${productDescription.OS}</td>
                </tr>

                <!-- Mục Bảo mật -->
                <tr class="section-title" data-toggle="security">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Bảo mật <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="security hidden">
                    <td>Bảo mật hệ thống</td>
                    <td>Windows Hello</td>
                </tr>

                <!-- Mục Thông tin sản phẩm -->
                <tr class="section-title" data-toggle="product-info">
                    <td colspan="2" style="font-weight: bold; cursor: pointer;">
                        Thông tin sản phẩm <span class="arrow" data-direction="down">▼</span>
                    </td>
                </tr>
                <tr class="product-info hidden">
                    <td>Mã sản phẩm</td>
                    <td>${productDescription.ProductID}</td>
                </tr>
                <tr class="product-info hidden">
                    <td>Thời gian bảo hành</td>
                    <td>${productDescription.WarrantyPeriodMonths} tháng</td>
                </tr>
                <tr class="product-info hidden">
                    <td>Màu sắc</td>
                    <td>${productDescription.Color}</td>
                </tr>
            `;
  }
});

 // Hàm để hiển thị thông số nổi bật
        function showHighlightSpecs() {
            console.log("showHighlightSpecs called"); // Ghi log khi gọi hàm
            document.getElementById('highlight-specs').classList.remove('hidden');
            document.getElementById('all-specs').classList.add('hidden');
            document.getElementById('highlight-btn').classList.add('active');
            document.getElementById('all-spec-btn').classList.remove('active');
        }

        // Hàm để hiển thị tất cả thông số
        function showAllSpecs() {
            console.log("showAllSpecs called"); // Ghi log khi gọi hàm
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
          showHighlightSpecs(); // Gọi hàm để hiển thị thông số nổi bật
        });

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
        


