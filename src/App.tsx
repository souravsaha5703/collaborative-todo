import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loaders/Loader";
import { useAppDispatch } from '@/hooks/redux-hooks';
import { addUser, userStatus } from "./features/Auth/authSlice";

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  if (user !== null) {
    dispatch(addUser(user));
    dispatch(userStatus(true));
    setTimeout(() => {
      setAppLoading(false);
    }, 3000);
  } else {
    dispatch(addUser(null));
    dispatch(userStatus(false));
    setTimeout(() => {
      setAppLoading(false);
    }, 3000);
  }

  return (
    <>
      {appLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default App;
