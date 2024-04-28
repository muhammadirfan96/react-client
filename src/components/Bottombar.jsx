import { BsSpeedometer, BsBasket, BsCaretRight } from 'react-icons/bs';
import { AiOutlineShopping, AiOutlineStock } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { IoReceiptOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoIosPaperPlane } from 'react-icons/io';
import { MdCompareArrows, MdOutlineStorage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBottombar } from '../redux/barSlice.js';

const Bottombar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bbar = useSelector(state => state.bar.bottombar);

  const menu = [
    {
      path: 'gudang-controller',
      icon: <BsSpeedometer />,
      name: 'manage'
    },
    {
      path: 'inventori-barang',
      icon: <AiOutlineShopping />,
      name: 'inventori'
    },
    {
      path: 'lokasi-penyimpanan',
      icon: <MdOutlineStorage />,
      name: 'lokasi'
    },
    {
      path: 'penerimaan-barang',
      icon: <IoReceiptOutline />,
      name: 'penerimaan'
    },
    {
      path: 'pengiriman-barang',
      icon: <IoIosPaperPlane />,
      name: 'pengiriman'
    },
    {
      path: 'pergeseran-barang',
      icon: <MdCompareArrows />,
      name: 'pergeseran'
    },
    {
      path: 'stok-barang',
      icon: <AiOutlineStock />,
      name: 'stok'
    },
    {
      path: 'pemasok',
      icon: <IoPeopleOutline />,
      name: 'pemasok'
    },
    {
      path: 'pelanggan',
      icon: <FaUserFriends />,
      name: 'pelanggan'
    }
  ];

  return (
    <>
      <div
        className={`${
          bbar && '-mb-[62px]'
        } fixed bottom-0 right-0 left-0 h-16 border-t-2 border-t-teal-700 bg-teal-300 md:hidden transition-all`}>
        <button
          onClick={() => dispatch(setBottombar())}
          className="absolute right-0 -top-[28px] bg-teal-700 pt-1 px-3 rounded-tl-lg">
          <span
            className={`${
              !bbar && 'translate-x-2'
            } border-2 rounded-sm border-white bg-white font-extrabold inline-block rotate-45 transition delay-500 h-4 mr-0.5`}></span>
          <span
            className={`${
              !bbar && '-translate-x-2'
            } border-2 rounded-sm border-black bg-black font-extrabold inline-block -rotate-45 transition delay-500 h-4 ml-0.5`}></span>
        </button>

        <div className="overflow-auto flex p-1 transition-all text-center w-full">
          {menu.map(each => (
            <button
              onClick={() => navigate(`/${each.path}`)}
              className="bg-teal-700 text-white rounded-md p-1 m-1">
              <div className="w-10 h-10 flex justify-center items-center">{each.icon}</div>
            </button>
          ))}

          <button
            onClick={() => navigate('/product')}
            className="bg-teal-700 text-white rounded-md p-1 m-1">
            <div className="w-10 h-10 flex justify-center items-center">
              <BsBasket />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Bottombar;
