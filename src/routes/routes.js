import React, { Component } from 'react';
import {
  Dimensions, Image, View, Text, TouchableOpacity, Platform,
} from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';
import { PropTypes } from 'prop-types';
import VersionNumber from 'react-native-version-number';

// Screens
import HomeScreen from '../components/locations/HomeLocationsComponent';
import Onboarding from '../components/authorization/Onboarding';
import OnboardingUser from '../components/authorization/OnboardingUser';
import Chat from '../components/chat';
import LoginScreen from '../components/authorization/LoginComponent';
import Agreement from '../components/authorization/Agreement';
import ChoosePractitioners from '../components/locations/ChoosePractitioners';
import BookSession from '../components/locations/BookSession';
import Payment from '../components/locations/Payment';
import PractitionerBio from '../components/practitioner/PractitionerBio';
import BookSessionConfirmation from '../components/locations/BookSessionConfirmation';
import Profile from '../components/profile/profile';
// import Activity from '../components/profile/Activity';
import Pricing from '../components/profile/pricing';
import Dashboard from '../components/profile/Dashboard';
import Schedule from '../components/profile/Schedule';
import ClientInfo from '../components/profile/ClientInfo';
import ClientConfirmation from '../components/profile/ClientConfirmation';
import Settings from '../components/profile/Settings';
import Help from '../components/profile/help';
import SelfProfile from '../components/profile/SelfProfile';
import BusinessProfile from '../components/profile/settings-sections/BusinessProfileContainer';
// import HomeCommunities from '../components/community-sections/HomeCommunities';
import SubCategoryCommunities from '../components/community-sections/SubCategoryCommunities';
import SingleSubCategoryComunities from '../components/community-sections/SingleSubCategoryComunities';
import ToolsAndTips from '../components/community-sections/ToolsAndTips';
import Company from '../components/community-sections/Company';
import Awaiting from '../components/locations/Awaiting';
import VideoPlay from '../components/community-sections/VideoPlay';
import TodaysAudition from '../components/locations/TodaysAudition';
import OhNo from '../components/locations/OhNo';
import Great from '../components/locations/Great';
import FinishedSessions from '../components/profile/FinishedSessions';
import BecomePractitioner from '../components/profile/BecomePractitioner';
import BookAgain from '../components/profile/BookAgain';
import CheckInOut from '../components/check-in-out/CheckInOut';
import Awesome from '../components/profile/Awesome';
import RockedIt from '../components/profile/RockedIt';
import Membership from '../components/profile/Membership';
import MyReviews from '../components/profile/MyReviews';
import CardDetails from '../components/profile/CardDetails';
import Auditions from '../components/profile/Auditions';
import SetLocation from '../components/profile/SetLocation';
import ConfirmedSession from '../components/profile/confirmed-sessions/ConfirmedSession';
import ImageLoading from '../custom-components/ImageLoading';
// Icons
import LocationIcon from '../images/icons/location.png';
// import ActivityIcon from '../images/icons/activity.png';
import PricingIcon from '../images/icons/pricing.png';
import DashboardIcon from '../images/icons/dashboard.png';
import Calendar from '../images/icons/calendar.png';
import SettingsIcon from '../images/icons/settings.png';
import HelpIcon from '../images/icons/help.png';
import BecomeExpert from '../images/icons/becomeExpert.png';
import CheckInOutIcon from '../images/icons/checkInOut.png';
import UserConfig from '../images/icons/userConfig.png';
import Sessions from '../images/icons/sessions.png';
import Camera from '../images/icons/cameraViolet.png';
import { isMember as checkIsMember } from '../helpers/membership';

import styles from '../styles/DrawerStyles';
import COLORS from '../constants/colorsConstants';

let role = null;

export const CountBadge = ({ count, containerStyle = {} }) => (
  count !== null && (
    <View style={[styles.CountContainer, containerStyle]}>
      <Text style={styles.MenuItemCount}>{count}</Text>
    </View>
  )
);

