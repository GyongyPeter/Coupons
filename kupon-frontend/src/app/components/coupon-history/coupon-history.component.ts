import { Component, OnInit } from '@angular/core';
import { ActivatedCoupon } from '../../models/activatedCoupon.model';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupon-history',
  templateUrl: './coupon-history.component.html',
  styleUrls: ['./coupon-history.component.css']
})
export class CouponHistoryComponent implements OnInit {

  activatedCoupons: ActivatedCoupon[] = [];

  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.couponService.getCouponHistory().subscribe((ret: any) => {
      this.activatedCoupons = ret;
    });
  }

}
