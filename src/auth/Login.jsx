import { useState, useEffect } from 'react';
import { axiosDefault, axiosRefreshToken } from '../config/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setExpire, setUsername } from '../redux/tokenSlice.js';
import { setNotification } from '../redux/notificationSlice.js';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axiosDefault.post('/login', { email, password });

      const decoded = jwtDecode(response.data);
      dispatch(setToken(response.data));
      dispatch(setExpire(decoded.exp));
      dispatch(setUsername(decoded.email));
      dispatch(
        setNotification({
          message: 'logged in',
          background: 'bg-teal-100'
        })
      );
      closeModal()
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div>
        <button
          onClick={openModal}
          className="bg-teal-300 p-1 m-1 rounded shadow">
          login
        </button>
      </div>
      {showModal && (
        <div className="bg-slate-900 bg-opacity-50 fixed right-0 left-0 top-0 bottom-0 z-10">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white mx-auto mt-20 relative">
            <button
              onClick={closeModal}
              className="absolute -right-1 -top-1 rounded bg-red-700 px-1 text-white">
              x
            </button>
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
                placeholder="email"
                className="w-full p-1 mb-1 rounded-md border"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="*********"
                className="w-full p-1 mb-1 rounded-md border"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full p-1 mb-1 rounded-md border bg-teal-300">
                submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