export const MenuItem = ({ title = '', count = null }) => (
  <View style={styles.MenuItemContainer}>
    <Text style={styles.ItemText}>{title}</Text>
    <CountBadge count={count} />
  </View>
);
class CustomDrawerContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateToNextPage = () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Profile');
  };

  render() {
    const { screenProps: { profile } } = this.props;
    if (profile) {
      const { role: profileRole } = profile;
      role = profileRole;
    }

    const build = `Version ${VersionNumber.appVersion}.${VersionNumber.buildVersion}`;

    return (
      profile && role !== null
      && (
        <View style={styles.drawerContainer}>
          <View style={styles.container}>
            <View style={styles.topDrawer}>
              <TouchableOpacity
                onPress={() => this.navigateToNextPage()}
                delayPressIn={20}
              >
                <ImageLoading
                  style={styles.topDrawerImage}
                  source={{ uri: profile && profile.image }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.navigateToNextPage()}
                delayPressIn={20}
              >
                <Text style={styles.topDrawerName}>{profile ? profile.username : ''}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.navigateToNextPage()}
                delayPressIn={20}
              >
                <Text style={styles.topDrawerViewProfile}>View Profile</Text>
              </TouchableOpacity>
            </View>
            <DrawerItems {...this.props} />
          </View>
          <Text>{build}</Text>
        </View>
      )
    );
  }
}

CustomDrawerContentComponent.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  screenProps: PropTypes.shape({
    profile: PropTypes.shape({
      role: PropTypes.string.isRequired,
    }),
  }),
};

CustomDrawerContentComponent.defaultProps = {
  screenProps: null,
};

