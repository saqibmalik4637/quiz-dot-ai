import mobileAds from 'react-native-google-mobile-ads';
import { useEffect } from 'react';
import Navigation from './src/Navigation';
import store from './src/store';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

library.add(fab, faSquareCheck, faMagnifyingGlass)

useEffect(() => {
    (async () => {
      // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
      const { status: trackingStatus } = await requestTrackingPermissionsAsync();
      if (trackingStatus !== 'granted') {
        // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      }

      // Initialize the ads
      await mobileAds().initialize();
    })();
}, []);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
