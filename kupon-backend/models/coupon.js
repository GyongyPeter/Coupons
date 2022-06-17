import mongoose from 'mongoose';
const coupon = new mongoose.Schema({
    "companyId": String,
    "couponCode": String,
    "couponType": 'link' | 'static' | 'dynamic',
    "description": String,
    "discount": Number
}, { timestamps: true });
const Coupon = mongoose.model('coupon', coupon);
export default Coupon;