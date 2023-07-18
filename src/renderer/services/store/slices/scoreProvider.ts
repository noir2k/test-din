import { createSlice, current } from '@reduxjs/toolkit';
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
  fixed_type: string;
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
const resPath = 'static://sounds';

const soundSetGroupSize = 30;

const shuffleIndex = (maxCount: number) => {
  const arr = [];
  for (let i = 1; i <= maxCount; i++) {
    arr.push(i);
  }

  // for Shuffle Test
  // arr.sort(() => Math.random() - 0.5);
  // console.log("shuffleIndex", arr);
  return arr;
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

export const getAnswers = (key: string | number, soundSet: number) => {
  const soundSetGroup = soundSetGroupSize * (soundSet - 1) + Number(key);
  return initialState.answers[soundSetGroup.toString() as keyof AnswerDataType];
};

type SoundType = {
  count: number;
  volumeLevel: number;
  fixed_type: string;
  direction: string;
  soundSet: number;
};

export const getSound = (sound: SoundType) => {
  const { fixed_type, direction, volumeLevel, soundSet, count } = sound;
  const path = `${fixed_type}/${direction}`.toUpperCase();
  const file = `${fixed_type}${direction}`.toUpperCase();

  const soundSetGroup = soundSetGroupSize * (soundSet - 1) + count;

  const fileName = `${resPath}/${path}/${file}[${volumeLevel}]${soundSetGroup}${ext}`;

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
        fixed_type: state.scoreConfig.fixed_type,
        direction: state.scoreConfig.direction,
        soundSet: state.scoreConfig.sound_set,
      });

      const scoreItem: ScoreItemType = {
        itemNo,
        isPass: false,
        volume_level: Number(_volumeLevel),
        fileName,
      };
      // console.log('setScoreItem', scoreItem);
      state.scoreItems = state.scoreItems.concat(scoreItem);
    },
    setScoreItemResult: (state, action) => {
      const { countTest, digits } = action.payload;
      const index = countTest - 1;
      const scoreItem = state.scoreItems[index];
      const { itemNo } = scoreItem;
      const answer = getAnswers(itemNo, state.scoreConfig.sound_set);
      // console.log(
      //   'setScoreItemResult1',
      //   state.scoreConfig.sound_set,
      //   itemNo,
      //   answer
      // );
      const result = resultScore(state.scoreConfig.scoring, answer, digits);

      console.log('setScoreItemResult2', result, answer, digits);
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
