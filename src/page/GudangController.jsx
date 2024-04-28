import { IoReceiptOutline } from 'react-icons/io5';
import { IoIosPaperPlane } from 'react-icons/io';
import { MdCompareArrows } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import PenambahanBarang from '../gudang/PenambahanBarang.jsx';
import PenerimaanBarang from '../gudang/PenerimaanBarang.jsx';
import PengirimanBarang from '../gudang/PengirimanBarang.jsx';
import PergeseranBarang from '../gudang/PergeseranBarang.jsx';
import { useSelector } from 'react-redux';

const GudangController = () => {
  const token = useSelector(state => state.jwToken.token);
  return token ? (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly mt-2">
        <div className="w-[95%] md:w-[75%] lg:w-[45%]">
          {/*judul*/}
          <p className="p-1 mb-2 shadow rounded bg-teal-300 text-center">
            manage gudang
          </p>
          <div className="flex flex-wrap justify-evenly gap-2">
            <PenambahanBarang />
            <PenerimaanBarang />
            <PengirimanBarang />
            <PergeseranBarang/>

            
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center p-4 m-4 rounded bg-red-100">unauthorized</div>
  );
};

export default GudangController;
