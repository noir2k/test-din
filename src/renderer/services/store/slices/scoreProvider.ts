import { createSlice } from '@reduxjs/toolkit';
import answerData from '@assets/resources/answer.json';

type AnswerDataType = typeof answerData;

export type ScoreItemType = {
  itemNo: number;
  isPass: boolean;
  volume_level: number;
  fileName: string;
  answer?: number[];
  userAnswer?: number[];
}

type ScoreConfigType = {
  direction: string;
  scoring: string;
  sound_set: number;
  volume_level: number;
  max_count: number;
}

const initialState = {
  answers: answerData,
  scoreConfig: {} as ScoreConfigType,
  scoreItems: [] as ScoreItemType[],
  scoreItemIndex: [] as number[],
}

const ext = '.mp3';
const preType = 'NF';
const filePath = 'static://sounds/';

const soundSetGroupSize = 30;

const answerSlice = createSlice({
  name: 'scoreData',
  initialState,
  reducers: {
    setScoreConfig: (state, action) => {
      state.scoreConfig = action.payload;
      state.scoreItemIndex = shuffleIndex(action.payload.max_count);
    },
    setScoreItem: (state, action) => {
      const { index, volume_level } = action.payload;
      const itemNo = state.scoreItemIndex[index];

      let _volume_level = state.scoreConfig.volume_level;
      if (volume_level !== undefined) {
        _volume_level = volume_level;
      }

      const fileName = getSound(itemNo, _volume_level, state.scoreConfig.direction, state.scoreConfig.sound_set);
      const scoreItem: ScoreItemType = {
        itemNo: itemNo,
        isPass: false,
        volume_level: Number(_volume_level),
        fileName: fileName
      }

      console.log("setScoreItem", scoreItem);
      state.scoreItems = state.scoreItems.concat(scoreItem);
    },
    setScoreItemResult: (state, action) => {
      const { countTest, digits } = action.payload;
      const index = countTest - 1;
      const scoreItem = state.scoreItems[index];
      const itemNo = scoreItem.itemNo;
      const answer = getAnswers(itemNo);
      const result = resultScore(state.scoreConfig.scoring, answer, digits);

      console.log("setScoreItemResult", result, answer, digits);
      scoreItem.isPass = result;
      scoreItem.answer = answer;
      scoreItem.userAnswer = digits;
    },
    resetScore: () => initialState
  }
});

const shuffleIndex = (maxCount: number) => {
  const arr = [];
  for (let i = 1; i <= maxCount; i++) {
    arr.push(i);
  }

  // arr.sort(() => Math.random() - 0.5);
  // console.log("shuffleIndex", arr);
  return arr;
}

const getType = (direction: string) => {
  return 'NFLR';
  // return (preType + direction).toUpperCase()
};

const resultScore = (scoring: string, answer: number[], digits: number[]): boolean => {
  let ansCount = 0;
  answer.forEach((a, idx) => {
    if (a === Number(digits[idx])) {
      ansCount++;
    }
  });

  const isPass = (scoring === 'digit' && ansCount >= 2) ||
    (scoring === 'triplet' && ansCount === 3);

  return isPass;
}

export const getAnswers = (key: string | number) => initialState.answers[key as keyof AnswerDataType];
export const getSound = (
  _count: number,
  volume_level: number,
  direction: string,
  sound_set: number) => {

  let type = getType(direction);

  const soundSetGroup = (soundSetGroupSize * (sound_set - 1));
  const count = _count + soundSetGroup;

  let fileName = filePath + type + '/' + type + '[' + volume_level + ']' + count + ext;

  console.log("getSound", fileName);
  return fileName;
}

export const {
  setScoreConfig,
  setScoreItem,
  setScoreItemResult,
  resetScore,
} = answerSlice.actions;

export default answerSlice.reducer;
