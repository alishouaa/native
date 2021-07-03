import React, { Component, useEffect, useState } from 'react';
// import { AppLoading, Font, Permissions } from 'expo';
import * as Permissions from 'expo-permissions';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import AppNavigation from './config/route';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async UNSAFE_componentWillMount() {
    await Permissions.askAsync(Permissions.LOCATION);
  }

  async _getFonts() {
    await Font.loadAsync({
      'noto-font': require('./assets/fonts/NotoKufiArabic-Regular.ttf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          onError={console.warn}
          startAsync={this._getFonts}
          onFinish={() => this.setState({ isReady: true })}
        />
        // <AppLoading onFinish={() => this.setState({ isReady: true })} />
      );
    }
    return <AppNavigation />;
  }
}
