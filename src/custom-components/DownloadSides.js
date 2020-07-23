import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Permissions from 'react-native-permissions';

import { downloadFileAttempt } from '../actions/sessions';

import ImageLoading from './ImageLoading';
import { locale } from '../constants/textConstants';

import { HelveticaLight } from '../constants/fontConstants';
import { SESSIONS_STATUSES } from '../constants/apiConstants';
import COLORS from '../constants/colorsConstants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerBottom: {
    margin: 8,
    marginTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginHorizontal: 50,
  },
  containerBottomHeader: {
    fontFamily: HelveticaLight,
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.MAIN_BLACK,
    marginBottom: 10,
  },
  contentContainer: {
    width: width - 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: width / 2 - 20,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  containerBottomTitle: {
    fontFamily: HelveticaLight,
    fontSize: 17,
    fontWeight: '400',
    color: COLORS.MAIN_BLUE,
    textDecorationLine: 'underline',
  },
  containerBottomImage: {
    flex: 1,
    height: 130,
    backgroundColor: COLORS.MAIN_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginVertical: 5,
  },
});

class DownloadSides extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: false,
    };
  }

  componentDidMount = () => {
    if (Platform.OS !== 'ios') {
      this.requestPermission();
    }
  };

  requestPermission = () => {
    Permissions.request('storage').then(storagePermission => this.setState({ storagePermission }));
  }

  onDownloadFile = (file) => {
    const { dispatch } = this.props;
    const { storagePermission } = this.state;
    if (storagePermission || Platform.OS === 'ios') {
      dispatch(downloadFileAttempt({ file }));
    } else {
      this.requestPermission();
    }
  }

  showDownloadSides = client => client.files
    && client.status !== SESSIONS_STATUSES.created
    && client.status !== SESSIONS_STATUSES.canceled;

  isPdf = () => {
    const { client } = this.props;
    return client.files && client.files.length > 0 && client.files.indexOf(file => file.fileType === 'image/png') !== -1;
  }

  renderPdf = ({ file }) => (
    <View style={styles.containerBottomImage}>
      <Text style={[styles.containerBottomTitle, { color: COLORS.MAIN_WHITE }]}>
        {file.fileName}
      </Text>
    </View>
  )

  render() {
    const { client } = this.props;

    return (
      this.showDownloadSides(client) ? (
        <View style={styles.containerBottom}>
          <Text style={styles.containerBottomHeader}>{locale.attachments}</Text>
          <View style={[styles.contentContainer, { flexDirection: 'row' }]}>
            {client.files.map((file, index) => (
              <View key={`${file.fileName}_${index + 1}`} style={[styles.item, { width: width / 2 - 20 }]}>
                <TouchableOpacity
                  style={styles.titleContainer}
                  delayPressIn={20}
                  onPress={() => this.onDownloadFile(file)}
                >
                  {file.fileType !== 'application/pdf' ? (
                    <ImageLoading
                      style={styles.containerBottomImage}
                      source={{ uri: file.fileURL }}
                    />
                  ) : this.renderPdf({ file })}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      ) : null
    );
  }
}


DownloadSides.propTypes = {
  client: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
};

DownloadSides.defaultProps = {
};

export default DownloadSides;
