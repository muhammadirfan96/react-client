import { useState } from 'react';
import { axiosDefault } from '../config/axios.js';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axiosDefault.post('/forgot-password', { email });
      dispatch(
        setNotification({
          message: response.data?.message,
          background: 'bg-teal-100'
        })
      );

      closeModal();
      navigate(`/reset-password/${email}`);
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setEmail('');
    navigate('/');
  };

  return (
    <>
      {showModal && (
        <div className="bg-slate-900 bg-opacity-50 fixed right-0 left-0 top-0 bottom-0 z-10">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white mx-auto mt-20 relative">
            <p className="text-center border-b border-teal-700 mb-2">
              Forgot password
            </p>
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

export default ForgotPassword;
