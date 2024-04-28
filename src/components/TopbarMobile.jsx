import Logout from '../auth/Logout.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TopbarMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(state => state.jwToken.username);

  return (
    <>
      <div className="p-4 pt-3 bg-teal-700 fixed md:hidden top-0 right-0 left-0 h-16">
        <p className="text-2xl md:text-4xl font-bold text-white mb-1">
          <button onClick={() => navigate('/')} className="font-din">
            MERN STACK
          </button>
        </p>

        <div className="absolute right-2 top-2 text-xs">
          {username ? (
            <div className="text-right">
              <p className="text-teal-300 mb-2">Hi, {username}</p>
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
      </div>
    </>
  );
};

export default TopbarMobile;
