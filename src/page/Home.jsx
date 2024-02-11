import { useState, useEffect } from 'react';
import axios from 'axios';
import '../output.css';

const Home = () => {
  const api = 'http://localhost:5000';

  // submit
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errProduct, setErrProduct] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    addData();
  };

  const addData = async () => {
    try {
      await axios.post(
        `${api}/product`,
        { name, price }
        // { header: { Authorization: `Bearer ${token}` } }
      );
      getProducts();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrProduct(arrError);
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
    const response = await axios.get(
      `${api}/products?limit=${limit}&page=${page}&${key}`
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

  useEffect(() => {
    getProducts();
  }, [limit, page, key]);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-evenly mt-2">
        <div className="w-[95%] md:w-[45%] flex flex-wrap justify-between">
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
              based : _
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
          <div className="w-full rounded-md shadow-md shadow-teal-100 p-2">
            <table className="w-full">
              <tr className="bg-teal-300 border-b-2 border-teal-700">
                <th className="w-[10%]">no</th>
                <th className="w-[50%]">name</th>
                <th className="w-[30%]">price</th>
                <th className="w-[10%]">action</th>
              </tr>
              {products.map((product, index) => (
                <tr key={product.id} className="border-b border-teal-300">
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button className="text-xs w-full italic rounded p-1 bg-green-700 text-white">
                      update
                    </button>
                    <button className="text-xs w-full italic rounded p-1 bg-red-700 text-white">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className="w-[95%] md:w-[45%]">
          <div className="w-full rounded-md shadow-md shadow-teal-100 p-2">
            {errProduct && (
              <div className="text-xs text-red-700 italic rounded border border-red-700 mb-2 p-1">
                {errProduct.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}
            <form className="" onSubmit={handleSubmit}>
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
                add data
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
