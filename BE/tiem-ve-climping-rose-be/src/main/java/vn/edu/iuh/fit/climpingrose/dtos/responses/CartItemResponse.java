package vn.edu.iuh.fit.climpingrose.dtos.responses;
import lombok.Data;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingResponse;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

@Data
public class CartItemResponse {
    String cartItemId;
    int quantity;
    PaintingResponse painting;
}
