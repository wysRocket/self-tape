import MasterCardLogo from '../images/icons/masterlogo.png';
import DinersLogo from '../images/icons/dinersLogo.png';
import DiscoverLogo from '../images/icons/discoverLogo.png';
import JcbLogo from '../images/icons/jcbLogo.png';
import UnionLogo from '../images/icons/unionLogo.png';
import VisaLogo from '../images/icons/visalogo.png';
import AmericanExpress from '../images/icons/amexLogo.png';
import { getCancelationFee } from './sessions';

export const getCardLogo = ({ brand }) => {
  switch (brand) {
    case 'Visa': return VisaLogo;
    case 'American Express': return AmericanExpress;
    case 'Diners Club': return DinersLogo;
    case 'Discover': return DiscoverLogo;
    case 'JCB': return JcbLogo;
    case 'UnionPay': return UnionLogo;
    default: return MasterCardLogo;
  }
};

export const getRefundAmount = (practitioner, paid) => {
  let amount = 0;
  const cancelationFee = getCancelationFee(practitioner);
  const price = parseFloat(paid);
  amount = price - ((price * cancelationFee.value) / 100);
  return amount.toFixed(2);
};

export default getCardLogo;
