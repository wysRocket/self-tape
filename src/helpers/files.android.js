import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';

const { android } = RNFetchBlob;

export const openFile = ({ file, fileInfo: { fileType } }) => {
  try {
    switch (fileType) {
      case 'application/pdf':
        FileViewer.open(file.data.path(), { showOpenWithDialog: true })
          .then(success => console.log('success', success))
          .catch(error => console.log('error', error));
        break;
      case 'image/png':
        android.actionViewIntent(file.data.path(), fileType);
        break;
      default: break;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export default openFile;
