import Home from './page/Home.jsx';
import Product from './page/Product.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Confirmation, Notification } from './components/Alert.jsx';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Provider store={store}>
        <div className="">
          <div className="flex justify-center my-2">
            <button
              onClick={() => navigate('/')}
              className="bg-teal-300 p-1 mx-1 rounded shadow">
              home
            </button>
            <button
              onClick={() => navigate('/product')}
              className="bg-teal-300 p-1 mx-1 rounded shadow">
              product
            </button>
            <button className="bg-teal-300 p-1 mx-1 rounded shadow">
              login
            </button>
            <button className="bg-teal-300 p-1 mx-1 rounded shadow">
              logout
            </button>
          </div>
        </div>

        <Notification />
        <Confirmation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
