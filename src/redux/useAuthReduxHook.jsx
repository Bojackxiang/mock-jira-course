import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectedUser } from "store/auth.slice";

const useAuthReduxHook = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectedUser);

  /**
   *
   * @param {*} form
   * @returns
   */
  const reduxLogin = (form) => {
    console.log(form);
    return dispatch(login(form));
  };

  /**
   *
   * @param {*} form
   * @returns
   */
  const reduxLogout = (form) => {
    console.log(form);
    return dispatch(logout());
  };

  return { reduxLogin, reduxLogout, user };
};

export default useAuthReduxHook;
