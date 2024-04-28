import { useState, useEffect } from 'react';
import { axiosRT } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { setConfirmation } from '../redux/confirmationSlice.js';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const PengirimanBarang = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);

  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // view data
  const [pengirimanBarang, setPengirimanBarang] = useState([]);
  const [allPage, setAllPage] = useState(0);

  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState('');
  const [search, setSearch] = useState('');
  const [searchBased, setSearchBased] = useState('tanggal');

  const findPengirimanBarang = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/pengiriman-barang?limit=${limit}&page=${page}&${key}`
      );

      const addedItemPromises = response.data.data.map(async element => {
        const [namaRes, pelangganRes, createdByRes, updatedByRes] =
          await Promise.all([
            axiosInterceptors.get(
              `/inventori-barang/${element.id_inventaris_barang}`
            ),
            axiosInterceptors.get(`/pelanggan/${element.id_pelanggan}`),
            axiosInterceptors.get(`/user/${element.createdBy}`),
            axiosInterceptors.get(`/user/${element.updatedBy}`)
          ]);
        return {
          nama: namaRes.data.nama,
          pelanggan: pelangganRes.data.nama,
          createdBy: createdByRes.data.email,
          updatedBy: updatedByRes.data.email
        };
      });

      const addedItem = await Promise.all(addedItemPromises);

      const result = response.data.data.map((item, index) => ({
        ...item,
        nama: addedItem[index].nama,
        pelanggan: addedItem[index].pelanggan,
        created_by: addedItem[index].createdBy,
        updated_by: addedItem[index].updatedBy
      }));

      setPengirimanBarang(result);
      setAllPage(response.data.all_page);
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  const pageComponents = [];
  for (let i = 1; i <= allPage; i++) {
    pageComponents.push(
      <button
        onClick={() => setPage(i)}
        className={`${
          i == page ? 'bg-teal-300' : ''
        } text-xs px-1 mx-1 rounded border border-teal-100`}>
        {i}
      </button>
    );
  }

  useEffect(() => {
    findPengirimanBarang();
  }, [limit, page, key]);

  return token ? (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly mt-2">
        <div className="w-[95%] md:w-[75%] lg:w-[45%]">
          {/*judul*/}
          <p className="p-1 mb-2 shadow rounded bg-teal-300 text-center">
            pengiriman barang
          </p>

          {/*pagination*/}
          <div className="flex flex-wrap justify-between mb-2">
            <div className="w-[30%] rounded shadow shadow-teal-100 p-1">
              <p className="text-xs border-b border-teal-300">limit</p>
              <div>
                <input
                  type="button"
                  value="4"
                  onClick={e => setLimit(e.target.value)}
                  className={`${
                    limit == 4 ? 'bg-teal-300' : ''
                  } text-xs px-2 mx-1 rounded border border-teal-100`}
                />
                <input
                  type="button"
                  value="6"
                  onClick={e => setLimit(e.target.value)}
                  className={`${
                    limit == 6 ? 'bg-teal-300' : ''
                  } text-xs px-2 mx-1 rounded border border-teal-100`}
                />
                <input
                  type="button"
                  value="8"
                  onClick={e => setLimit(e.target.value)}
                  className={`${
                    limit == 8 ? 'bg-teal-300' : ''
                  } text-xs px-2 mx-1 rounded border border-teal-100`}
                />
              </div>
            </div>
            <div className="w-[30%] rounded shadow shadow-teal-100 p-1">
              <p className="text-xs border-b border-teal-300 mb-1">page</p>
              <div className="flex overflow-auto">{pageComponents}</div>
            </div>
            <div className="w-[30%] rounded shadow shadow-teal-100 p-1">
              <p className="text-xs border-b border-teal-300">
                <select
                  value={searchBased}
                  onChange={e => setSearchBased(e.target.value)}>
                  <option selected>tanggal</option>
                  <option value="id_inventaris_barang">inventori</option>
                  <option value="id_pelanggan">pelanggan</option>
                </select>
                <button
                  onClick={() => setKey(`${searchBased}=${search}`)}
                  className="text-xs text-white italic bg-green-700 p-1 ml-1 rounded">
                  <HiMiniMagnifyingGlass />
                </button>
              </p>
              <div className="overflow-auto">
                <input
                  type="text"
                  autocomplete="off"
                  placeholder="..."
                  className="border border-teal-100 rounded"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*tabel*/}
          <div className="w-full rounded-md shadow-md shadow-teal-100 p-2 overflow-auto">
            <table className="w-full">
              <tr className="bg-teal-300 border-b-2 border-teal-700">
                <th className="px-2">nama</th>
                <th className="px-2">jumlah</th>
                <th className="px-2">tanggal</th>
                <th className="px-2">pelanggan</th>
                <th className="px-2">created_by</th>
                <th className="px-2">updated_by</th>
                <th className="px-2">created_at</th>
                <th className="px-2">updated_at</th>
              </tr>
              {pengirimanBarang.map(each => (
                <tr key={each._id} className="border-b border-teal-300">
                  <td className="px-2">{each.nama}</td>
                  <td className="px-2">{each.jumlah}</td>
                  <td className="px-2">{each.tanggal}</td>
                  <td className="px-2">{each.pelanggan}</td>
                  <td className="px-2">{each.created_by}</td>
                  <td className="px-2">{each.updated_by}</td>
                  <td className="px-2">{each.createdAt}</td>
                  <td className="px-2">{each.updatedAt}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center p-4 m-4 rounded bg-red-100">unauthorized</div>
  );
};

export default PengirimanBarang;
