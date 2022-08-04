import { createSlice } from "@reduxjs/toolkit";
import { bootstrapUser } from "context/auth-context";
import { useSelector } from "react-redux";
import * as authProvider from "support/auth-provider";

// 这是一个 使用 redux-thunk 实现的 action
const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

// rootReducer 中怎么写的，这边就要怎么写
// 这个会被 component 中 直接使用 useSelector 去获取
export const selectedUser = (state) => state.authState.user;

// 这个就相当于先从 reducer 中将方法拿出来
const { setUser } = authSlice.actions;
// thunk 的使用 本质就是 return 一个 参数为 dispatch 的函数
export const login = (form) => (dispatch) =>
  authProvider.login(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch) =>
  authProvider.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
