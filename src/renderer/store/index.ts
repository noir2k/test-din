import { configureStore, createSlice } from '@reduxjs/toolkit';
import logger from 'redux-logger';

interface NoticeState {
  isNoticeVisible: boolean;
}

interface HistoryState {
  isHistoryOpen: boolean;
}

interface SettingState {
  isSettingOpen: boolean;
}

interface TestStartedState {
  isTestStarted: boolean;
}

const isNoticeVisible = createSlice({
  name: 'isNoticeVisible',
  initialState: { isNoticeVisible: true } as NoticeState,
  reducers: {
    setNoticeVisible(state, action) {
      state.isNoticeVisible = action.payload;
    },
  },
});

const isHistoryOpen = createSlice({
  name: 'isHistoryOpen',
  initialState: { isHistoryOpen: false } as HistoryState,
  reducers: {
    setHistoryOpen(state, action) {
      state.isHistoryOpen = action.payload;
    },
  },
});

const isSettingOpen = createSlice({
  name: 'isSettingOpen',
  initialState: { isSettingOpen: false } as SettingState,
  reducers: {
    setSettingOpen(state, action) {
      state.isSettingOpen = action.payload;
    },
  },
});

const isTestStarted = createSlice({
  name: 'isTestStarted',
  initialState: { isTestStarted: false } as TestStartedState,
  reducers: {
    setTestStarted(state, action) {
      state.isTestStarted = action.payload;
    },
  },
});

export const { setNoticeVisible } = isNoticeVisible.actions;
export const { setHistoryOpen } = isHistoryOpen.actions;
export const { setSettingOpen } = isSettingOpen.actions;
export const { setTestStarted } = isTestStarted.actions;

export const store = configureStore({
  reducer: {
    isNoticeVisible: isNoticeVisible.reducer,
    isHistoryOpen: isHistoryOpen.reducer,
    isSettingOpen: isSettingOpen.reducer,
    isTestStarted: isTestStarted.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
