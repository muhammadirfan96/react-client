import { useState } from 'react';
import { axiosDefault } from '../config/axios.js';
import { useDispatch } from 'react-redux';
import { setToken, setExpire, setUsername } from '../redux/tokenSlice.js';
import { setNotification } from '../redux/notificationSlice.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
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
      closeModal();
      navigate('/');
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const closeModal = () => {
    setErrForm(null);
    setEmail('');
    setPassword('');
  };

  const back = () => {
    closeModal();
    navigate('/');
  };

  return (
    <>
      <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
        <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white relative">
          <p className="text-center border-b border-teal-700 mb-2">Login</p>
          <button
            onClick={back}
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
              placeholder="password"
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
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-xs bg-orange-500 text-white p-0.5 rounded">
            Forgot password
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
