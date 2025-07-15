package vn.edu.iuh.fit.climpingrose.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.OrderRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderResponse;
import vn.edu.iuh.fit.climpingrose.entities.*;
import vn.edu.iuh.fit.climpingrose.enums.OrderStatus;
import vn.edu.iuh.fit.climpingrose.enums.PaintingSize;
import vn.edu.iuh.fit.climpingrose.exceptions.BadRequestException;
import vn.edu.iuh.fit.climpingrose.exceptions.NotFoundException;
import vn.edu.iuh.fit.climpingrose.mappers.OrderItemMapper;
import vn.edu.iuh.fit.climpingrose.mappers.OrderMapper;
import vn.edu.iuh.fit.climpingrose.repositories.*;
import vn.edu.iuh.fit.climpingrose.utils.UserUtils;

import java.math.BigDecimal;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private PaintingRepository paintingRepository;
    private CartItemRepository cartItemRepository;
    private OrderItemRepository orderItemRepository;
    private CouponRepository couponRepository;
    private UserUtils userUtils;
    private OrderMapper orderMapper;
    private OrderItemMapper orderItemMapper;


    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = userUtils.getUserLogin();

        // Lấy cartItems từ DB
        List<String> cartItemIds = request.getCartItemIds();
        List<CartItem> cartItems = cartItemRepository.findAllById(cartItemIds);

        if (cartItems.size() != cartItemIds.size()) {
            throw new NotFoundException("Một hoặc nhiều cart Item không tồn tại");
        }

        //Kiểm tra cartItem thuộc user hiện tại
        for (CartItem item : cartItems) {
            if (!item.getUser().getUserId().equals(user.getUserId())) {
                throw new BadRequestException("Bạn không có quyền truy cập vào cartItem này");
            }
        }

        for (CartItem item : cartItems) {
            Painting painting = item.getPainting();
            int quantity = item.getQuantity();

            if (quantity <= 0 || quantity > painting.getQuantity()) {
                throw new BadRequestException("Số lượng vượt quá tồn kho: " + painting.getName());
            }
        }

        // Tính giá và delivery cost
        BigDecimal totalPaintingsPrice = BigDecimal.ZERO;
        int count2020 = 0, count3040 = 0, count4050 = 0;

        for (CartItem item : cartItems) {
            Painting painting = item.getPainting();
            int quantity = item.getQuantity();

            if (quantity <= 0 || quantity > painting.getQuantity()) {
                throw new BadRequestException("Số lượng trong kho không đủ: " + painting.getName());
            }

            BigDecimal itemTotal = painting.getPrice().multiply(BigDecimal.valueOf(quantity));
            totalPaintingsPrice = totalPaintingsPrice.add(itemTotal);

            switch (painting.getSize()) {
                case SIZE_20x20 -> count2020 += quantity;
                case SIZE_30x40 -> count3040 += quantity;
                case SIZE_40x50 -> count4050 += quantity;
            }
        }

        BigDecimal deliveryCost = calculateShipping(cartItems, request.getPrefecture());


        //  So sánh client gửi
        if (request.getDeliveryCost().compareTo(deliveryCost) != 0) {
            throw new BadRequestException("Delivery cost mismatch");
        }

        if (request.getTotalPaintingsPrice().compareTo(totalPaintingsPrice) != 0) {
            throw new BadRequestException("Total painting price mismatch");
        }

        String couponCode = request.getCouponCode();


        BigDecimal discountPercentage = BigDecimal.ZERO;
        Coupon coupon = couponRepository.getByCode(couponCode);
        if(coupon !=null )
        {
            if ( !isCouponValid(couponCode, cartItems, totalPaintingsPrice)) {
                throw new BadRequestException("Mã giảm giá không hợp lệ");
            } else discountPercentage = discountPercentage.add(coupon.getDiscountPercentage());
        }


        //  Lưu đơn hàng
        Order order = Order.builder()
                .orderDate(request.getOrderDate())
                .status(OrderStatus.PENDING)
                .deliveryCost(deliveryCost)
                .totalPaintingsPrice(totalPaintingsPrice)
                .discount(discountPercentage)
                .totalPrice(deliveryCost.add(totalPaintingsPrice).subtract(discountPercentage))
                .note(request.getNote())
                .paymentMethod(request.getPaymentMethod())
                .receiverName(request.getReceiverName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .contact(request.getContact())
                .postalCode(request.getPostalCode())
                .user(user)
                .zipCode(request.getZipCode())
                .prefecture(request.getPrefecture())
                .city(request.getCity())
                .town(request.getTown())
                .addressDetail(request.getAddressDetail())
                .build();

        Order savedOrder = orderRepository.save(order);

        // 6. Tạo OrderItem từ CartItem
        List<OrderItem> orderItems = cartItems.stream().map(cartItem ->
                OrderItem.builder()
                        .painting(cartItem.getPainting())
                        .quantity(cartItem.getQuantity())
                        .currentPrice(cartItem.getPainting().getPrice())
                        .order(savedOrder)
                        .build()
        ).toList();

        orderItemRepository.saveAll(orderItems);

        // Giảm số lượng tranh sau khi đặt hàng
        for (CartItem item : cartItems) {
            Painting painting = item.getPainting();
            int newQuantity = painting.getQuantity() - item.getQuantity();
            painting.setQuantity(newQuantity);
        }
        paintingRepository.saveAll(cartItems.stream()
                .map(CartItem::getPainting)
                .distinct()
                .toList());

        //  Xoá cartItems đã đặt hàng
        cartItemRepository.deleteAll(cartItems);


        // Trả response
        OrderResponse response = orderMapper.toResponse(order);
        response.setOrderItems(orderItemMapper.toReponseList(orderItems));

        return response;
    }

    private BigDecimal calculateShipping(List<CartItem> cartItems, String prefecture) {
        boolean allAre20x20 = true;
        int count2020 = 0;

        int maxLength = 0;
        int maxWidth = 0;
        int totalThickness = 0;

        for (CartItem item : cartItems) {
            PaintingSize sizeEnum = item.getPainting().getSize();
            SizeInfo size = getSize(sizeEnum);
            int quantity = item.getQuantity();

            if (sizeEnum != PaintingSize.SIZE_20x20) {
                allAre20x20 = false;
            } else {
                count2020 += quantity;
            }

            maxLength = Math.max(maxLength, size.length());
            maxWidth = Math.max(maxWidth, size.width());
            totalThickness += size.thickness() * quantity;
        }

        int shipping;

        if (allAre20x20) {
            if (count2020 == 1) {
                shipping = 430;
            } else if (count2020 <= 3) {
                shipping = 600;
            } else {
                // quá 3 tranh → tính theo tổng kích thước
                int totalSize = maxLength + maxWidth + totalThickness;

                if (totalSize <= 60) {
                    shipping = 840;
                } else if (totalSize <= 80) {
                    shipping = 1200;
                } else if (totalSize <= 100) {
                    shipping = 1500;
                } else {
                    throw new BadRequestException("Tổng kích thước kiện hàng vượt quá giới hạn");
                }
            }
        } else {
            // Tranh hỗn hợp → tính kiện theo tổng size
            int totalSize = maxLength + maxWidth + totalThickness;

            if (totalSize <= 60) {
                shipping = 840;
            } else if (totalSize <= 80) {
                shipping = 1200;
            } else if (totalSize <= 100) {
                shipping = 1500;
            } else {
                throw new BadRequestException("Tổng kích thước kiện hàng vượt quá giới hạn");
            }
        }

        // Phụ phí vùng xa
        if (isRemoteArea(prefecture)) {
            shipping += 400;
        }

        return BigDecimal.valueOf(shipping);
    }



    private SizeInfo getSize(PaintingSize size) {
        return switch (size) {
            case SIZE_20x20 -> new SizeInfo(20, 20, 2);
            case SIZE_30x40 -> new SizeInfo(40, 30, 2);
            case SIZE_40x50 -> new SizeInfo(50, 40, 3);
            default -> throw new BadRequestException("Kích thước tranh không hỗ trợ: " + size);
        };
    }

    private boolean isCouponValid(String couponCode, List<CartItem> cartItems, BigDecimal totalPaintingsPrice) {
        if (couponCode == null || couponCode.isBlank()) return false;

        switch (couponCode.trim()) {
            case "CPR300":
                // Hợp lệ nếu có ít nhất 1 tranh size 30x40
                return cartItems.stream().anyMatch(item ->
                        item.getPainting().getSize() == PaintingSize.SIZE_30x40
                );

            case "CPR500":
                // Hợp lệ nếu có ít nhất 1 tranh size 40X50
                return cartItems.stream().anyMatch(item ->
                        item.getPainting().getSize() == PaintingSize.SIZE_40x50
                );

            case "CPRFREESHIP":
                // Hợp lệ nếu có > 10 tranh size 20x20 hoặc tổng giá ≥ 9000
                int count2020 = cartItems.stream()
                        .filter(item -> item.getPainting().getSize() == PaintingSize.SIZE_20x20)
                        .mapToInt(CartItem::getQuantity)
                        .sum();

                return count2020 > 10 || totalPaintingsPrice.compareTo(new BigDecimal("9000")) >= 0;

            default:
                return false;
        }
    }




    private boolean isRemoteArea(String prefecture) {
        return prefecture.contains("沖縄") ||     // Okinawa
                prefecture.contains("北海道") ||   // Hokkaido
                prefecture.contains("長崎") ||     // Nagasaki
                prefecture.contains("大分");       // Oita
    }
    private record SizeInfo(int length, int width, int thickness) {}


    public List<OrderResponse> getMyOrders(){
        User user = userUtils.getUserLogin();


        List<Order> orders = orderRepository.findOrdersByUserOrderByOrderDateAsc(user);

        return orderMapper.toListOrderResponse(orders);
    }
}
