import 'react-native-gesture-handler';
import React from 'react';
import RootNavigation from './src/routes/rootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store/store';
import {Provider} from 'react-redux';
import codePush from 'react-native-code-push';
const App = () => {
  try {
    return (
      <>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigation />
          </PersistGate>
        </Provider>
      </>
    );
  } catch (err) {
    console.log('err', err);
    // crashlytics().log(JSON.stringify(err));
    return null;
  }
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(codePushOptions)(App);
