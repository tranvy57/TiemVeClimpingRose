package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CouponDTO;
import vn.edu.iuh.fit.climpingrose.entities.Coupon;

@Mapper(componentModel = "spring", uses = BaseEntityMapper.class)
public interface CouponMapper {
    public Coupon toEntity(CouponDTO couponDTO);
    public CouponDTO toDto(Coupon coupon);
}
