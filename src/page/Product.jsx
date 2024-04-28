import { useState, useEffect } from 'react';
import { axiosRT } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { setConfirmation } from '../redux/confirmationSlice.js';

const Product = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);

  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // submit
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errForm, setErrForm] = useState(null);
  const [form, setForm] = useState(null);

  const handleAdd = () => {
    setForm(null);
    setNamaModal('add product');
    openModal();
  };

  const handleUpdate = async id => {
    setForm({ id: id });
    setNamaModal('update product');
    const oldData = await axiosInterceptors.get(`/product/${id}`);
    openModal();
    setName(oldData.data?.name);
    setPrice(oldData.data?.price);
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
      await axiosInterceptors.post(`/product`, { name, price });
      dispatch(
        setNotification({
          message: 'new data has been added',
          background: 'bg-teal-100'
        })
      );
      closeModal();
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const updateData = async id => {
    try {
      await axiosInterceptors.patch(`/product/${id}`, {
        name,
        price
      });

      dispatch(
        setNotification({
          message: 'selected data has been updated',
          background: 'bg-teal-100'
        })
      );
      closeModal();
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const deleteData = async id => {
    try {
      await axiosInterceptors.delete(`/product/${id}`);
      dispatch(
        setNotification({
          message: 'selected data has been deleted',
          background: 'bg-teal-100'
        })
      );
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  // view data
  const [products, setProducts] = useState([]);
  const [allPage, setAllPage] = useState(0);

  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState('');
  const [search, setSearch] = useState('');
  const [searchBased, setSearchBased] = useState('name');

  const getProducts = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/products?limit=${limit}&page=${page}&${key}`
      );
      setProducts(response.data.data);
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
    setName('');
    setPrice('');
  };

  useEffect(() => {
    getProducts();
  }, [limit, page, key]);

  return (
    <>
      {token ? (
        <div className="flex flex-wrap gap-2 justify-evenly mt-2">
          <div className="w-[95%] md:w-[75%] lg:w-[45%]">
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
                    <option selected>name</option>
                    <option disabled>price</option>
                  </select>
                  <button
                    onClick={() => setKey(`${searchBased}=${search}`)}
                    className="text-xs text-white italic bg-green-700 px-1 rounded">
                    go
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
            <button
              onClick={handleAdd}
              className="w-full p-1 mb-2 rounded-md border bg-teal-300 text-xs">
              add product
            </button>
            <div className="w-full rounded-md shadow-md shadow-teal-100 p-2">
              <table className="w-full">
                <tr className="bg-teal-300 border-b-2 border-teal-700">
                  <th className="w-[10%]">no</th>
                  <th className="w-[50%]">name</th>
                  <th className="w-[30%]">price</th>
                  <th className="w-[10%]">action</th>
                </tr>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-b border-teal-300">
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="text-xs w-full italic rounded p-1 bg-green-700 text-white">
                        update
                      </button>
                      <button
                        onClick={() =>
                          dispatch(
                            setConfirmation({
                              message:
                                'the selected data will be permanently delete ?',
                              handleOke: () => handleDelete(product._id),
                              handleCancel: () =>
                                dispatch(setConfirmation(false))
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
      ) : (
        <div className="text-center p-4 m-4 rounded bg-red-100">
          unauthorized
        </div>
      )}
      {showModal && (
        <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 bg-white relative">
            <p className="text-center border-b-2 border-teal-700 mb-2">
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
                  placeholder="product name"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="price"
                  className="w-full p-1 mb-1 rounded-md border"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
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

export default Product;
