import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Confirmation, Notification } from './components/Alert.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import TopbarMobile from './components/TopbarMobile.jsx';
import Container from './components/Container.jsx';
import Bottombar from './components/Bottombar.jsx';


function App() {
  return (
    <>
      <Provider store={store}>
        <Topbar />
        <TopbarMobile />
        <Sidebar />
        <Container />
        <Bottombar />
        <Notification />
        <Confirmation />
      </Provider>
    </>
  );
}

export default App;
