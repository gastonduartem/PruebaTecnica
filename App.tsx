import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {store} from './src/app/store';
import HomeScreen from './src/screens/HomeScreen';

// Provider le da acceso al store de Redux a toda la app.
// Todo lo que esté adentro puede usar selector y dispatch.
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <HomeScreen />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;