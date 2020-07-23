import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import TextInputMask from 'react-native-text-input-mask';

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 1,
    padding: 20,
  },
  inputStyle: {
    marginLeft: 15,
    fontSize: 16,
    flex: 1,
  },
  image: {
    tintColor: '#cececb',
  },
});

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      field, placeholder, icon = false, type, style, returnKeyType,
      blurOnSubmit, next, refInput, mask, withoutMargin = false,
      maxLength,
    } = this.props;
    const InputType = { true: TextInput, false: TextInputMask };
    const InputElem = InputType[mask === ''];

    return (
      <View style={[styles.inputWrapper, style]}>
        {icon ? <AutoHeightImage source={icon} width={20} style={styles.image} /> : null}
        <InputElem
          onChangeText={value => this.props.onChangeValue(field, value)}
          underlineColorAndroid="transparent"
          style={[styles.inputStyle, withoutMargin && { marginLeft: 0 }]}
          returnKeyType={returnKeyType}
          keyboardType={type}
          placeholder={placeholder}
          value={this.props.value}
          blurOnSubmit={blurOnSubmit}
          onSubmitEditing={next}
          maxLength={maxLength}
          ref={input => refInput(input)}
          mask={mask}
        />
      </View>
    );
  }
}

ImageInput.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  field: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  withoutMargin: PropTypes.bool,
  type: PropTypes.string,
  returnKeyType: PropTypes.string,
  blurOnSubmit: PropTypes.bool,
  style: PropTypes.shape({}),
  next: PropTypes.func,
  refInput: PropTypes.func,
  mask: PropTypes.string,
  maxLength: PropTypes.number,
};

ImageInput.defaultProps = {
  type: 'default',
  returnKeyType: 'next',
  style: {},
  blurOnSubmit: false,
  next: () => {},
  refInput: () => {},
  mask: '',
  value: '',
  withoutMargin: false,
  maxLength: 40,
};

export default ImageInput;
