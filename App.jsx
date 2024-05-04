import Navigation from './src/Navigation';
import store from './src/store';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

library.add(fab, faSquareCheck, faMagnifyingGlass)

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
