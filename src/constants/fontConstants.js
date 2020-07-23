import { Platform } from 'react-native';

const Fonts = Platform.OS === 'ios' ? {
  AbrilFatface: 'Abril Fatface',
  AvenirLight: 'Avenir-Light',
  BaskervilleItalic: 'Baskerville-Italic',
  SukhumvitSetBold: 'SukhumvitSet-Bold',
  HelveticaLight: 'Helvetica-Light',
  ERBukinistMacBold: 'ER Bukinist Mac',
  OCRARegular: 'OCR-A',
} : {
  AbrilFatface: 'Abril-Fatface',
  AvenirLight: 'Avenir-Light',
  BaskervilleItalic: 'Baskerville-Italic',
  SukhumvitSetBold: 'SukhumvitSet-Bold',
  HelveticaLight: 'Helvetica-Light',
  ERBukinistMacBold: 'ER-Bukinist-Mac-Bold',
  OCRARegular: 'OCR-A-Regular',
};

export default Fonts;

export const {
  AbrilFatface,
  AvenirLight,
  BaskervilleItalic,
  SukhumvitSetBold,
  HelveticaLight,
  ERBukinistMacBold,
  OCRARegular,
} = Fonts;
