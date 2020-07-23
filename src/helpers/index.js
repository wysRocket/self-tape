import { Dimensions } from 'react-native';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');
export const SizeConstant = { ScreenWidth, ScreenHeight };

let _showOverlay;

function setOverlay(ref) {
  _showOverlay = ref ? ref.showOverlay : null;
}
function showOverlay(params) {
  if (!_showOverlay) return;
  _showOverlay(params);
}

export {
  showOverlay,
  setOverlay,
}