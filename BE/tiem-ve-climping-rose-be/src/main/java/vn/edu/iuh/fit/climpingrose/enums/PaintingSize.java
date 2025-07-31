package vn.edu.iuh.fit.climpingrose.enums;

import lombok.Getter;

@Getter
public enum PaintingSize {
    SIZE_20x20("20x20"),
    SIZE_30x40("30x40"),
    SIZE_40x50("40x50"),
    SIZE_ART_SUPPLIES("ART_SUPPLIES");
    private final String size;
    PaintingSize(String size) {
        this.size = size;
    }

}
