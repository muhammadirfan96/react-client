import Home from './page/Home.jsx';
import Product from './page/Product.jsx';
import NotFound from './page/NotFound.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';
import ActivationUser from './auth/ActivationUser.jsx';
import ResetPassword from './auth/ResetPassword.jsx';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Confirmation, Notification } from './components/Alert.jsx';
import Navigate from './components/Navigate.jsx';

function App() {
  return (
    <>
      <Provider store={store}>
        <Navigate />

        <Notification />
        <Confirmation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/activation-user/:email" element={<ActivationUser />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
