import { BsSpeedometer, BsBasket, BsCaretRight } from 'react-icons/bs';
import { AiOutlineShopping, AiOutlineStock } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { IoReceiptOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoIosPaperPlane } from 'react-icons/io';
import { MdCompareArrows, MdOutlineStorage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const navigate = useNavigate();
  const sbar = useSelector(state => state.bar.sidebar);

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
          !sbar && '-ml-52'
        } overflow-auto hidden md:block bg-teal-300 border-teal-700 border-r-2 fixed left-0 top-[64px] bottom-0 w-52 p-4 transition-all`}>
        <div className="flex flex-col">
          {menu.map(each => (
            <button
              onClick={() => navigate(`/${each.path}`)}
              className="bg-teal-700 py-1 px-2 m-1 rounded shadow text-start text-white relative">
              <div className="inline-block mr-2">{each.icon}</div>
              {each.name}
              <BsCaretRight className="absolute right-1 top-2" />
            </button>
          ))}

          <button
            onClick={() => navigate('/product')}
            className="bg-teal-700 py-1 px-2 m-1 rounded shadow text-start text-white relative">
            <BsBasket className="inline mr-2" />
            product
            <BsCaretRight className="absolute right-1 top-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
