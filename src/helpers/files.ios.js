import FileViewer from 'react-native-file-viewer';
import OpenFile from 'react-native-doc-viewer';

export const openFile = async ({ file, fileInfo: { fileType } }) => {
  try {
    let source = '';
    switch (fileType) {
      case 'application/pdf':
        FileViewer.open(file.data.path(), { showOpenWithDialog: true })
          .then(success => console.log('success', success))
          .catch(error => console.log('error', error));
        break;
      case 'image/png':
        source = await file.data.base64()
        OpenFile.openDocb64([{
          base64: source,
          fileName: 'Image',
          fileType: 'png',
        }], (error, url) => {
          if (error) {
            console.error(error);
          } else {
            console.log(url)
          }
        });
        break;
      default: break;
    }
  } catch (error) {
    console.log('error', error);
  }
};

export default openFile;
