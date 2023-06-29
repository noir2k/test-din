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
};

type ScoreConfigType = {
  direction: string;
  scoring: string;
  sound_set: number;
  volume_level: number;
  max_count: number;
};

const initialState = {
  answers: answerData,
  scoreConfig: {} as ScoreConfigType,
  scoreItems: [] as ScoreItemType[],
  scoreItemIndex: [] as number[],
};

const ext = '.mp3';
const preType = 'NF';
const filePath = 'static://sounds/';

const soundSetGroupSize = 30;

const shuffleIndex = (maxCount: number) => {
  const arr = [];
  for (let i = 1; i <= maxCount; i++) {
    arr.push(i);
  }

  // arr.sort(() => Math.random() - 0.5);
  // console.log("shuffleIndex", arr);
  return arr;
};

const getType = (direction: string) => {
  return 'NFLR';
  // return (preType + direction).toUpperCase()
};

const resultScore = (
  scoring: string,
  answer: number[],
  digits: number[]
): boolean => {
  let ansCount = 0;
  answer.forEach((a, idx) => {
    if (a === Number(digits[idx])) {
      ansCount++;
    }
  });

  const isPass =
    (scoring === 'digit' && ansCount >= 2) ||
    (scoring === 'triplet' && ansCount === 3);

  return isPass;
};

export const getAnswers = (key: string | number) =>
  initialState.answers[key as keyof AnswerDataType];

type SoundType = {
  count: number;
  volumeLevel: number;
  direction: string;
  soundSet: number;
};

export const getSound = (sound: SoundType) => {
  const type = getType(sound.direction);

  const soundSetGroup = soundSetGroupSize * (sound.soundSet - 1);
  const count = sound.count + soundSetGroup;

  const fileName = `${filePath + type}/${type}[${
    sound.volumeLevel
  }]${count}${ext}`;

  console.log('getSound', fileName);
  return fileName;
};

const answerSlice = createSlice({
  name: 'scoreData',
  initialState,
  reducers: {
    setScoreConfig: (state, action) => {
      state.scoreConfig = action.payload;
      state.scoreItemIndex = shuffleIndex(action.payload.max_count);
    },
    setScoreItem: (state, action) => {
      const itemNo = state.scoreItemIndex[action.payload.index];

      let _volumeLevel = state.scoreConfig.volume_level;
      if (_volumeLevel !== undefined) {
        _volumeLevel = action.payload.volume_level;
      }

      const fileName = getSound({
        count: itemNo,
        volumeLevel: _volumeLevel,
        direction: state.scoreConfig.direction,
        soundSet: state.scoreConfig.sound_set,
      });

      const scoreItem: ScoreItemType = {
        itemNo,
        isPass: false,
        volume_level: Number(_volumeLevel),
        fileName,
      };

      state.scoreItems = state.scoreItems.concat(scoreItem);
    },
    setScoreItemResult: (state, action) => {
      const { countTest, digits } = action.payload;
      const index = countTest - 1;
      const scoreItem = state.scoreItems[index];
      const { itemNo } = scoreItem;
      const answer = getAnswers(itemNo);
      const result = resultScore(state.scoreConfig.scoring, answer, digits);

      scoreItem.isPass = result;
      scoreItem.answer = answer;
      scoreItem.userAnswer = digits;
    },
    clearScoreItems: (state) => {
      state.scoreItems = [];
    },
    resetScore: () => initialState,
  },
});

export const {
  setScoreConfig,
  setScoreItem,
  setScoreItemResult,
  clearScoreItems,
  resetScore,
} = answerSlice.actions;

export default answerSlice.reducer;
