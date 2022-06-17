import { Component, OnInit } from '@angular/core';
import { Coupon } from '../../models/coupon.model';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[] = [];
  
  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.couponService.getCoupons().subscribe((ret: any) => {
      console.log(ret);
      this.coupons = ret;
    });

  }

}
