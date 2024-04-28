import Logout from '../auth/Logout.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSidebar } from '../redux/barSlice.js';

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector(state => state.jwToken.username);
  const sbar = useSelector(state => state.bar.sidebar);

  return (
    <>
      <div className="p-4 pt-3 bg-teal-700 hidden md:block fixed top-0 right-0 left-0 h-16">
        <button
          onClick={() => dispatch(setSidebar())}
          className="absolute left-6 top-6 hidden md:inline">
          <div
            className={`${
              sbar && 'rotate-[35deg]'
            } w-8 mb-[5px] border-2 rounded-sm border-black bg-black origin-left transition delay-500`}></div>
          <div
            className={`${
              sbar && 'opacity-0'
            } w-8 mb-[5px] border-2 rounded-sm border-red-700 bg-red-700 transition delay-500`}></div>
          <div
            className={`${
              sbar && '-rotate-[35deg]'
            } w-8 mb-[5px] border-2 rounded-sm border-white bg-white origin-left transition delay-500`}></div>
        </button>
        <p className="text-center text-2xl md:text-4xl font-bold text-white mb-1">
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

export default Topbar;
