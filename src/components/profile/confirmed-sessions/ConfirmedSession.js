import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, Linking, ScrollView, Platform, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { connect } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import moment from 'moment';
import AutoHeightImage from 'react-native-auto-height-image';

import { sessionsUpdateAttempt, getBookDataAttempt, uploadFilesAttempt } from '../../../actions/sessions';

import { refundAttempt } from '../../../actions/payment';
import { setBookAgainData } from '../../../actions/book';
import { createOrGetChatAttempt } from '../../../actions/chat';

import SessionStatus from '../../../custom-components/Session/SessionStatus';
import MapWithCard from '../../../custom-components/Maps/MapWithCard';
import DialogModal from '../../../custom-components/Modal/dialog';
import Button from '../../../custom-components/Buttons/Button';
import ButtonIcon from '../../../custom-components/Buttons/ButtonIcon';
import CustomActivityIndicator from '../../../custom-components/CustomActivityIndicator';
import CustomTouchableOpacity from '../../../custom-components/CustomTouchableOpacity';
import { getRefundAmount } from '../../../helpers/payments';
import MainWrapper from '../../../share/MainWrapper';

import { SESSIONS_STATUSES } from '../../../constants/apiConstants';
import { HelveticaLight } from '../../../constants/fontConstants';
import COLORS from '../../../constants/colorsConstants';
import { locale } from '../../../constants/textConstants';
import CreditCardIcon from '../../../images/icons/creditCardIcon.png';
import Arrow from '../../../images/icons/rightArrow.png';
import CamIcon from '../../../images/icons/camIcon.png';
import Message from '../../../images/icons/message.png';
import CancelIcon from '../../../images/icons/CancelIcon.png';

