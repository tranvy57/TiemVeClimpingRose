package vn.edu.iuh.fit.climpingrose.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private static final String TOKEN_KEY_PREFIX = "invalidated_token:";

    public void saveInvalidatedToken(String tokenId, String token) {
        redisTemplate.opsForValue().set(TOKEN_KEY_PREFIX + tokenId, token);
    }
    public boolean isTokenInvalidated(String tokenId) {
        return redisTemplate.hasKey(TOKEN_KEY_PREFIX + tokenId);
    }

    //otp email
    private static final long OTP_EXPIRE_SECONDS = 300; // 5 phút

    public void saveOtp(String email, String otpCode) {
        redisTemplate.opsForValue().set("OTP" + email, otpCode, OTP_EXPIRE_SECONDS, TimeUnit.SECONDS);
    }

    public String getOtp(String email) {
        String key = "OTP" + email;
        System.out.println("🔍 Đang lấy OTP với key: " + key);
        System.out.println(redisTemplate.opsForValue().get("vy"));
        return redisTemplate.opsForValue().get(key);

    }

    public void deleteOtp(String email) {
        redisTemplate.delete("OTP:" + email);
    }

    //    Giới hạn Gửi OTP mail mỗi 1 giờ 1 lầm quên mật khẩu tránh spam
    // Lưu timestamp (đơn vị milliseconds) có thời hạn
    public void setLong(String key, Long value, long duration, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value.toString(), duration, unit);
    }

    // Lấy timestamp (đã lưu dưới dạng chuỗi số)
    public Long getLong(String key) {
        String value = redisTemplate.opsForValue().get(key);
        return value != null ? Long.parseLong(value) : null;
    }
}
