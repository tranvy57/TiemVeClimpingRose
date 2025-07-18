package vn.edu.iuh.fit.climpingrose.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CouponDTO;
import vn.edu.iuh.fit.climpingrose.entities.Coupon;
import vn.edu.iuh.fit.climpingrose.exceptions.NotFoundException;
import vn.edu.iuh.fit.climpingrose.mappers.CouponMapper;
import vn.edu.iuh.fit.climpingrose.repositories.CouponRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;
    private final CouponMapper couponMapper;

    public List<CouponDTO> getAllCouponActive(){
        List<Coupon> coupons = couponRepository.findAll();
        return coupons.stream().map(couponMapper::toDto)
                .collect(Collectors.toList());
    }

    public CouponDTO createCoupon(CouponDTO couponDTO) {
        Coupon coupon = couponMapper.toEntity(couponDTO);
        return couponMapper.toDto(couponRepository.save(coupon));
    }

    public CouponDTO getByCode(String code){
        Coupon coupon = couponRepository.findByCode(code);
        if(coupon == null){
            throw new NotFoundException("Coupon không tồn tại");
        }
        return couponMapper.toDto(coupon);
    }


}
