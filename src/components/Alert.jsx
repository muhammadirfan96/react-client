import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice.js';

const Confirmation = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector(
    state => state.confirmationAlert.confirmation
  );

  return (
    <>
      {confirmation && (
        <div className="bg-slate-900 bg-opacity-50 fixed right-0 left-0 top-0 bottom-0 z-20">
          <div className="w-[95%] md:w-[80%] lg:w-[50%] rounded-md shadow-md shadow-teal-100 p-2 bg-white mx-auto mt-20 relative">
            <p className="text-xs text-center border-b border-teal-700 mb-2">
              Confirmation
            </p>
            <p className="text-center mb-2">{confirmation.message}</p>
            <div className="flex justify-center">
              <button
                onClick={confirmation.handleCancel}
                className="bg-red-700 text-white p-1 mx-1 rounded text-xs">
                calcel
              </button>
              <button
                onClick={confirmation.handleOke}
                className="bg-green-700 text-white p-1 mx-1 rounded text-xs">
                oke
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    state => state.notificationAlert.notification
  );

  if (notification)
    setTimeout(function () {
      dispatch(setNotification(false));
    }, 3000);

  return (
    <>
      {notification && (
        <div
          className={`${notification.background} rounded-md shadow-md p-1 mt-1 fixed right-0.5 top-0.5 z-20`}>
          <p className="text-xs text-center">{notification.message}</p>
        </div>
      )}
    </>
  );
};

export { Confirmation, Notification };
