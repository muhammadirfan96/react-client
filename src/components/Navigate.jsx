import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../auth/Logout.jsx';
import Login from '../auth/Login.jsx';
import Register from '../auth/Register.jsx';

const Navigate = () => {
  const navigate = useNavigate();
  const username = useSelector(state => state.jwToken.username);

  return (
    <>
      <div className="bg-teal-700 p-2 relative">
        <div className="absolute left-2 top-2 text-xs">
          {username ? (
            <div>
              <p className=" text-teal-300 mb-2">Hi, {username}</p>
              <Logout />
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => navigate('/login')}
                className="bg-teal-300 p-1 m-1 rounded shadow">
                login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-teal-300 p-1 m-1 rounded shadow">
                register
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end my-2">
          <button
            onClick={() => navigate('/')}
            className="bg-teal-300 p-1 mx-1 rounded shadow">
            home
          </button>
          <button
            onClick={() => navigate('/product')}
            className="bg-teal-300 p-1 mx-1 rounded shadow">
            product
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigate;
