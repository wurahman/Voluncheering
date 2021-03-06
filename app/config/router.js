import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { View, Text, Platform, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation'
import { Login, OpportunityList, OpportunityDetails,
         Profile, ProfileEdit, MyStuff, SignUp, TnC } from '~/components'
import { colors } from '~/styles'
import { images } from '~/images'

const navHeader = {
  navigationOptions: {
    headerTintColor: colors.black,
  }
}

const AuthStack = StackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    TnC: { screen: TnC },
    SignUp: { screen: SignUp },
  },
  {
    ...navHeader
  }
)

const OpportunitiesStack = StackNavigator(
  {
    OpportunityList: { screen: OpportunityList },
    OpportunityDetails: { screen: OpportunityDetails },
  },
  {
    ...navHeader
  }
)

const ProfileStack = StackNavigator(
  {
    Profile: { screen: Profile },
    ProfileEdit: { screen: ProfileEdit },
  },
  {
    ...navHeader
  }
)

const MyStuffStack = StackNavigator(
  {
    MyStuff: { screen: MyStuff },
    OpportunityDetails: { screen: OpportunityDetails },
  },
  {
    ...navHeader
  }
)

const Tabs = TabNavigator(
  {
    Opportunities: {
      screen: OpportunitiesStack,
      navigationOptions: {
        tabBarLabel: 'Opportunities',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icList} />
        )
      }
    },
    MyStuff: {
      screen: MyStuffStack,
      navigationOptions: {
        tabBarLabel: 'My Opps',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icDoneAll} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor, focused}) => (
          <Image style={{width: 24, height: 24, tintColor: tintColor}} source={images.icPerson} />
        )
      }
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#007aff',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: colors.tabsBackground
      },
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
    }
  }
)

export const AppNavigator = StackNavigator(
  {
    Auth: { screen: AuthStack },
    Home: { screen: Tabs },
  },
  {
    headerMode: 'none',
  }
)

const AppNavigationWithState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppNavigationWithState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppNavigationWithState)