import { useState } from 'react';
import { axiosDefault } from '../config/axios.js';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axiosDefault.patch(`/reset-password/${email}`, {
        resetPasswordToken,
        password,
        confPassword
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
    setResetPasswordToken('');
    setPassword('');
    setConfPassword('');
    navigate('/');
  };

  return (
    <>
      {showModal && (
        <div className="bg-slate-900 bg-opacity-80 fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white relative">
            <p className="text-center border-b border-teal-700 mb-2">
              Reset password
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
                value={resetPasswordToken}
                onChange={e => setResetPasswordToken(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-full p-1 mb-1 rounded-md border"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="confirmation"
                className="w-full p-1 mb-1 rounded-md border"
                value={confPassword}
                onChange={e => setConfPassword(e.target.value)}
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

export default ResetPassword;
