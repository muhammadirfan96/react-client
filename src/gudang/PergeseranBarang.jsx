import { MdCompareArrows } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { axiosRT } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { setConfirmation } from '../redux/confirmationSlice.js';

const PergeseranBarang = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);
  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // submit
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [lokasi_tujuan, setlokasi_tujuan] = useState('');
  const [id_lokasi_penyimpanan, setid_lokasi_penyimpanan] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axiosInterceptors.patch(
        `/pergeseran-barang/${id_lokasi_penyimpanan}`,
        {
          jumlah,
          tanggal,
          lokasi_tujuan
        }
      );

      dispatch(
        setNotification({
          message: 'pergeseran barang sukses',
          background: 'bg-teal-100'
        })
      );
      closeModal();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  // modal
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setJumlah('');
    setTanggal('');
    setlokasi_tujuan('');
    setid_lokasi_penyimpanan('');
    setInputLokasiPenyimpanan(true);
    setNamaLokasiPenyimpanan('');
  };

  // option select id_lokasi_penyimpanan
  const [lokasiPenyimpanan, setLokasiPenyimpanan] = useState([]);
  const [keyLokasiPenyimpanan, setKeyLokasiPenyimpanan] = useState('');

  const findLokasiPenyimpanan = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/lokasi-penyimpanan?lokasi=${keyLokasiPenyimpanan}`
      );

      const addedItemPromises = response.data.data.map(async element => {
        const [namaRes] = await Promise.all([
          axiosInterceptors.get(
            `/inventori-barang/${element.id_inventaris_barang}`
          )
        ]);
        return {
          nama: namaRes.data.nama
        };
      });

      const addedItem = await Promise.all(addedItemPromises);

      const result = response.data.data.map((item, index) => ({
        ...item,
        nama: addedItem[index].nama
      }));

      setLokasiPenyimpanan(result);
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  useEffect(() => {
    findLokasiPenyimpanan();
  }, [keyLokasiPenyimpanan]);

  //  input id_lokasi_penyimpanan
  const [inputLokasiPenyimpanan, setInputLokasiPenyimpanan] = useState(true);
  const [namaLokasiPenyimpanan, setNamaLokasiPenyimpanan] = useState('');

  const handleChangeOptionSelectLokasi = event => {
    const selected = event.target[event.target.selectedIndex];
    setid_lokasi_penyimpanan(selected.value);
    setInputLokasiPenyimpanan(true);
    setNamaLokasiPenyimpanan(selected.getAttribute('data-additional-info'));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-[95%] md:w-[45%] aspect-video rounded shadow bg-teal-700 m-2 p-2 ">
        <p className="text-white text-center border-b border-white">
          pergeseran barang
        </p>
        <MdCompareArrows className="w-36 h-36 text-white mx-auto" />
      </button>

      {/*modal*/}
      {showModal && (
        <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 bg-white relative">
            <p className="text-center border-b-2 border-teal-700 mb-2">
              pergeseran barang
            </p>
            <button
              onClick={closeModal}
              className="absolute -right-1 -top-1 rounded bg-red-700 px-1 text-white">
              x
            </button>
            <div className="max-h-96 md:max-h-72 overflow-auto p-2 mt-1">
              {errForm && (
                <div className="text-xs text-red-700 italic rounded border border-red-700 mb-2 p-1">
                  {errForm.map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                {inputLokasiPenyimpanan ? (
                  <button
                    type="button"
                    className="w-full p-1 mb-1 rounded-md border text-start"
                    onClick={() => setInputLokasiPenyimpanan(false)}>
                    {namaLokasiPenyimpanan ? (
                      namaLokasiPenyimpanan
                    ) : (
                      <span className="text-slate-400">barang...</span>
                    )}
                  </button>
                ) : (
                  <div className="flex justify-between">
                    <select
                      value={id_lokasi_penyimpanan}
                      onChange={handleChangeOptionSelectLokasi}
                      className="w-[50%] p-1 mb-1 rounded-md rounded-r-none border">
                      <option selected value="">
                        list barang...
                      </option>
                      {lokasiPenyimpanan.map(each => (
                        <option
                          value={each._id}
                          data-additional-info={each.nama}>
                          {each.nama +
                            ' | ' +
                            each.lokasi +
                            ' | ' +
                            each.jumlah}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="search_lokasi"
                      className="w-[50%] p-1 mb-1 rounded-md rounded-l-none border"
                      value={keyLokasiPenyimpanan}
                      onChange={e => setKeyLokasiPenyimpanan(e.target.value)}
                    />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="jumlah"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={jumlah}
                  onChange={e => setJumlah(e.target.value)}
                />
                <input
                  type="datetime-local"
                  placeholder="tanggal"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={tanggal}
                  onChange={e => setTanggal(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="lokasi_tujuan"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={lokasi_tujuan}
                  onChange={e => setlokasi_tujuan(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full p-1 mb-1 rounded-md border bg-teal-300">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PergeseranBarang;
