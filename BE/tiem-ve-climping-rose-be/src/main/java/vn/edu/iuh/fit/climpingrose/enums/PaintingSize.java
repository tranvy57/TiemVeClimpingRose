package vn.edu.iuh.fit.climpingrose.enums;

import lombok.Getter;

@Getter
public enum PaintingSize {
    SIZE_20x20("20x20"),
    SIZE_34x30("30x40"),
    SIZE_40x50("40x50");

    private final String size;

    PaintingSize(String size) {
        this.size = size;
    }

}
