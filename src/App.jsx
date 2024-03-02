import Home from './page/Home.jsx';
import Product from './page/Product.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  // const navigate = useNavigate();

  return (
    <>
      <BrowserRouter>
        <div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-teal-300 p-1 mx-1 rounded shadow">
              home
            </button>
            <button
              onClick={() => alert('/product')}
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
          <p className="text-2xl text-center relative">selamat datang</p>
          <Home />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
