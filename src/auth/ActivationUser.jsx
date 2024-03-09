import { useState } from 'react';
import { axiosDefault } from '../config/axios.js';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { useNavigate, useParams } from 'react-router-dom';

const ActivationUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [activationToken, setActivationToken] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axiosDefault.patch(`/activation-user/${email}`, {
        activationToken
      });

      dispatch(
        setNotification({
          message: response.data.message,
          background: 'bg-teal-100'
        })
      );

      closeModal();
    } catch (e) {
      const arrError = e.response.data.error.split(',');
      setErrForm(arrError);
    }
  };

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setActivationToken('');
    navigate('/');
  };

  return (
    <>
      {showModal && (
        <div className="bg-slate-900 bg-opacity-50 fixed right-0 left-0 top-0 bottom-0 z-10">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white mx-auto mt-20 relative">
            <p className="text-center border-b border-teal-700 mb-2">
              Activation user
            </p>

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
                placeholder="token"
                className="w-full p-1 mb-1 rounded-md border"
                value={activationToken}
                onChange={e => setActivationToken(e.target.value)}
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

export default ActivationUser;
