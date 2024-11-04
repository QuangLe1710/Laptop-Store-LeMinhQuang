-- Xóa cơ sở dữ liệu nếu tồn tại và tạo mới
-- DROP DATABASE IF EXISTS LaptopStore1;
CREATE DATABASE IF NOT EXISTS LaptopStore;
USE LaptopStore;

-- CMM Sáng ngu vcl 
-- Tài ngu vai l 
-- dcm Quang suc vat
-- Tạo bảng Users trước
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    PhoneNumber VARCHAR(15),
    UserType ENUM('customer', 'admin') NOT NULL, -- Loại người dùng
    RegistrationDate DATE NOT NULL,
    INDEX idx_email (Email) -- Chỉ mục cho cột Email để tăng hiệu suất tìm kiếm
);

-- Tạo bảng Cart
DROP TABLE IF EXISTS Cart;
CREATE TABLE Cart (
    CartID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT UNIQUE, -- Mỗi khách hàng chỉ có 1 giỏ hàng (1-1)
    Status ENUM('active', 'checked out') DEFAULT 'active',
    CreatedDate DATE NOT NULL,
    TotalPrice DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Users(UserID) ON DELETE CASCADE -- Khóa ngoại tham chiếu tới Users
);

-- Tạo bảng Customers với khóa ngoại tham chiếu tới bảng Cart
DROP TABLE IF EXISTS Customers; 
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Address VARCHAR(255),
    City VARCHAR(50),
    District VARCHAR(50),
    Ward VARCHAR(50),
    StreetAddress VARCHAR(100),
    RegistrationDate DATE NOT NULL,
    Status ENUM('active', 'suspended', 'locked') DEFAULT 'active',
    cart_CartID INT, -- Tham chiếu đến giỏ hàng của khách hàng
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (cart_CartID) REFERENCES Cart(CartID) ON DELETE CASCADE -- Khóa ngoại tới bảng Cart
);



-- Tạo bảng Admins
DROP TABLE IF EXISTS Admins;
CREATE TABLE Admins (
    AdminID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    CreatedDate DATE NOT NULL,
    Status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE -- Xóa admin khi user bị xóa
);

-- Tạo bảng Suppliers
DROP TABLE IF EXISTS Suppliers;
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierName VARCHAR(100) NOT NULL,
    Address VARCHAR(255),
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    TaxCode VARCHAR(50),
    Website VARCHAR(100),
    Representative VARCHAR(100),
    PartnershipStartDate DATE,
    Status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Tạo bảng Products
DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierID INT,
    ProductName VARCHAR(100) NOT NULL,
    Brand VARCHAR(50),
    Model VARCHAR(50),
    Price FLOAT NOT NULL,
    StockQuantity INT NOT NULL,
    ReleaseDate DATE,
    WarrantyPeriod INT, -- Warranty period in months
    ImageURL VARCHAR(255),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

