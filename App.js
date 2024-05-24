import { enableScreens } from 'react-native-screens';
enableScreens();

import * as Svg from 'react-native-svg';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import Navigation from './src/Navigation';
import store from './src/store';

export default function App() {

  useEffect(() => {
    // await mobileAds().setRequestConfiguration({
    //         // Update all future requests suitable for parental guidance
    //         maxAdContentRating: MaxAdContentRating.PG,

    //         // Indicates that you want your content treated as child-directed for purposes of COPPA.
    //         tagForChildDirectedTreatment: true,

    //         // Indicates that you want the ad request to be handled in a
    //         // manner suitable for users under the age of consent.
    //         tagForUnderAgeOfConsent: true,

    //         // An array of test device IDs to allow.
    //         testDeviceIdentifiers: ['EMULATOR'],
    //       }).then(() => {
            
    //       });
    mobileAds().initialize().then(adapterStatuses => {
      console.log("mobileAds initialized");
    });
  }, [])

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
