import { useState, useEffect } from 'react';
import { axiosRT } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { setConfirmation } from '../redux/confirmationSlice.js';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Pelanggan = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);

  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // submit
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kontak, setKontak] = useState('');
  const [errForm, setErrForm] = useState(null);
  const [form, setForm] = useState(null);

  const handleAdd = () => {
    setForm(null);
    setNamaModal('add pelanggan');
    openModal();
  };

  const handleUpdate = async id => {
    setForm({ id: id });
    setNamaModal('update pelanggan');
    const oldData = await axiosInterceptors.get(`/pelanggan/${id}`);
    openModal();
    setNama(oldData.data?.nama);
    setAlamat(oldData.data?.alamat);
    setKontak(oldData.data?.kontak);
  };

  const handleSubmit = event => {
    event.preventDefault();
    form ? updateData(form.id) : addData();
  };

  const handleDelete = id => {
    deleteData(id);
    dispatch(setConfirmation(false));
  };

  const addData = async () => {
    try {
      await axiosInterceptors.post(`/pelanggan`, { nama, alamat, kontak });
      dispatch(
        setNotification({
          message: 'new data has been added',
          background: 'bg-teal-100'
        })
      );
      closeModal();
      findPelanggan();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const updateData = async id => {
    try {
      await axiosInterceptors.patch(`/pelanggan/${id}`, {
        nama,
        alamat,
        kontak
      });

      dispatch(
        setNotification({
          message: 'selected data has been updated',
          background: 'bg-teal-100'
        })
      );
      closeModal();
      findPelanggan();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const deleteData = async id => {
    try {
      await axiosInterceptors.delete(`/pelanggan/${id}`);
      dispatch(
        setNotification({
          message: 'selected data has been deleted',
          background: 'bg-teal-100'
        })
      );
      findPelanggan();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  // view data
  const [pelanggan, setPelanggan] = useState([]);
  const [allPage, setAllPage] = useState(0);

  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState('');
  const [search, setSearch] = useState('');
  const [searchBased, setSearchBased] = useState('nama');

  const findPelanggan = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/pelanggan?limit=${limit}&page=${page}&${key}`
      );

      const addedItemPromises = response.data.data.map(async element => {
        const [createdByRes, updatedByRes] = await Promise.all([
          axiosInterceptors.get(`/user/${element.createdBy}`),
          axiosInterceptors.get(`/user/${element.updatedBy}`)
        ]);
        return {
          createdBy: createdByRes.data.email,
          updatedBy: updatedByRes.data.email
        };
      });

      const addedItem = await Promise.all(addedItemPromises);

      const result = response.data.data.map((item, index) => ({
        ...item,
        created_by: addedItem[index].createdBy,
        updated_by: addedItem[index].updatedBy
      }));

      setPelanggan(result);
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

  // modal
  const [namaModal, setNamaModal] = useState('');
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setNama('');
    setAlamat('');
    setKontak('');
  };

  useEffect(() => {
    findPelanggan();
  }, [limit, page, key]);

  return token ? (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly mt-2">
        <div className="w-[95%] md:w-[75%] lg:w-[45%]">
          {/*judul*/}
          <p className="p-1 mb-2 shadow rounded bg-teal-300 text-center">
            pelanggan
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
                  <option selected>nama</option>
                  <option>alamat</option>
                  <option>kontak</option>
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
          {/*btn add*/}
          <button
            onClick={handleAdd}
            className="w-full p-1 mb-2 rounded-md border bg-teal-300 text-xs">
            add data
          </button>

          {/*tabel*/}
          <div className="w-full rounded-md shadow-md shadow-teal-100 p-2 overflow-auto">
            <table className="w-full">
              <tr className="bg-teal-300 border-b-2 border-teal-700">
                <th className="px-2">nama</th>
                <th className="px-2">alamat</th>
                <th className="px-2">kontak</th>
                <th className="px-2">created_by</th>
                <th className="px-2">updated_by</th>
                <th className="px-2">created_at</th>
                <th className="px-2">updated_at</th>
                <th className="px-2">action</th>
              </tr>
              {pelanggan.map(each => (
                <tr key={each._id} className="border-b border-teal-300">
                  <td className="px-2">{each.nama}</td>
                  <td className="px-2">{each.alamat}</td>
                  <td className="px-2">{each.kontak}</td>
                  <td className="px-2">{each.created_by}</td>
                  <td className="px-2">{each.updated_by}</td>
                  <td className="px-2">{each.createdAt}</td>
                  <td className="px-2">{each.updatedAt}</td>
                  <td className="px-2">
                    <button
                      onClick={() => handleUpdate(each._id)}
                      className="text-xs w-full italic rounded p-1 bg-green-700 text-white">
                      update
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          setConfirmation({
                            message:
                              'the selected data will be permanently delete ?',
                            handleOke: () => handleDelete(each._id),
                            handleCancel: () => dispatch(setConfirmation(false))
                          })
                        )
                      }
                      className="text-xs w-full italic rounded p-1 bg-red-700 text-white">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>

      {/*modal add/update*/}
      {showModal && (
        <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 bg-white relative"><p className="text-center border-b-2 border-teal-700 mb-2">
              {namaModal}
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
              <input
                type="text"
                placeholder="nama"
                className="w-full p-1 mb-1 rounded-md border"
                value={nama}
                onChange={e => setNama(e.target.value)}
              />
              <input
                type="text"
                placeholder="alamat"
                className="w-full p-1 mb-1 rounded-md border"
                value={alamat}
                onChange={e => setAlamat(e.target.value)}
              />
              <input
                type="text"
                placeholder="kontak"
                className="w-full p-1 mb-1 rounded-md border"
                value={kontak}
                onChange={e => setKontak(e.target.value)}
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
  ) : (
    <div className="text-center p-4 m-4 rounded bg-red-100">unauthorized</div>
  );
};

export default Pelanggan;