-- https://fptshop.com.vn/so-sanh-san-pham?sp=may-tinh-xach-tay%2Flenovo-ideapad-3-14iah8-i5-12450h%3Fsku%3D00898312-vs-may-tinh-xach-tay%2Fhp-15-fd0235tu-i5-1334u%3Fsku%3D00906462-vs-may-tinh-xach-tay%2Facer-nitro-5-tiger-gaming-an515-58-773y-i7-12700h%3Fsku%3D00910749
CREATE TABLE ProductDescription (
	ProductDescriptionID INT, 
	ProductID INT,
	CPUcompany VARCHAR(255),  -- Tên công ty sản xuất CPU
	CPUtechnology VARCHAR(255),  -- Công nghệ của CPU (ví dụ: Intel Core i7, AMD Ryzen 5)
	CPUtype VARCHAR(255),  -- Loại CPU (ví dụ: Intel Core i7-12700K)
	MinimumCPUspeed DECIMAL(4,2),  -- Tốc độ tối thiểu của CPU (ví dụ: 2.5 GHz)
	MaximunSpeed DECIMAL(4,2),  -- Tốc độ tối đa của CPU (ví dụ: 5.0 GHz)
	Multiplier INT,  -- Hệ số nhân của CPU
	ProcessorCache VARCHAR(255),  -- Dung lượng bộ nhớ cache của CPU (ví dụ: 16 MB)
	BrandCardOboard VARCHAR(255),  -- Thương hiệu bo mạch chủ
	ModelCardOboard VARCHAR(255),  -- Model bo mạch chủ
	FullNameCardOboard VARCHAR(255),  -- Tên đầy đủ bo mạch chủ
	VGABrand VARCHAR(255),  -- Thương hiệu card đồ họa
	VGAFullName VARCHAR(255),  -- Tên đầy đủ card đồ họa
    RAMcapacity INT,  -- Dung lượng RAM (GB)
	RAMType VARCHAR(255),  -- Loại RAM (ví dụ: DDR4, DDR5)
	RAMspeed VARCHAR(255),  -- Tốc độ RAM (ví dụ: 3200 MHz)
	NumberOfRemovableSlots INT,  -- Số lượng khe RAM có thể tháo rời
	NumberOfOnboardRAM INT,  -- Số lượng khe RAM tích hợp
	MaximumRAMSupport INT,  -- Dung lượng RAM tối đa hỗ trợ
	HardDriveType VARCHAR(255),  -- Loại ổ cứng (ví dụ: HDD, SSD)
	TotalSSDHDDSlots INT,  -- Tổng số khe ổ cứng
	NumberOfSSDHDDSlotsRemaining INT,  -- Số lượng khe ổ cứng còn trống
	MaximumHardDriveUpgradeCapacity INT,  -- Dung lượng ổ cứng nâng cấp tối đa (TB)
	SSDType VARCHAR(255),  -- Loại SSD (ví dụ: NVMe, SATA)
	Capacity INT,  -- Dung lượng ổ cứng (GB)
	ScreenSize VARCHAR(250),  -- Kích thước màn hình (inch)
	DisplayTechnology VARCHAR(255),  -- Công nghệ màn hình (ví dụ: IPS, TN, VA)
	Resolution VARCHAR(255),  -- Độ phân giải màn hình (ví dụ: 1920x1080)
	ScreenType VARCHAR(255),  -- Loại màn hình (ví dụ: Màn hình LCD, Màn hình cảm ứng)
	ScanningFrequency DECIMAL(4,2),  -- Tần số quét (Hz)
	BasePlate VARCHAR(255),  -- Loại mặt đế (ví dụ: Kim loại, Nhựa)
	Brightness INT,  -- Độ sáng (cd/m2)
	ColorCoverage VARCHAR(255),  -- Độ bao phủ màu sắc (ví dụ: 99% sRGB)
	ScreenRatio DECIMAL(4,2),  -- Tỷ lệ màn hình (ví dụ: 16:9)
	CommunicationPort VARCHAR(255),  -- Cổng kết nối (ví dụ: USB, HDMI, LAN)
	Wifi VARCHAR(255),  -- Chuẩn Wifi (ví dụ: Wi-Fi 6)
	Bluetooth VARCHAR(255),  -- Phiên bản Bluetooth (ví dụ: Bluetooth 5.0)
	Webcam VARCHAR(255),  -- Độ phân giải webcam (ví dụ: 720p)
	OS VARCHAR(255),  -- Hệ điều hành (ví dụ: Windows 10)
	Version VARCHAR(255),  -- Phiên bản hệ điều hành
	Security VARCHAR(255),  -- Các tính năng bảo mật (ví dụ: Windows Hello)
	KeyboardType VARCHAR(255),  -- Loại bàn phím (ví dụ: Bàn phím cơ)
	NumericKeypad BOOLEAN,  -- Có bàn phím số hay không (true/false)
	KeyboardLight VARCHAR(255),  -- Loại đèn bàn phím (ví dụ: RGB)
	TouchPad VARCHAR(255),  -- Loại touchpad (ví dụ: Precision Touchpad)
	BatteryType VARCHAR(255),  -- Loại pin (ví dụ: Lithium-ion)
	BatteryCapacity INT,  -- Dung lượng pin (mAh)
	PowerSupply VARCHAR(255),  -- Công suất nguồn (W)
	AccessoriesInTheBox TEXT,  -- Phụ kiện đi kèm
	Size VARCHAR(255),  -- Kích thước sản phẩm (cm)    
	ProductWeight DECIMAL(4,2),  -- Trọng lượng sản phẩm (kg)
	Material VARCHAR(255),  -- Chất liệu sản phẩm
	PN VARCHAR(255),  -- Mã sản phẩm
	Origin VARCHAR(255),  -- Xuất xứ
	ReleaseDate DATE,  -- Ngày phát hành
	WarrantyPeriodMonths INT,  -- Thời hạn bảo hành (tháng)
	StorageInstructions TEXT,  -- Hướng dẫn bảo quản
	UserManual TEXT,  -- Hướng dẫn sử dụng
	Color VARCHAR(255) ,  -- Màu sắc sản phẩm
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


-- Tạo bảng PaymentMethods
DROP TABLE IF EXISTS PaymentMethods;
CREATE TABLE PaymentMethods (
    PaymentMethodID INT PRIMARY KEY AUTO_INCREMENT,
    PaymentType ENUM('Credit Card', 'Bank Transfer', 'E-wallet') NOT NULL,
    BankBrandName VARCHAR(100),
    Status ENUM('active', 'inactive') DEFAULT 'active',
    CreatedDate DATE NOT NULL
);

-- Tạo bảng Orders
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    ShippingFee DECIMAL(10, 2),
    PaymentMethodID INT,
    OrderStatus ENUM('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled') NOT NULL,
    ShippingAddress VARCHAR(255),
    City VARCHAR(50),
    District VARCHAR(50),
    Ward VARCHAR(50),
    StreetAddress VARCHAR(100),
    EstimatedDeliveryDate DATE,
    ActualDeliveryDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID) ON DELETE CASCADE,
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethods(PaymentMethodID)
);

