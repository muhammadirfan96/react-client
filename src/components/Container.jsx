import GudangController from '../page/GudangController.jsx';
import InventoriBarang from '../page/InventoriBarang.jsx';
import LokasiPenyimpanan from '../page/LokasiPenyimpanan.jsx';
import PenerimaanBarang from '../page/PenerimaanBarang.jsx';
import PengirimanBarang from '../page/PengirimanBarang.jsx';
import PergeseranBarang from '../page/PergeseranBarang.jsx';
import StokBarang from '../page/StokBarang.jsx';
import Pemasok from '../page/Pemasok.jsx';
import Pelanggan from '../page/Pelanggan.jsx';
import Home from '../page/Home.jsx';
import Product from '../page/Product.jsx';
import NotFound from '../page/NotFound.jsx';
import Login from '../auth/Login.jsx';
import Register from '../auth/Register.jsx';
import ForgotPassword from '../auth/ForgotPassword.jsx';
import ActivationUser from '../auth/ActivationUser.jsx';
import ResetPassword from '../auth/ResetPassword.jsx';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = () => {
  const sbar = useSelector(state => state.bar.sidebar);
  const bbar = useSelector(state => state.bar.bottombar);

  return (
    <>
      <div
        className={`${
          sbar && 'md:ml-52'
        } mx-auto mt-[64px] pt-5 fixed right-0 left-0 top-0 md:bottom-0 overflow-x-auto ${
          !bbar ? 'bottom-20' : 'bottom-0'
        }`}>
        <Routes>
            <Route path="/gudang-controller" element={<GudangController />} />
          <Route path="/inventori-barang" element={<InventoriBarang />} />
          <Route path="/lokasi-penyimpanan" element={<LokasiPenyimpanan />} />
          <Route path="/penerimaan-barang" element={<PenerimaanBarang />} />
          <Route path="/pengiriman-barang" element={<PengirimanBarang />} />
          <Route path="/pergeseran-barang" element={<PergeseranBarang />} />
          <Route path="/stok-barang" element={<StokBarang />} />
          <Route path="/pemasok" element={<Pemasok />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/activation-user/:email" element={<ActivationUser />} />
          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default Container;
