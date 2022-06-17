import mongoose from 'mongoose';
const coupon = new mongoose.Schema({
    "activatedCouponId": String,
    "companyId": String,
    "couponCode": String
}, { timestamps: true });
const ActivatedCoupon = mongoose.model('activatedCoupon', coupon);
export default ActivatedCoupon;