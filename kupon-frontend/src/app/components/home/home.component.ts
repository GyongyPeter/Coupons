import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { Coupon } from '../../models/coupon.model';
import { CompanyService } from '../../services/company.service';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  static NEXT_COUPON_CAN_ACTIVATE_IN_SECONDS: number = 100;

  coupons: Coupon[] = [];
  companies: Company[] = [];

  htmlSelector: HTMLSelectElement;
  htmlCardLink: HTMLDivElement;
  htmlCardStatic: HTMLDivElement;
  htmlCardDynamic: HTMLDivElement;
  htmlButtonLink: HTMLLinkElement;
  htmlButtonStatic: HTMLButtonElement;
  htmlButtonDynamic: HTMLButtonElement;

  isCompanyInfoHidden = true;
  selectedCompany?: Company;
  currentCoupon?: Coupon;

  price: number = 10000;
  priceWithDiscount?: number;

  isCouponActivatedBefore: boolean = false;
  remainingSecondsUntilNextActivation?: number;

  constructor(private couponService: CouponService, private companyService: CompanyService) {
    this.htmlSelector = document.getElementById('company-selector') as HTMLSelectElement;
    this.htmlCardLink = document.getElementById('card-link') as HTMLDivElement;
    this.htmlCardStatic = document.getElementById('card-static') as HTMLDivElement;
    this.htmlCardDynamic = document.getElementById('card-dynamic') as HTMLDivElement;
    this.htmlButtonLink = document.getElementById('link-activate-button') as HTMLLinkElement;
    this.htmlButtonStatic = document.getElementById('static-activate-button') as HTMLButtonElement;
    this.htmlButtonDynamic = document.getElementById('dynamic-activate-button') as HTMLButtonElement;
  }

  get static() {
    return HomeComponent.NEXT_COUPON_CAN_ACTIVATE_IN_SECONDS;
  }

  selectCompany(e: EventTarget | null): void {
    this.priceWithDiscount = undefined;
    this.htmlButtonStatic.hidden = false;
    this.isCouponActivatedBefore = false;

    // @ts-ignore
    const selectedCompanyId = e?.value;
    if (selectedCompanyId) {
      this.isCompanyInfoHidden = false;
      this.selectedCompany = this.companies.find((company) => { return company._id === selectedCompanyId });
      
      this.currentCoupon = this.coupons.find((coupon) => { return this.selectedCompany?._id === coupon.companyId });
      if (this.currentCoupon) {
        switch (this.currentCoupon.couponType) {
          case 'link':
            this.htmlCardLink?.classList.remove('disabled-card');
            this.htmlCardStatic?.classList.add('disabled-card');
            this.htmlCardDynamic?.classList.add('disabled-card');

            this.htmlButtonLink.classList.remove('disabled');
            this.htmlButtonStatic.classList.add('disabled');
            this.htmlButtonDynamic.classList.add('disabled');
            break;
          case 'static':
            this.htmlCardStatic?.classList.remove('disabled-card');
            this.htmlCardLink?.classList.add('disabled-card');
            this.htmlCardDynamic?.classList.add('disabled-card');

            this.htmlButtonStatic.classList.remove('disabled');
            this.htmlButtonLink.classList.add('disabled');
            this.htmlButtonDynamic.classList.add('disabled');
            break;
          case 'dynamic':
          default:
            this.htmlCardDynamic.classList.remove('disabled-card');
            this.htmlCardLink.classList.add('disabled-card');
            this.htmlCardStatic.classList.add('disabled-card');

            this.htmlButtonStatic.classList.add('disabled');
            this.htmlButtonLink.classList.add('disabled');
            this.htmlButtonDynamic.classList.remove('disabled');
            break;
        }
      }
    } else {
      this.isCompanyInfoHidden = true;

      this.htmlCardDynamic.classList.remove('disabled-card');
      this.htmlCardLink.classList.remove('disabled-card');
      this.htmlCardStatic.classList.remove('disabled-card');

      this.htmlButtonStatic.classList.remove('disabled');
      this.htmlButtonLink.classList.remove('disabled');
      this.htmlButtonDynamic.classList.remove('disabled');
    }
  }

  activateCoupon(coupon: Coupon): void {
    this.isCouponActivatedBefore = false;
    let lastActivatedSameCoupon;
    this.couponService.getLastActivatedSameCoupon(coupon).subscribe((ret: any) => {
      lastActivatedSameCoupon = ret;

      const dateOflastActivatedSameCoupon = new Date(lastActivatedSameCoupon.createdAt).getTime();
      const dateNow = new Date(Date.now()).getTime();

      const diffBetweenTwoDatesInSeconds = Math.round((dateNow - dateOflastActivatedSameCoupon) / 1000);

      if (diffBetweenTwoDatesInSeconds > HomeComponent.NEXT_COUPON_CAN_ACTIVATE_IN_SECONDS) {
        this.priceWithDiscount = this.price - this.price * coupon.discount / 100;
        this.htmlButtonStatic.hidden = true;
        this.couponService.saveActivatedCoupon(coupon);
      } else {
        this.isCouponActivatedBefore = true;
        this.remainingSecondsUntilNextActivation = HomeComponent.NEXT_COUPON_CAN_ACTIVATE_IN_SECONDS - diffBetweenTwoDatesInSeconds;
      }
    });
  }

  ngOnInit(): void {
    this.htmlSelector = document.getElementById('company-selector') as HTMLSelectElement;
    this.htmlCardLink = document.getElementById('card-link') as HTMLDivElement;
    this.htmlCardStatic = document.getElementById('card-static') as HTMLDivElement;
    this.htmlCardDynamic = document.getElementById('card-dynamic') as HTMLDivElement;
    this.htmlButtonLink = document.getElementById('link-activate-button') as HTMLLinkElement;
    this.htmlButtonStatic = document.getElementById('static-activate-button') as HTMLButtonElement;
    this.htmlButtonDynamic = document.getElementById('dynamic-activate-button') as HTMLButtonElement;

    this.couponService.getCoupons().subscribe((ret: any) => {
      console.log(ret);
      this.coupons = ret;
    });

    this.companyService.getCompanies().subscribe((ret: any) => {
      console.log(ret);
      this.companies = ret;
    });


    this.htmlButtonStatic.classList.add('disabled');
    this.htmlButtonLink.classList.add('disabled');
    this.htmlButtonDynamic.classList.add('disabled');
  }

}
