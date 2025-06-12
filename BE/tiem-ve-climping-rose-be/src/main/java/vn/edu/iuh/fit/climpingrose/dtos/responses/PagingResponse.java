package vn.edu.iuh.fit.climpingrose.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagingResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    private boolean last;
}