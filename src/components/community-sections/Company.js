import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating';
import AutoHeightImage from 'react-native-auto-height-image';
import MainWrapper from '../../share/MainWrapper';
import styles from '../../styles/CompanyStyles';
import ImageLoading from '../../custom-components/ImageLoading';

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderArticles = articles => articles && articles.map(item => (
    <TouchableOpacity
      key={`${item.title}${item.sub_title}`}
      delayPressIn={20}
    >
      <View style={styles.containerArticle}>
        <View style={styles.shadowImage}>
          <ImageLoading style={styles.articleImage} source={{ uri: item.image }} />
        </View>
        <View style={styles.textArticleWrapper}>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleSubTitle}>{item.sub_title}</Text>
        </View>
        <View>
          <Text style={styles.articleText}>{item.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));

  render() {
    const { props } = this;
    const SingleItem = props.navigation.state.params.item;
    return (
      <MainWrapper
        navigation={props.navigation}
        pageName={SingleItem.name}
        goBackScreen="SingleSubCategoryComunities"
      >
        <ScrollView style={styles.container}>
          <View style={styles.top}>
            <View style={styles.topImage}>
              <AutoHeightImage
                width={SingleItem.width ? SingleItem.width : Dimensions.get('window').width}
                style={SingleItem.height ? { height: SingleItem.height } : styles.bannerTop}
                source={{ uri: SingleItem.banner }}
              />
            </View>
            <View style={styles.bannerTopInfo}>
              <StarRating
                disabled
                fullStarColor="#caae00"
                starStyle={styles.starStyle}
                maxStars={5}
                starSize={22}
                rating={SingleItem.rating}
              />
              <Text style={styles.bannerTopInfoMail}>{SingleItem.mail}</Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.articlesContainer}>
            {this.renderArticles(SingleItem.articles) }
          </ScrollView>
        </ScrollView>
      </MainWrapper>
    );
  }
}
