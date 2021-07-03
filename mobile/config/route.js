import {createStackNavigator,createDrawerNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/Home';
import DoctorScreen from '../screens/Doctor';
import Drawer from '../components/Drawer';
import SignUpScreen from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import ProfileScreen from '../screens/Profile';


const DoctorStack = createStackNavigator({
    DoctorScreen:{screen: DoctorScreen},

});

const ProfileStack = createStackNavigator({
    ProfileScreen: {screen: ProfileScreen},
})

const DrawerNavigation = createDrawerNavigator({
    Doctors: {
        screen: DoctorStack,
        navigationOptions : {
            drawerLabel: 'الاطباء',
        }

    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            drawerLabel: 'الملف الشخصي'
        }
    }
} , {
    contentOptions: {
        itemStyle: {
            flexDirection: 'row-reverse'
        },
        labelStyle: {
            fontSize:18,
            marginRight:5
        },
        activeTintColor: '#fff',
        activeBackgroundColor: '#007bff'
    },
    drawerPosition:'right',
    drawerWidth:300,
    contentComponent: props => {
        <Drawer drawerProps ={props}/>
    }
});

export default createAppContainer(
    createStackNavigator({
        Main: HomeScreen,
        SignUp: SignUpScreen,
        SignIn: SignIn,
        DrawerNav: DrawerNavigation,
    }, {
        headerMode: 'none'
    })
)