package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class TestDto {
    private String name;
    private String description;
}
