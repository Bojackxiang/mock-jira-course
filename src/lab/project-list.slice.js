// 同步的 state 更新
// export 两个东西，slice 和 action
// slice 放在 store 中

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      console.log("here");
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      console.log("here1");
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

// rootReducer 中怎么写的，这边就要怎么写
// 这个会被 component 中 直接使用 useSelector 去获取
export const modalState = (state) => state.modalState;
