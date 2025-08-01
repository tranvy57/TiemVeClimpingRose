# 🖼️ Tiệm Vẽ Climping Rose - Tiệm tranh số hóa tại Nhật 🎎

Đây là dự án xây dựng website thương mại điện tử dành cho **Tiệm Vẽ Climping Rose**, chuyên bán các **tranh số hóa** (digital paintings) tại Nhật cho người Việt Nam, ship trên toàn quốc, kèm chức năng đặt hàng, thanh toán, mã giảm giá, và quản lý đơn hàng.

---

## 🛠️ Công nghệ sử dụng

### 🔧 Backend (Spring Boot)

- Java 17+
- Spring Boot 3+
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- PostgreSQL
- Redis (token, cache)
- Cloudinary (lưu ảnh)
- Swagger (tài liệu API)
- Docker
- Nginx

### 🎨 Frontend (Next.js + React)

- Next.js (App Router)
- Redux Toolkit
- TailwindCSS
- Swiper.js (carousel)
- Toastify, Zod (validate form)
- Lucide Icons

---

## 🌟 Các tính năng chính

### 🧾 Đặt hàng & giỏ hàng

- Thêm, xoá, cập nhật sản phẩm trong giỏ hàng
- Tính tổng tiền, phí vận chuyển
- Thanh toán
- Mã giảm giá (coupon)
- Lưu thông tin người nhận

### 👩‍🎨 Quản lý tranh & phân loại

- Xem các tranh theo bộ sưu tập
- Lọc theo kích thước (20x20, 30x40,...)
- Hiển thị banner, quảng bá khuyến mãi

### 🔐 Xác thực & phân quyền

- Đăng nhập / Đăng ký
- Đăng nhập bằng Google / Facebook
- Phân quyền Admin / Khách hàng
- Token JWT + Refresh Token

### 🧑‍💼 Admin dashboard

- Quản lý đơn hàng
- Quản lý sản phẩm tranh
- Quản lý mã giảm giá
- Xem doanh thu theo thời gian

---
