import { isMember } from './membership';

class Calculation {
  constructor({ sellerProfile, buyerProfile }) {
    this.tax = 0;
    this.percentTaxLA = 9.75 / 100;
    this.percentVendorCharge = 1 / 100;
    this.vendorCharge = 0.10;
    this.selectedPrice = null;
    this.sellerProfile = sellerProfile;
    this.buyerProfile = buyerProfile;
    this.vendor = 0;
    this.totalPrice = 0;
  }

  setPrice = (selectedPrice) => {
    this.selectedPrice = selectedPrice;
    this.calculatePrice();
  }

  setTax = () => {
    if (isMember(this.buyerProfile)) this.tax = 0;
    else this.tax = 4.99;
  }

  getTotalPrice = () => this.totalPrice;

  getTax = () => this.tax;

  getVendor = () => this.vendor;

  getApplicationFee = () => parseFloat(this.vendor) + parseFloat(this.tax);

  calculateVendor = () => {
    this.vendor = ((this.selectedPrice.value
      * (this.percentTaxLA + this.percentVendorCharge)) + this.vendorCharge).toFixed(2);
    return parseFloat(this.vendor);
  }

  calculatePrice = () => {
    const { selectedPrice } = this;
    this.setTax();
    this.totalPrice = (parseFloat(selectedPrice.value)
      + this.tax
      + this.calculateVendor()).toFixed(2);
  }
}

export default Calculation;
