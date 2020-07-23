import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {
  StyleSheet, View, Text,
} from 'react-native';
import Button from '../Buttons/Button';

import COLORS from '../../constants/colorsConstants';
import { HelveticaLight } from '../../constants/fontConstants';
import { locale } from '../../constants/textConstants';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.MAIN_WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTop: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBottom: {
    padding: 15,
    borderColor: COLORS.MAIN_GREY,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.MAIN_BLACK,
    fontSize: 20,
    fontWeight: '200',
    fontFamily: HelveticaLight,
    textAlign: 'center',
  },
  title: {
    marginBottom: 15,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#e100be',
    padding: 7,
    paddingHorizontal: 20,
  },
  textContinue: {
    color: COLORS.MAIN_BLACK,
  },
  containerContinue: {
    backgroundColor: COLORS.MAIN_WHITE,
    borderColor: COLORS.MAIN_GREY,
    borderWidth: 0.5,
  },
});

class ModalDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
  }

  render() {
    const {
      toggleModal, title, subTitle, onConfirm,
    } = this.props;
    const { isModalVisible } = this.state;
    toggleModal(this.toggleModal);
    return (
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
            <Text style={[styles.headerText, styles.title]}>{title}</Text>
            <Text style={styles.headerText}>{subTitle}</Text>
          </View>
          <View style={styles.modalBottom}>
            <Button
              style={styles.modalButton}
              text={locale.oopsNo.toLocaleUpperCase()}
              onPress={() => {
                this.toggleModal();
              }}
            />
            <Button
              style={styles.modalButton}
              text={locale.continue.toLocaleUpperCase()}
              textStyles={styles.textContinue}
              containerStyles={styles.containerContinue}
              onPress={() => {
                onConfirm();
                this.toggleModal();
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

ModalDialog.propTypes = {
  onConfirm: PropTypes.func,
  toggleModal: PropTypes.func,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

ModalDialog.defaultProps = {
  toggleModal: () => {},
  onConfirm: () => {},
};

export default ModalDialog;
