export interface Coupon {
    _id: string,
    couponCode: string
    companyId: string,
    couponType: 'link' | 'static' | 'dynamic',
    description: string,
    discount: number,
}