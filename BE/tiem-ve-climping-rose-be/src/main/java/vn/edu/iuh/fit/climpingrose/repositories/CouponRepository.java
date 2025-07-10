package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.Coupon;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, String> {
    Coupon getByCode(String code);
}