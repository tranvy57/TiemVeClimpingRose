package vn.edu.iuh.fit.climpingrose.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
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
import vn.edu.iuh.fit.climpingrose.repositories.CartItemRepository;
import vn.edu.iuh.fit.climpingrose.repositories.OrderItemRepository;
import vn.edu.iuh.fit.climpingrose.repositories.OrderRepository;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;
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
    private UserUtils userUtils;
    private OrderMapper orderMapper;
    private OrderItemMapper orderItemMapper;


    private boolean isRemoteArea(String address) {
        String normalized = address.toLowerCase();
        return normalized.contains("okinawa") || normalized.contains("hokkaido");
    }
    
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = userUtils.getUserLogin();

        // Lấy cartItems từ DB
        List<String> cartItemIds = request.getCartItemIds();
        List<CartItem> cartItems = cartItemRepository.findAllById(cartItemIds);

        if (cartItems.size() != cartItemIds.size()) {
            throw new NotFoundException("One or more cart items not found");
        }

        //Kiểm tra cartItem thuộc user hiện tại
        for (CartItem item : cartItems) {
            if (!item.getUser().getUserId().equals(user.getUserId())) {
                throw new BadRequestException("Unauthorized cart item access");
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
                throw new BadRequestException("Invalid quantity for painting: " + painting.getName());
            }

            BigDecimal itemTotal = painting.getPrice().multiply(BigDecimal.valueOf(quantity));
            totalPaintingsPrice = totalPaintingsPrice.add(itemTotal);

            switch (painting.getSize()) {
                case SIZE_20x20 -> count2020 += quantity;
                case SIZE_30x40 -> count3040 += quantity;
                case SIZE_40x50 -> count4050 += quantity;
            }
        }

        BigDecimal deliveryCost = BigDecimal.ZERO;

        if (count4050 > 0 && count4050 < 2) deliveryCost = deliveryCost.add(BigDecimal.valueOf(1500));
        else if (count3040 > 0 && count3040 < 2) deliveryCost = deliveryCost.add(BigDecimal.valueOf(1200));
        else if (count2020 > 0) {
            if (count2020 == 1) deliveryCost = deliveryCost.add(BigDecimal.valueOf(370));
            else if (count2020 <= 3) deliveryCost = deliveryCost.add(BigDecimal.valueOf(520));
            else if (count2020 <= 7) deliveryCost = deliveryCost.add(BigDecimal.valueOf(840));
        }

        if (isRemoteArea(request.getShippingAddress())) {
            deliveryCost = deliveryCost.add(BigDecimal.valueOf(400));
        }

        //  So sánh client gửi
        if (request.getDeliveryCost().compareTo(deliveryCost) != 0) {
            throw new BadRequestException("Delivery cost mismatch");
        }

        if (request.getTotalPaintingsPrice().compareTo(totalPaintingsPrice) != 0) {
            throw new BadRequestException("Total painting price mismatch");
        }

        //  Lưu đơn hàng
        Order order = Order.builder()
                .orderDate(request.getOrderDate())
                .status(OrderStatus.PENDING)
                .deliveryCost(deliveryCost)
                .totalPaintingsPrice(totalPaintingsPrice)
                .shippingAddress(request.getShippingAddress())
                .note(request.getNote())
                .paymentMethod(request.getPaymentMethod())
                .receiverName(request.getReceiverName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .contact(request.getContact())
                .postalCode(request.getPostalCode())
                .user(user)
                .totalPrice(deliveryCost.add(totalPaintingsPrice))
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

        //  Xoá cartItems đã đặt hàng
        cartItemRepository.deleteAll(cartItems);

        // Trả response
        OrderResponse response = orderMapper.toResponse(order);
        response.setOrderItems(orderItemMapper.toReponseList(orderItems));

        return response;
    }

}
