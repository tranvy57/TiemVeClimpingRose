package vn.edu.iuh.fit.climpingrose.enums;

import lombok.Getter;

@Getter
public enum AuthProvider {
    GOOGLE("GOOGLE"),
    FACEBOOK("FACEBOOK"),
    LOCAL("LOCAL");

    private final String value;

    private AuthProvider(String value) {
        this.value = value;
    }
}
