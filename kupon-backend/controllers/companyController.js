import Company from '../models/company.js';
import Coupon from '../models/coupon.js';

export const createCompany = async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

export const updateCompany = async (req, res) => {
    const allowedOptions = ['name', 'description', 'couponId', 'website'];
    const selectedOption = Object.keys(req.body);
    const doesExists = selectedOption.every(option => allowedOptions.includes(option));
    if (!doesExists) {
        return res.status(404).json({ success: false, error });
    }
    try {
        const company = await Company.findById({ _id: req.params.id });
        selectedOption.forEach(option => company[option] = req.body[option]);
        await company.save()
        res.status(200).json(company);
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const company = await Company.findOneAndDelete({ _id: req.params.id });
        res.status(200).json("Company was deleted");
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
}

export const findCouponByCompany = async (req, res) => {
    const coupons = await Coupon.find();
    const companies = await Company.find();
    const companyId = req.params.id;

    let company;
    for (let companyIdx = 0; companyIdx < companies.length; companyIdx++) {
        if (companies[companyIdx].id === companyId) {
            company = companies[companyIdx];
        }
    }

    for (let couponIdx = 0; couponIdx < coupons.length; couponIdx++) {
        if (company.id === coupons[couponIdx].companyId) {
            res.status(200).json(coupons[couponIdx]);
        }
    }
}