-- Tạo bảng OrderDetails
DROP TABLE IF EXISTS OrderDetails;
CREATE TABLE OrderDetails (
    OrderDetailsID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    LineTotal DECIMAL(10, 2) GENERATED ALWAYS AS (Quantity * Price) STORED,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Tạo bảng CartDetails
DROP TABLE IF EXISTS CartDetails;
CREATE TABLE CartDetails (
    CartDetailsID INT PRIMARY KEY AUTO_INCREMENT,
    CartID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    LineTotal DECIMAL(10, 2) GENERATED ALWAYS AS (Quantity * Price) STORED,
    FOREIGN KEY (CartID) REFERENCES Cart(CartID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- Tạo bảng ProductReviews
DROP TABLE IF EXISTS ProductReviews;
CREATE TABLE ProductReviews (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    ProductID INT,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    ReviewContent TEXT,
    ReviewDate DATE NOT NULL,
    Status ENUM('approved', 'pending') DEFAULT 'pending',
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


-- Thêm dữ liệu mẫu vào bảng Users (4 khách hàng, 1 admin)
INSERT INTO Users (FullName, Email, Password, PhoneNumber, UserType, RegistrationDate)
VALUES 
('John Doe', 'johndoe@example.com', 'password123', '1234567890', 'customer', CURDATE()),
('Jane Smith', 'janesmith@example.com', 'password456', '0987654321', 'customer', CURDATE()),
('Alice Johnson', 'alicej@example.com', 'password789', '1112223333', 'customer', CURDATE()),
('Bob Brown', 'bobbrown@example.com', 'password321', '4445556666', 'customer', CURDATE()),
('Admin User', 'admin@example.com', 'adminpass', '7778889999', 'admin', CURDATE());

-- Thêm khách hàng vào bảng Customers
INSERT INTO Customers (UserID, Address, City, District, Ward, StreetAddress, RegistrationDate)
VALUES 
(1, '123 Main St', 'Hanoi', 'Dong Da', 'Ward 1', '123 Street A', CURDATE()),
(2, '456 Secondary Rd', 'Ho Chi Minh City', 'District 1', 'Ward 5', '456 Street B', CURDATE()),
(3, '789 Tertiary Ave', 'Da Nang', 'Hai Chau', 'Ward 7', '789 Street C', CURDATE()),
(4, '101 Quaternary Blvd', 'Can Tho', 'Ninh Kieu', 'Ward 10', '101 Street D', CURDATE());

-- Thêm nhà cung cấp vào bảng Suppliers
INSERT INTO Suppliers (SupplierName, Address, PhoneNumber, Email, TaxCode, Website, Representative, PartnershipStartDate)
VALUES 
('ABC Electronics', '456 Supplier Rd', '0123456789', 'contact@abc.com', '123456789', 'www.abcelectronics.com', 'Mr. ABC', CURDATE()),
('XYZ Tech', '789 Tech Blvd', '0987654321', 'info@xyztech.com', '987654321', 'www.xyztech.com', 'Ms. XYZ', CURDATE());

-- Thêm sản phẩm vào bảng Products
INSERT INTO Products (SupplierID, ProductName, Brand, Model, Price, StockQuantity, ReleaseDate, WarrantyPeriod, ImageURL)
VALUES 
(1, 'Laptop ABC Pro', 'ABC Brand', 'ABC123', 1500.00, 20, CURDATE(), 24, 'https://example.com/laptopabcpro.jpg'),
(2, 'Laptop XYZ Ultra', 'XYZ Brand', 'XYZ789', 2000.00, 15,  CURDATE(), 36, 'https://example.com/laptopxyzultra.jpg'),
(2, 'Laptop XYZ Basic', 'XYZ Brand', 'XYZ456', 1000.00, 30, CURDATE(), 12, 'https://example.com/laptopxyzbasic.jpg');

-- Thêm phương thức thanh toán vào bảng PaymentMethods
INSERT INTO PaymentMethods (PaymentType, BankBrandName, Status, CreatedDate)
VALUES 
('Credit Card', 'Vietcombank', 'active', CURDATE()),
('Bank Transfer', 'Techcombank', 'active', CURDATE()),
('E-wallet', 'Momo', 'active', CURDATE());

-- Thêm đơn hàng mẫu vào bảng Orders
INSERT INTO Orders (CustomerID, OrderDate, TotalAmount, ShippingFee, PaymentMethodID, OrderStatus, ShippingAddress, City, District, Ward, StreetAddress, EstimatedDeliveryDate)
VALUES 
(1, CURDATE(), 1550.00, 50.00, 1, 'Pending', '123 Main St', 'Hanoi', 'Dong Da', 'Ward 1', '123 Street A', CURDATE() + INTERVAL 3 DAY),
(2, CURDATE(), 2050.00, 50.00, 2, 'Confirmed', '456 Secondary Rd', 'Ho Chi Minh City', 'District 1', 'Ward 5', '456 Street B', CURDATE() + INTERVAL 3 DAY);

-- Thêm chi tiết đơn hàng vào bảng OrderDetails
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
VALUES 
(1, 1, 1, 1500.00),
(2, 2, 1, 2000.00);


