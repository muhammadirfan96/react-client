import { axiosDefault } from '../config/axios.js';
import { useDispatch } from 'react-redux';
import { setToken, setExpire, setUsername } from '../redux/tokenSlice.js';
import { setNotification } from '../redux/notificationSlice.js';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosDefault.delete('/logout');

      dispatch(setToken(''));
      dispatch(setExpire(''));
      dispatch(setUsername(''));
      dispatch(
        setNotification({
          message: response.data?.message,
          background: 'bg-teal-100'
        })
      );
      navigate('/');
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      dispatch(
        setNotification({ message: arrError, background: 'bg-red-100' })
      );
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-700 p-1 mx-1 rounded shadow text-white">
          logout
        </button>
      </div>
    </>
  );
};

export default Logout;
