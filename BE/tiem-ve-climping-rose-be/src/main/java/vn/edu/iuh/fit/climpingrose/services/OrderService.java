package vn.edu.iuh.fit.climpingrose.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.OrderRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderResponse;
import vn.edu.iuh.fit.climpingrose.entities.Order;
import vn.edu.iuh.fit.climpingrose.entities.OrderItem;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.entities.User;
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
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    private Map<String, Painting> getPaintingsMap(List<CartItemRequest> items) {
        List<String> paintingIds = items.stream()
                .map(CartItemRequest::getPaintingId)
                .distinct()
                .toList();

        List<Painting> paintings = paintingRepository.findAllById(paintingIds);

        if (paintings.size() != paintingIds.size()) {
            throw new NotFoundException("One or more paintings not found");
        }

        return paintings.stream()
                .collect(Collectors.toMap(Painting::getPaintingId, Function.identity()));
    }

    private boolean isRemoteArea(String address) {
        String normalized = address.toLowerCase();
        return normalized.contains("okinawa") || normalized.contains("hokkaido");
    }

    public BigDecimal getDeliveryCost(List<CartItemRequest> items, String shippingAddress) {
        BigDecimal deliveryCost = BigDecimal.ZERO;
        Map<String, Painting> paintingMap = getPaintingsMap(items);

        int count2020 = 0;
        int count3040 = 0;
        int count4050 = 0;

        for (CartItemRequest item : items) {
            Painting p = paintingMap.get(item.getPaintingId());

            if (item.getQuantity() > p.getQuantity() || item.getQuantity() <= 0) {
                throw new BadRequestException("Quantity exceeds maximum quantity");
            }

            switch (p.getSize()) {
                case SIZE_20x20 -> count2020++;
                case SIZE_30x40 -> count3040++;
                case SIZE_40x50 -> count4050++;
            }
        }

        if (count4050 > 0 && count4050 < 2) {
            deliveryCost = deliveryCost.add(BigDecimal.valueOf(1500));
        } else if (count3040 > 0 && count3040 < 2) {
            deliveryCost = deliveryCost.add(BigDecimal.valueOf(1200));
        } else if (count2020 > 0) {
            if (count2020 == 1) {
                deliveryCost = deliveryCost.add(BigDecimal.valueOf(370));
            } else if (count2020 <= 3) {
                deliveryCost = deliveryCost.add(BigDecimal.valueOf(520));
            } else if (count2020 <= 7) {
                deliveryCost = deliveryCost.add(BigDecimal.valueOf(840));
            }
        }

        if (isRemoteArea(shippingAddress)) {
            deliveryCost = deliveryCost.add(BigDecimal.valueOf(400));
        }

        return deliveryCost;
    }



    public BigDecimal getTotalPaintingsPrice(List<CartItemRequest> items) {
        BigDecimal totalPrice = BigDecimal.ZERO;
        Map<String, Painting> paintingMap = getPaintingsMap(items);

        for (CartItemRequest item : items) {
            Painting painting = paintingMap.get(item.getPaintingId());

            if (item.getQuantity() > painting.getQuantity() || item.getQuantity() <= 0) {
                throw new BadRequestException("Invalid quantity for painting ID: " + item.getPaintingId());
            }

            BigDecimal itemTotal = painting.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);
        }

        return totalPrice;
    }


    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        User user = userUtils.getUserLogin();

        List<CartItemRequest> items = request.getOrderItems();
        Map<String, Painting> paintingMap = getPaintingsMap(items);

        BigDecimal deliveryCost = getDeliveryCost(items, request.getShippingAddress());
        if (request.getDeliveryCost().compareTo(deliveryCost) != 0) {
            throw new BadRequestException("Delivery cost mismatch: expected " + deliveryCost + ", but got " + request.getDeliveryCost());
        }

        BigDecimal actualTotalPaintingsPrice = getTotalPaintingsPrice(items);

        if (request.getTotalPaintingsPrice().compareTo(actualTotalPaintingsPrice) != 0) {
            throw new BadRequestException(
                    "Total paintings price mismatch: expected " + actualTotalPaintingsPrice +
                            ", but got " + request.getTotalPaintingsPrice()
            );
        }
        Order order = Order.builder()
                .orderDate(request.getOrderDate())
                .status(OrderStatus.PENDING)
                .deliveryCost(deliveryCost)
                .totalPaintingsPrice(actualTotalPaintingsPrice)
                .shippingAddress(request.getShippingAddress())
                .note(request.getNote())
                .paymentMethod(request.getPaymentMethod())
                .receiverName(request.getReceiverName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .contact(request.getContact())
                .postalCode(request.getPostalCode())
                .user(user)
                .build();

        Order savedOrder = orderRepository.save(order);


        List<OrderItem> orderItems = items.stream().map(ci -> {
            Painting painting = paintingMap.get(ci.getPaintingId());
            return OrderItem.builder()
                    .currentPrice(painting.getPrice())
                    .quantity(ci.getQuantity())
                    .painting(painting)
                    .order(savedOrder)
                    .build();
        }).toList();

        orderItemRepository.saveAll(orderItems);

        OrderResponse orderResponse = orderMapper.toResponse(order);
        orderResponse.setOrderItems(orderItemMapper.toReponseList(orderItems));
        return orderResponse;
    }
}
