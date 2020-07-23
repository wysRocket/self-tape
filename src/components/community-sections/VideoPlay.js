import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomActivityIndicator from '../../custom-components/CustomActivityIndicator';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/VideoPlayStyles';

export default class ToolsAndTips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      shouldPlay: true,
      isBuffering: false,
      loaded: false,
    };
  }

  onBuffer = ({ isBuffering }) => this.setState({ isBuffering })

  onEnd = () => {
    this.setState({ shouldPlay: false });
    if (this.player) this.player.seek(0);
  }

  onLoad = () => this.setState({ loaded: true });

  videoError = error => console.log('error video: ', error)

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  }

  handlePlayAndPause = () => {
    this.setState(prevState => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  }

  render() {
    const { props } = this;
    const { loaded } = this.state;
    const { width } = Dimensions.get('window');
    const video = props.navigation.state.params.item;
    const { backScreen } = props.navigation.state.params;
    return (
      <MainWrapper
        navigation={props.navigation}
        pageName="Video"
        goBackScreen={backScreen}
      >
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <Text style={styles.videoName}>{video.name}</Text>
            <View style={styles.underLine} />
          </View>
          <View style={[styles.videoContainer, { position: 'relative' }]}>
            <Video
              source={{ uri: video.url }}
              ref={(ref) => {
                this.player = ref;
              }}
              onEnd={this.onEnd}
              onLoad={this.onLoad}
              muted={this.state.mute}
              paused={!this.state.shouldPlay}
              onBuffer={this.onBuffer}
              resizeMode="cover"
              onError={this.videoError}
              style={{ width, height: 200 }}
            />
          </View>
          <View style={styles.controlBar}>
            <MaterialIcons
              name={this.state.mute ? 'volume-mute' : 'volume-up'}
              size={45}
              color="white"
              onPress={() => this.handleVolume()}
            />
            <MaterialIcons
              name={this.state.shouldPlay ? 'pause' : 'play-arrow'}
              size={45}
              color="white"
              onPress={() => this.handlePlayAndPause()}
            />
          </View>
        </View>
        <CustomActivityIndicator
          text="No video found"
          isLoading={this.state.isBuffering && this.state.shouldPlay && !loaded}
          showNoData={false}
        />
      </MainWrapper>
    );
  }
}
