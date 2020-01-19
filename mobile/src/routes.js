import { createAppContainer } from 'react-navigation';
import { crateStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from '.pages/Profile';

const Routes = createAppContainer(
    crateStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#7D40E7'
            },
        },
    })
);

export default Routes;