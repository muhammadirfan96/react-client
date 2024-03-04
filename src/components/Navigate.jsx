import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigate = () => {
  const navigate = useNavigate();
  const username = useSelector(state => state.jwToken.username);
  const token = useSelector(state => state.jwToken.token);
  const expire = useSelector(state => state.jwToken.expire);

  return (
    <>
      <div className="bg-amber-100 p-2 relative">
        {expire && (
          <p className="text-xs absolute left-0.5 top-0.5">Hi, {expire}</p>
        )}
        <div className="flex justify-center my-2">
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
          <button className="bg-teal-300 p-1 mx-1 rounded shadow">
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigate;
