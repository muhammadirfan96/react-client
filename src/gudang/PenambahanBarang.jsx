import { IoReceiptOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { axiosRT } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { setConfirmation } from '../redux/confirmationSlice.js';

const PenambahanBarang = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);
  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // submit
  const [jumlah, setJumlah] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [id_pemasok, setid_pemasok] = useState('');
  const [lokasi_penyimpanan, setlokasi_penyimpanan] = useState('');
  const [id_inventaris_barang, setid_inventaris_barang] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axiosInterceptors.patch(
        `/penambahan-barang/${id_inventaris_barang}`,
        {
          jumlah,
          tanggal,
          id_pemasok,
          lokasi_penyimpanan
        }
      );

      dispatch(
        setNotification({
          message: 'barang ditambahkan ke inventori',
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
    setlokasi_penyimpanan('');
    setid_inventaris_barang('');
    setInputInventoriBarang(true);
    setNamaInventoriBarang('');
    setid_pemasok('');
    setInputPemasok(true);
    setNamaPemasok('');
  };

  // option select id_inventaris_barang
  const [inventoriBarang, setInventoriBarang] = useState([]);
  const [keyInventoriBarang, setKeyInventoriBarang] = useState('');

  const findInventoriBarang = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/inventori-barang?nama=${keyInventoriBarang}`
      );
      setInventoriBarang(response.data.data);
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  useEffect(() => {
    findInventoriBarang();
  }, [keyInventoriBarang]);

  //  input id_inventaris_barang
  const [inputInventoriBarang, setInputInventoriBarang] = useState(true);
  const [namaInventoriBarang, setNamaInventoriBarang] = useState('');

  const handleChangeOptionSelectInventori = event => {
    const selected = event.target[event.target.selectedIndex];
    setid_inventaris_barang(selected.value);
    setInputInventoriBarang(true);
    setNamaInventoriBarang(selected.getAttribute('data-additional-info'));
  };

  // option select id_pemasok
  const [pemasok, setPemasok] = useState([]);
  const [keyPemasok, setKeyPemasok] = useState('');

  const findPemasok = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/pemasok?nama=${keyPemasok}`
      );
      setPemasok(response.data.data);
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  useEffect(() => {
    findPemasok();
  }, [keyPemasok]);

  //  input id_pemasok
  const [inputPemasok, setInputPemasok] = useState(true);
  const [namaPemasok, setNamaPemasok] = useState('');

  const handleChangeOptionSelectPemasok = event => {
    const selected = event.target[event.target.selectedIndex];
    setid_pemasok(selected.value);
    setInputPemasok(true);
    setNamaPemasok(selected.getAttribute('data-additional-info'));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-[95%] md:w-[45%] aspect-video rounded shadow bg-teal-700 m-2 p-2 ">
        <p className="text-white text-center border-b border-white">
          penambahan barang
        </p>
        <IoReceiptOutline className="w-36 h-36 text-white mx-auto" />
      </button>

      {/*modal*/}
      {showModal && (
        <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 bg-white relative">
            <p className="text-center border-b-2 border-teal-700 mb-2">
              penerimaan barang (lama)
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
                {inputInventoriBarang ? (
                  <button
                    type="button"
                    className="w-full p-1 mb-1 rounded-md border text-start"
                    onClick={() => setInputInventoriBarang(false)}>
                    {namaInventoriBarang ? (
                      namaInventoriBarang
                    ) : (
                      <span className="text-slate-400">inventori...</span>
                    )}
                  </button>
                ) : (
                  <div className="flex justify-between">
                    <select
                      value={id_inventaris_barang}
                      onChange={handleChangeOptionSelectInventori}
                      className="w-[50%] p-1 mb-1 rounded-md rounded-r-none border">
                      <option selected value="">
                        list inventori...
                      </option>
                      {inventoriBarang.map(each => (
                        <option
                          value={each._id}
                          data-additional-info={each.nama}>
                          {each.nama}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="search_inventori"
                      className="w-[50%] p-1 mb-1 rounded-md rounded-l-none border"
                      value={keyInventoriBarang}
                      onChange={e => setKeyInventoriBarang(e.target.value)}
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
                  placeholder="lokasi_penyimpanan"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={lokasi_penyimpanan}
                  onChange={e => setlokasi_penyimpanan(e.target.value)}
                />
                {inputPemasok ? (
                  <button
                    type="button"
                    className="w-full p-1 mb-1 rounded-md border text-start"
                    onClick={() => setInputPemasok(false)}>
                    {namaPemasok ? (
                      namaPemasok
                    ) : (
                      <span className="text-slate-400">pemasok...</span>
                    )}
                  </button>
                ) : (
                  <div className="flex justify-between">
                    <select
                      value={id_pemasok}
                      onChange={handleChangeOptionSelectPemasok}
                      className="w-[50%] p-1 mb-1 rounded-md rounded-r-none border">
                      <option selected value="">
                        list pemasok...
                      </option>
                      {pemasok.map(each => (
                        <option
                          value={each._id}
                          data-additional-info={each.nama}>
                          {each.nama}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="search_inventori"
                      className="w-[50%] p-1 mb-1 rounded-md rounded-l-none border"
                      value={keyPemasok}
                      onChange={e => setKeyPemasok(e.target.value)}
                    />
                  </div>
                )}
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

export default PenambahanBarang;
