import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, FlatList, View, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';

import COLORS from '../../constants/colorsConstants';

import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import Block from '../../custom-components/Block';
import TextInput from '../../custom-components/Input/TextInput';
import ButtonOpacity from '../../custom-components/Buttons/Button';
import ValidComponent from '../../custom-components/ValidComponent';
import SmallActivity from '../../custom-components/SmallActivity';
import SingleMessage from './SingleMessage';
import BackButton from '../../share/BackButton';

import {
  sendMessageAttempt, loadMoreChatDataAttempt, clearChatData,
} from '../../actions/chat';

import stylesInfo from '../../styles/InfoView';
import wrapperStyle from '../../styles/MainWrapper';

const styles = StyleSheet.create({
  ChatContainer: {
    flex: 1,
    paddingVertical: 0,
  },
  MessagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  EmptyMessagesText: {
    marginTop: '-7%',
  },
  ScreenContainerAvoiding: {
    padding: 0,
    margin: 0,
  },
  Input: {
    color: COLORS.COLOR_BLUE,
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 0,
  },
  InputBlock: {
    width: '100%',
    backgroundColor: COLORS.MAIN_WHITE,
    borderTopColor: COLORS.COLOR_BLUE,
    borderTopWidth: 1,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  InputLeft: {
    width: '70%',
  },
  Send: {
    color: COLORS.MAIN_WHITE,
  },
  SendButton: {
    marginTop: 0,
    marginHorizontal: 0,
    marginLeft: 10,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 60,
  },
  NewFriendText: {
    color: COLORS.BLUE_DARK,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: '5%',
  },
});

class Chat extends PureComponent {
  static navigationOptions = ({ navigation, navigation: { state: { params } } }) => ({
    title: params.username,
    headerTitleStyle: wrapperStyle.pageTitleTop,
    headerLeft: (<BackButton onPress={() => navigation.goBack()} />),
    headerRight: <View />,
  });

  flatListRef = null;

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }


  componentDidMount = () => {
    setTimeout(this.scrollToEnd, 1);
  }

  componentWillUnmount = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(clearChatData());
  }

  keyExtractor = item => item.timestamp.toString();

  scrollToEnd = (animated = true) => this.flatListRef.scrollToOffset({ x: 0, y: 0, animated })

  send = () => {
    const { message } = this.state;
    const { navigation: { dispatch } } = this.props;
    dispatch(sendMessageAttempt(message));
    this.setState({ message: '' });
  }

  renderGenericMessage = () => {
    const {
      isLoading, messages, limit, msg,
    } = this.props;
    const notExist = messages.slice(0, limit).length === 0 && !isLoading;
    return (
      <ValidComponent exist={notExist}>
        <View style={styles.MessagesContainer}>
          <Text style={[stylesInfo.text, notExist && styles.EmptyMessagesText]}>
            {msg}
          </Text>
        </View>
      </ValidComponent>
    );
  }

  onLoadMoreChatData = () => {
    const { navigation: { dispatch } } = this.props;
    dispatch(loadMoreChatDataAttempt());
  }

  renderInput = () => {
    const { message } = this.state;
    const { isSending } = this.props;
    return (
      <Block style={styles.InputBlock}>
        <View style={styles.InputLeft}>
          <TextInput
            onChangeText={typed => this.setState({ message: typed })}
            onFocus={() => setTimeout(this.scrollToEnd, 1)}
            style={styles.Input}
            value={message}
            placeholderTextColor={COLORS.BLUE_DARK}
            placeholder="Type a message"
          />
        </View>
        <ButtonOpacity
          isLoading={isSending}
          disabled={message.length === 0}
          containerStyles={styles.SendButton}
          textStyles={styles.Send}
          onPress={this.send}
          text="SEND"
        />
      </Block>
    );
  }

  render() {
    const {
      messages,
      hasPreviousPage,
      profile,
      limit,
      isLoadingMore,
      isLoading,
    } = this.props;
    return (
      <View
        style={styles.ChatContainer}
      >
        <FlatList
          inverted
          ref={(node) => { this.flatListRef = node; }}
          style={styles.MessagesContainer}
          onEndReachedThreshold={0.01}
          onEndReached={() => hasPreviousPage && this.onLoadMoreChatData()}
          data={messages.slice(0, limit)}
          extraData={messages}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => <SingleMessage item={item} currentUser={profile} />}
          ListFooterComponent={<SmallActivity isLoading={isLoadingMore} />}
        />
        {this.renderGenericMessage()}
        {this.renderInput()}
        <CustomActivityIndicator isLoading={isLoading} showNoData={false} headerOffset />
        {Platform.OS === 'ios' && <KeyboardSpacer />}
      </View>
    );
  }
}

Chat.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
  msg: PropTypes.string.isRequired,
};

Chat.defaultProps = {
  messages: [],
};

const mapStateToProps = ({
  chatReducer: {
    isLoading,
    isSending,
    isLoadingMore,
    messages,
    limit,
    hasPreviousPage,
    msg,
  },
  authorizationReducer: {
    profile,
  },
}) => ({
  isLoading,
  isSending,
  isLoadingMore,
  messages,
  profile,
  limit,
  hasPreviousPage,
  msg,
});

export default connect(mapStateToProps)(Chat);