const { width } = Dimensions.get('window');
const routeConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: () => (role === 'practitioner' ? null : <MenuItem title="Home" />),
      drawerIcon: () => (role === 'practitioner' ? null : (<Image style={styles.topDrawerItems} source={LocationIcon} />)),
    },
  },
  Dashboard: {
    screen: props => <Dashboard {...props} />,
    navigationOptions: {
      drawerLabel: () => (role === 'practitioner' ? <MenuItem title="Dashboard" /> : null),
      drawerIcon: () => (role === 'practitioner' ? (<Image style={styles.topDrawerItems} source={DashboardIcon} />) : null),
    },
  },
  BusinessProfile: {
    screen: props => <BusinessProfile {...props} />,
    navigationOptions: {
      drawerLabel: () => (role === 'practitioner' ? <MenuItem title="Business Profile" /> : null),
      drawerIcon: () => (role === 'practitioner' ? (<Image style={styles.topDrawerItems} source={UserConfig} />) : null),
    },
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: (props) => {
      const { screenProps: { countNotAccepted } } = props;
      return {
        drawerLabel: () => (role === 'practitioner'
          ? <MenuItem title="Schedule" count={countNotAccepted} />
          : null
        ),
        drawerIcon: () => (role === 'practitioner' ? (<Image style={styles.topDrawerItems} source={Calendar} />) : null),
      };
    },
  },
  // HomeCommunities: {
  //   screen: HomeCommunities,
  //   navigationOptions: {
  //     drawerLabel: () => (role === 'practitioner' ? null : 'Home'),
  //     drawerIcon: () => (role === 'practitioner' ? null :
  // (<Image style={styles.topDrawerItems} source={LocationIcon} />)),
  //   },
  // },
  CheckInOut: {
    screen: CheckInOut,
    navigationOptions: {
      drawerLabel: () => (role === 'user' ? null : <MenuItem title="Check In/Out" />),
      drawerIcon: () => (role === 'user' ? null : <Image style={styles.topDrawerItems} source={CheckInOutIcon} />),
    },
  },
  Pricing: {
    screen: (props) => {
      const { screenProps: { profile } } = props;
      return !checkIsMember(profile) ? <Pricing {...props} /> : <Membership {...props} />;
    },
    navigationOptions: {
      drawerLabel: () => (role === 'practitioner' ? null : <MenuItem title="SELFTAPE PRO" />),
      drawerIcon: () => (role === 'practitioner' ? null : (<Image style={styles.topDrawerItems} source={PricingIcon} />)),
    },
  },
  Help: {
    screen: props => <Help {...props} />,
    navigationOptions: {
      drawerLabel: () => <MenuItem title="Help" />,
      drawerIcon: () => (<Image style={styles.topDrawerItems} source={HelpIcon} />),
    },
  },
  BecomePractitioner: {
    screen: BecomePractitioner,
    navigationOptions: {
      drawerLabel: () => (role === 'practitioner' ? null : <MenuItem title="Become a Practitioner" />),
      drawerIcon: () => (role === 'practitioner' ? null : (<Image style={styles.topDrawerItems} source={BecomeExpert} />)),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: () => <MenuItem title="Settings" />,
      drawerIcon: () => (<Image style={styles.topDrawerItems} source={SettingsIcon} />),
    },
  },
  PastSessions: {
    screen: props => <FinishedSessions {...props} isConfirmation={false} goBack="Home" />,
    navigationOptions: {
      drawerLabel: () => (role !== 'practitioner' ? <MenuItem title="Past Sessions" /> : null),
      drawerIcon: () => (role !== 'practitioner' ? (<Image style={styles.topDrawerItems} source={Sessions} />) : null),
    },
  },
  UpcomingSessions: {
    screen: props => (<FinishedSessions {...props} isConfirmation goBack="Home" />),
    navigationOptions: (props) => {
      const { screenProps: { countNewSessions, } } = props;
      return {
        drawerLabel: () => (role !== 'practitioner'
          ? <MenuItem title="Upcoming Sessions" count={countNewSessions} />
          : null
        ),
        drawerIcon: () => (role !== 'practitioner' ? (<Image style={styles.topDrawerItems} source={Camera} />) : null),
      };
    },
  },
  Awaiting: {
    screen: Awaiting,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  TodaysAudition: {
    screen: TodaysAudition,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Awesome: {
    screen: Awesome,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Auditions: {
    screen: Auditions,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  RockedIt: {
    screen: RockedIt,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  OhNo: {
    screen: OhNo,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Great: {
    screen: Great,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  FinishedSessions: {
    screen: FinishedSessions,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  BookAgain: {
    screen: BookAgain,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Membership: {
    screen: Membership,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  MyReviews: {
    screen: MyReviews,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  CardDetails: {
    screen: CardDetails,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  VideoPlay: {
    screen: VideoPlay,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  ToolsAndTips: {
    screen: ToolsAndTips,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Company: {
    screen: Company,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  SubCategoryCommunities: {
    screen: SubCategoryCommunities,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  SingleSubCategoryComunities: {
    screen: SingleSubCategoryComunities,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  ClientInfo: {
    screen: ClientInfo,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  SetLocation: {
    screen: SetLocation,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  ClientConfirmation: {
    screen: ClientConfirmation,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  SelfProfile: {
    screen: props => <SelfProfile {...props} />,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Practitioners: {
    screen: ChoosePractitioners,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Book: {
    screen: BookSession,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Practitioner: {
    screen: PractitionerBio,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  BookConfirmation: {
    screen: BookSessionConfirmation,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  ConfirmedSession: {
    screen: ConfirmedSession,
    navigationOptions: {
      drawerLabel: () => null,
      header: () => null,
    },
  },
};

const drawerNavigatorConfig = {
  contentComponent: CustomDrawerContentComponent,
  drawerWidth: (width / 2) + (width / 8),
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToogleRoute: 'DrawerToogle',
};

const DrowerScreens = DrawerNavigator(routeConfigs, drawerNavigatorConfig, this.props);

const OnboardingUserStack = StackNavigator(
  {
    OnboardingUser: {
      screen: OnboardingUser,
      navigationOptions: {
        drawerLabel: () => null,
        header: () => null,
        drawerLockMode: 'locked-closed',
      },
    },
  },
);

export const AppNavigator = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        drawerLabel: () => null,
        header: () => null,
        drawerLockMode: 'locked-closed',
      },
    },
    SignUpUser: {
      screen: OnboardingUserStack,
      navigationOptions: {
        drawerLabel: () => null,
        header: () => null,
        drawerLockMode: 'locked-closed',
      },
    },
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => null,
        header: () => null,
        drawerLockMode: 'locked-closed',
      },
    },
    UsersChat: {
      screen: Chat,
      navigationOptions: {
        drawerLockMode: 'locked-closed',
      },
    },
    Agreement: {
      screen: Agreement,
      navigationOptions: {
        drawerLabel: () => null,
        header: () => null,
        drawerLockMode: 'locked-closed',
      },
    },
    DrowerScreens: {
      screen: DrowerScreens,
      navigationOptions: {
        header: () => null,
      },
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
        borderBottomColor: COLORS.MAIN_GREY,
        height: 40,
      },
    },
  },
);

export default AppNavigator;
