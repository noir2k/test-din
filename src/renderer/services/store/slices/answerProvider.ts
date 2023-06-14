import { createSlice } from '@reduxjs/toolkit';
import answerData from '@assets/resources/answer.json';

type dataType = typeof answerData;

export const answerSlice = createSlice({
  name: 'answers',
  initialState: answerData,
  reducers: {}
});

export const getAnswers = (key: string | number) => answerSlice.getInitialState()[key as keyof dataType];

export default answerSlice.reducer;
