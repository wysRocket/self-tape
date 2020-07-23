import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { HelveticaLight } from '../../constants/fontConstants';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#0c8cd0',
    opacity: 0.9,
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#e100be',
    padding: 7,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    textAlign: 'center',
  },
});

class ModalNotMember extends React.Component {
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
      member, toggleModal, title, buttonText, backScreen, navigation: { navigate },
    } = this.props;
    const { isModalVisible } = this.state;
    toggleModal(this.toggleModal);
    return (
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>{title}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              this.toggleModal();
              navigate(!member ? 'Membership' : 'Pricing', { backScreen });
            }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

ModalNotMember.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  member: PropTypes.shape({}),
  toggleModal: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  backScreen: PropTypes.string,
};

ModalNotMember.defaultProps = {
  member: null,
  toggleModal: () => {},
  backScreen: null,
};

const mapStateToProps = ({
  userDetails: { isLoading, member },
}) => ({
  isLoading,
  member,
});
export default connect(mapStateToProps)(ModalNotMember);