const IS_IMAGES = true;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  SessionInfoContainer: {
    borderColor: COLORS.MAIN_GREY,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Title: {
    fontFamily: HelveticaLight,
    color: COLORS.MAIN_BLACK,
    fontSize: 16,
    fontWeight: '400',
  },
  SubTitle: {
    fontFamily: HelveticaLight,
    color: COLORS.MAIN_BLACK,
    fontSize: 14,
    fontWeight: '400',
  },
  Grey: {
    color: COLORS.MAIN_GREY,
  },
  col: {
    flex: 1,
  },
  colRight: {
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  PaymentsTitleContainer: {
    marginTop: 20,
    borderColor: COLORS.MAIN_GREY,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.MAIN_GREY_BACK,
  },
  PaymentsContainer: {
    paddingVertical: 10,
    borderColor: COLORS.MAIN_GREY,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  CardIcon: {
    tintColor: COLORS.MAIN_GREY,
  },
  feeContainer: {
    marginLeft: 15,
  },
  buttonsBottom: {
    justifyContent: 'space-between',
    margin: 10,
    marginTop: 0,
  },
  textCancel: {
    color: COLORS.MAIN_RED,
    fontSize: 14,
  },
  containerCancel: {
    borderColor: COLORS.MAIN_WHITE,
    backgroundColor: COLORS.MAIN_WHITE,
  },
  textCallContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonsContainer: {
    width,
    alignSelf: 'center',
    paddingHorizontal: '20%',
  },
  uber: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#040404',
    alignSelf: 'center',
  },
  lyft: {
    marginTop: 5,
    backgroundColor: '#ce06ba',
  },
  textLinks: {
    fontFamily: HelveticaLight,
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bookAgain: {
    backgroundColor: 'black',
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButton: {
    backgroundColor: '#3b88cd',
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    marginTop: 15,
    alignSelf: 'center',
  },
  // Modal
  modalHeaderContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.COLOR_GRAY_797979,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: HelveticaLight,
    color: COLORS.MAIN_BLACK,
  },

  cancelButtonContainer: {
    padding: 7,
  },

  headerCancelImage: {
    width: 18,
    height: 18,
    tintColor: COLORS.MAIN_BLACK,
  },

  modalContentContainer: {
    height: (55 * 3) + 20,
    padding: 10,
    justifyContent: 'center',
  },

  modalContentItem: {
    height: 55,
    marginTop: 10,
  },
  confirmationButton: {
    height: 55,
    backgroundColor: COLORS.MAIN_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  bookConfirmationText: {
    fontSize: 20,
    color: COLORS.MAIN_WHITE,
    fontWeight: '900',
    fontFamily: HelveticaLight,
  },
});
class ConfirmedSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: false,
      cameraPermission: false,
      showPopup: false,
    };
    this.toggleCancel = () => {};
  }

  componentDidMount = () => {
    this.requestPermission();
  }

  requestPermission = () => {
    Permissions.request('photo').then(photoPermission => this.setState({ photoPermission }));
    Permissions.request('camera').then(cameraPermission => this.setState({ cameraPermission }));
  }

  cancelSession = () => {
    const {
      navigation: { dispatch, navigate },
      session,
    } = this.props;
    const sessionInfo = { ...session, ...{ newStatus: SESSIONS_STATUSES.canceled } };
    const { locationUid, profileUid, uid } = sessionInfo;
    dispatch(getBookDataAttempt({ locationUid, profileUid, sessionUid: uid }));

    dispatch(sessionsUpdateAttempt(sessionInfo));
    dispatch(refundAttempt(sessionInfo));
    navigate('FinishedSessions');
  }

  goToChat = () => {
    const {
      navigation: { dispatch },
      bookData: { practitionerProfile: { practitioner } },
    } = this.props;
    dispatch(createOrGetChatAttempt({ profile: practitioner }));
  }

  renderSessionInfo = ({
    session: {
      selectedTime: { selectedPrice, dateTime },
      details: { profilePractitioner, profileClient },
    },
    backScreen = null,
  }) => (
    <View style={styles.SessionInfoContainer}>
      <View style={styles.col}>
        <Text style={styles.Title}>{backScreen === 'Schedule' ? profileClient.username : profilePractitioner.username}</Text>
        <Text style={styles.SubTitle}>{`${selectedPrice.duration} ${locale.min} - ${locale.session}`}</Text>
      </View>
      <View style={[styles.col, styles.colRight]}>
        <Text style={styles.Title}>{`${selectedPrice.units}${selectedPrice.value}.00`}</Text>
        <Text style={[styles.SubTitle, styles.Grey]}>{`${moment(dateTime).format('hh:mm A')} - ${moment(dateTime).add(selectedPrice.duration, 'minutes').format('hh:mm A')}`}</Text>
      </View>
    </View>
  );

  renderPayments = ({
    session: {
      createdAt,
      payObject: {
        paid,
      },
    },
    practitioner,
  }) => (
    <View>
      <View style={styles.PaymentsTitleContainer}>
        <Text style={styles.SubTitle}>{locale.payments.toUpperCase()}</Text>
      </View>
      <View style={styles.PaymentsContainer}>
        <View style={[styles.row, styles.alignCenter]}>
          <AutoHeightImage source={CreditCardIcon} width={30} style={styles.CardIcon} />
          <View style={styles.feeContainer}>
            <Text style={[styles.SubTitle, styles.Grey]}>{`${moment(createdAt).format('MMM, DD, YYYY, hh:mm A')}`}</Text>
            <Text style={[styles.SubTitle, styles.Grey]}>{locale.cancellationFee}</Text>
          </View>
        </View>
        <View style={[styles.row, styles.alignCenter]}>
          <Text style={styles.SubTitle}>{`$${getRefundAmount(practitioner, paid)}`}</Text>
          <AutoHeightImage source={Arrow} width={25} style={styles.CardIcon} />
        </View>
      </View>
    </View>
  )

  renderButton = ({ style, onPressFunction, text }) => (
    <CustomTouchableOpacity
      styles={style}
      onPressFunction={onPressFunction}
    >
      <Text style={styles.textLinks}>{text}</Text>
    </CustomTouchableOpacity>
  )

  goToGreat = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Great');
  }

  pickFile = async (camera = false) => {
    this.toggleModal();
    const { navigation: { dispatch } } = this.props;
    const { photoPermission, cameraPermission } = this.state;
    if (camera) {
      if (photoPermission === 'authorized' || cameraPermission === 'authorized') {
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'image',
        }).then((response) => {
          dispatch(uploadFilesAttempt(this.generateFilesObjects({ response, type: 'image/png' }), () => {
            this.goToGreat();
          }));
        }).catch((err) => {
          console.log('err', err);
        });
      }
    } else {
      try {
        const response = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.pdf],
        });
        dispatch(uploadFilesAttempt(this.generateFilesObjects({ response, type: 'application/pdf' }), () => {
          this.goToGreat();
        }));
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }
  };

  generateFilesObjects = ({ response, type }) => {
    const {
      session,
    } = this.props;
    const files = [];
    const time = moment().utc();
    if (Array.isArray(response)) {
      response.forEach((item) => {
        const file = {
          file: type === 'image/png' ? {
            uri: Platform.OS === 'ios' ? item.sourceURL : item.path,
            fileType: item.mime,
            fileName: item.name,
          } : {
            uri: item.uri,
            fileType: item.type,
            fileName: item.name,
          },
          sessionUid: session.uid,
          fileName: `${time.format('YY-MM-DD-HH-MM-SS-a')}${type}`,
          fileType: type,
        };
        files.push(file);
      });
    } else {
      files.push({
        file: response,
        sessionUid: session.uid,
        fileName: `${time.format('YY-MM-DD-HH-MM-a')}`,
        fileType: type,
      });
    }
    return files;
  }

  toggleModal = () => {
    this.setState(prevState => ({ showPopup: !prevState.showPopup }));
  }

  renderConfirmedButtons = () => {
    const { session: { details: { profilePractitioner } } } = this.props;
    const uber = `https://m.uber.com/ul/?action=setPickup&client_id=vbWU0LfUtvQQbs0Li3LFzgD1VquEpnMW&pickup=my_location&dropoff[latitude]=${profilePractitioner.location.latitude}&dropoff[longitude]=${profilePractitioner.location.longitude}`;
    const lyft = `https://lyft.com/ride?id=lyft&pickup[latitude]=${profilePractitioner.location.latitude}&pickup[longitude]=${profilePractitioner.location.longitude}`; // &partner=YOUR_CLIENT_ID

    return (
      <Fragment>
        <View style={styles.textCallContainer}>
          <View style={styles.buttonsContainer}>
            {this.renderButton({
              style: styles.uber,
              onPressFunction: () => { Linking.openURL(uber); },
              text: locale.getThereWithUber,
            })}
            {this.renderButton({
              style: [styles.uber, styles.lyft],
              onPressFunction: () => { Linking.openURL(lyft); },
              text: locale.getThereWithLyft,
            })}
          </View>
          <ButtonIcon
            text={locale.uploadSides.toUpperCase()}
            image={CamIcon}
            imageStyles={{ tintColor: '#000' }}
            containerStyles={styles.messageContainer}
            onPress={() => this.toggleModal()}
          />
          <ButtonIcon
            text={locale.chat.toUpperCase()}
            image={Message}
            containerStyles={styles.messageContainer}
            onPress={() => this.goToChat()}
          />
        </View>
        <View style={[styles.row, styles.buttonsBottom]}>
          <Button
            text={locale.cancel}
            onPress={this.toggleCancel}
            textStyles={styles.textCancel}
            containerStyles={styles.containerCancel}
          />
        </View>
      </Fragment>
    );
  }

  renderFinishedButtons = () => {
    const {
      bookData,
    } = this.props;
    return (
      <View style={styles.bottomButtons}>
        {this.renderButton({
          style: styles.bookAgain,
          onPressFunction: () => this.bookAgain(),
          text: locale.bookAgain,
        })}
        {!bookData.isRatedPerson
        && (
          this.renderButton({
            style: styles.reviewButton,
            onPressFunction: () => this.rateUser(),
            text: locale.review,
          })
        )}
      </View>
    );
  }

  rateUser = () => {
    const {
      navigation: { navigate },
      bookData: { practitionerProfile: { practitioner } },
      session: { uid },
    } = this.props;
    navigate('RockedIt', { person: practitioner, backScreen: 'ConfirmedSession', sessionUid: uid });
  }

  bookAgain = () => {
    const {
      navigation: { dispatch },
      bookData: { practitionerProfile: { practitioner }, singleLocation },
    } = this.props;
    dispatch(setBookAgainData({ practitioner, location: singleLocation }));
  }

  dataExist = () => {
    const { bookData, isLoading, session } = this.props;
    return bookData && bookData.practitionerProfile && session && !isLoading;
  }

  render() {
    const { showPopup } = this.state;
    const {
      navigation, bookData, isLoading,
      navigation: { state: { params } },
      session,
    } = this.props;
    const dialogButtons = [
      { title: locale.uploadPdf, function: () => { this.pickFile(); } },
      { title: locale.uploadImage, function: () => { this.pickFile(IS_IMAGES); } },
      { title: locale.skip, function: () => { this.toggleModal(); } },
    ];

    const backScreen = params && params.backScreen ? params.backScreen : 'FinishedSessions';
    return (
      <MainWrapper
        navigation={navigation}
        pageName="Session"
        goBackScreen={backScreen}
      >
        {this.dataExist() && (
          <ScrollView style={styles.container}>
            <View>
              <SessionStatus session={session} />
              <MapWithCard session={session} backScreen={backScreen} />
            </View>
            {this.renderSessionInfo({ session, backScreen })}
            {this.renderPayments({
              session,
              practitioner: bookData.practitionerProfile.practitioner,
            })}
            {session.status === SESSIONS_STATUSES.accepted ? this.renderConfirmedButtons() : null}
          </ScrollView>
        )}
        <DialogModal
          title={locale.areYourSure}
          subTitle={locale.youWillNotBeCharged}
          onConfirm={this.cancelSession}
          toggleModal={((func) => { this.toggleCancel = func; })}
        />
        <CustomActivityIndicator text="No data" isLoading={isLoading} showNoData={bookData === null} />
        {(this.dataExist() && session.status === SESSIONS_STATUSES.finished && backScreen !== 'Schedule')
          ? this.renderFinishedButtons() : null}
        <Dialog
          visible={showPopup}
          dialogTitle={(
            <View style={styles.modalHeaderContainer}>
              <Text style={styles.modalHeaderTitle}>{locale.uploadSides}</Text>
              <TouchableOpacity
                onPress={this.toggleModal}
                style={styles.cancelButtonContainer}
              >
                <Image source={CancelIcon} style={styles.headerCancelImage} />
              </TouchableOpacity>
            </View>
          )}
          onTouchOutside={this.toggleModal}
        >
          <DialogContent>
            <View style={styles.modalContentContainer}>
              {dialogButtons.map(item => (
                <View
                  key={`${item.title}`}
                  style={styles.modalContentItem}
                >
                  <TouchableOpacity
                    key={`${item.title}`}
                    delayPressIn={20}
                    style={styles.confirmationButton}
                    onPress={item.function}
                  >
                    <Text style={styles.bookConfirmationText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </DialogContent>
        </Dialog>
      </MainWrapper>
    );
  }
}

ConfirmedSession.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
  bookData: PropTypes.shape({}),
  session: PropTypes.shape({}),
  isLoading: PropTypes.bool.isRequired,
};

ConfirmedSession.defaultProps = {
  bookData: null,
  session: null,
};

const mapStateToProps = ({
  sessionsReducer: {
    bookData,
    isLoading,
  },
  notificationsReducer: {
    notificationData: session,
  },
}) => ({
  bookData,
  isLoading,
  session,
});

export default connect(mapStateToProps)(ConfirmedSession);
