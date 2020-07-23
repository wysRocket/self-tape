// @flow

import RNFetchBlob from 'rn-fetch-blob';
import { STRIPE_URL } from '../constants/apiConstants';

const REQM = ' is required';

class Stripe {
  stripePublicKey;

  constructor(apiKey) {
    this.stripePublicKey = apiKey;
  }

  /**
   * Return the default header entries : Accept and Authorization
   * @returns {Object} Default header Accept and Authorization
   */
  defaultHeader() {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.stripePublicKey}`,
    };
  }

  /**
   * Generic method post to Stripe Rest API
   * @param resource : Rest API ressource ie. tokens, charges, etc.
   * @param properties : object, key by form parm
   */
  async stripeRequest(method, resource, properties) {
    const body = Object.entries(properties)
      .map(([key, value]) => `${key}=${value}`)
      .reduce((previous, current) => `${previous}&${current}`, '');

    const result = await RNFetchBlob.fetch(method, `${STRIPE_URL}${resource}`, {
      ...this.defaultHeader(),
      'Content-Type': 'application/x-www-form-urlencoded',
    }, body);

    return result.json();
  }

  /**
   * Only operation allowed from client/Using only public token
   * @param info : { number, exp_month, exp_year, address_city, address_country, address_line1,
   * ... address_line2, address_state, address_zip, currency, cvc }
   */
  createToken(info) {
    if (!info) throw new Error(`info${REQM}`);
    if (!info.number) throw new Error(`cardNumber${REQM}`);
    if (!info.exp_month) throw new Error(`expMonth${REQM}`);
    if (!info.exp_year) throw new Error(`expYear${REQM}`);
    if (!info.cvc) throw new Error(`cvc${REQM}`);

    const card = {};
    Object.keys(info).forEach((key) => {
      if (info) {
        card[`card[${key}]`] = info[key];
      }
    });
    return this.stripeRequest('POST', 'tokens', card);
  }
}


export default Stripe;
