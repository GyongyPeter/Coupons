import mongoose from 'mongoose';
const company = new mongoose.Schema({
    "name": String,
    "description": String,
    "website": String
}, { timestamps: true });
const Company = mongoose.model('company', company);
export default Company;