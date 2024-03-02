import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosDefault } from '../config/axios.js';
import '../output.css';
import { Confirmation, Notification } from '../components/Alert.jsx';

const Home = () => {
  const api = 'http://localhost:5000';

  // submit
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errForm, setErrForm] = useState(null);
  const [form, setForm] = useState(null);

  const handleAdd = () => {
    setForm(null);
    openModal();
  };

  const handleUpdate = async id => {
    setForm({ id: id });
    const oldData = await axios.get(`${api}/product/${id}`);
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
    setConfirmation(false);
  };

  const addData = async () => {
    try {
      await axios.post(
        `${api}/product`,
        { name, price }
        // { header: { Authorization: `Bearer ${token}` } }
      );

      setNotification({ message: 'new data has been added' });
      closeModal();
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const updateData = async id => {
    try {
      await axios.patch(`${api}/product/${id}`, {
        name,
        price
      });

      setNotification({ message: 'selected data has been updated' });
      closeModal();
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const deleteData = async id => {
    try {
      await axios.delete(`${api}/product/${id}`);
      setNotification({ message: 'selected data has been deleted' });
      getProducts();
    } catch (e) {
      setNotification({ message: e.message });
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
    const response = await axiosDefault.get(
      `/products?limit=${limit}&page=${page}&${key}`
    );
    setProducts(response.data.data);
    setAllPage(response.data.all_page);
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
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setName('');
    setPrice('');
  };

  // notification
  const [notification, setNotification] = useState(false);
  if (notification)
    setTimeout(function () {
      setNotification(false);
    }, 3000);

  // confirmation
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    getProducts();
  }, [limit, page, key]);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly mt-2">
        <div className="w-[95%] md:w-[45%]">halaman home</div>
      </div>
      <Confirmation confirmation={confirmation} />
      <Notification notification={notification} />
    </>
  );
};

export default Home;
