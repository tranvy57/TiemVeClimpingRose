package vn.edu.iuh.fit.climpingrose.dtos.requests;

import lombok.Data;

@Data
public class CartItemRequest {
    int quantity;
    String paintingId;
}