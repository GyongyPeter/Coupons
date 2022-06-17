import ActivatedCoupon from '../models/activatedCoupon.js';
import Coupon from '../models/coupon.js';

export const createCoupon = async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const updateCoupon = async (req, res) => {
    const allowedOptions = ['couponCode', 'description', 'discount', 'companyId', 'couponType'];
    const selectedOption = Object.keys(req.body);
    const doesExists = selectedOption.every(option => allowedOptions.includes(option));
    if (!doesExists) {
        return res.status(404).json({ success: false, error });
    }
    try {
        const coupon = await Coupon.findById({ _id: req.params.id });
        selectedOption.forEach(option => coupon[option] = req.body[option]);
        await coupon.save()
        res.status(200).json(coupon);
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOneAndDelete({ _id: req.params.id });
        res.status(200).json("Coupon was deleted");
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

export const saveActivatedCoupon = async (req, res) => {
    try {
        const coupon = new ActivatedCoupon(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const getActivatedCoupons = async (req, res) => {
    try {
        const activatedCoupons = await ActivatedCoupon.find();
        res.status(200).json(activatedCoupons);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const getLastActivatedSameCoupon = async (req, res) => {
    try {
        const couponForActivateId = req.params.id;
        const sameCouponsActivatedBefore = await ActivatedCoupon.find({ 'activatedCouponId': couponForActivateId });

        console.log(sameCouponsActivatedBefore[sameCouponsActivatedBefore.length - 1])

        res.status(200).json(sameCouponsActivatedBefore[sameCouponsActivatedBefore.length - 1]);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}