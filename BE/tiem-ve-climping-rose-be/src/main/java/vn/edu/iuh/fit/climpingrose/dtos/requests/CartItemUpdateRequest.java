package vn.edu.iuh.fit.climpingrose.dtos.requests;

import lombok.Data;

@Data
public class CartItemUpdateRequest {
    private String cartItemId;
    private int quantity;
}
