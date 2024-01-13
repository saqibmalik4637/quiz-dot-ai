import store from './src/redux/store';
import { Provider } from 'react-redux';
import Navigation from './src/Navigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
