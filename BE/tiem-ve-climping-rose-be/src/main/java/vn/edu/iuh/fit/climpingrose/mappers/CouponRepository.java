package vn.edu.iuh.fit.climpingrose.mappers;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, String> {
}