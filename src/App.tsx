import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loader from "./components/Loaders/Loader";
import { useAppDispatch } from '@/hooks/redux-hooks';
import { addUser } from "./features/Auth/authSlice";

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  if (user !== null) {
    dispatch(addUser(user));
    setTimeout(() => {
      setAppLoading(false);
    }, 4000);
  } else {
    dispatch(addUser(null));
    setTimeout(() => {
      setAppLoading(false);
    }, 4000);
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
