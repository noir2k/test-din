import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  nextPage,
} from '@store/slices/testProgressProvider';

import {
  setTestResult,
} from '@store/slices/testFormProvider';

import {
  setScoreConfig,
  setScoreItem,
  resetScore,
} from '@store/slices/scoreProvider';

import RightSnb from '@components/snb/RightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const maxCount = 30;
const minVolumeLevel = -18;
const maxVolumeLevel = 12;

const CheckScreen = () => {
  const hooks = useNumberInput(maxCount);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');

  const { volume, delay } = useAppSelector((state: RootState) => state.testProgress);
  const { volume_level, direction, sound_set, scoring } = useAppSelector((state: RootState) => state.testForm);
  const scoreData = useAppSelector((state: RootState) => state.scoreData);

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    hooks.setTestComplete(false);
    setPlay(true);
  }

  const handleAbort = () => {
    if(confirm('테스트를 중단하고 처음으로 돌아가겠습니까?')) {
      hooks.resetTest();
      hooks.setTestStart(false);
      hooks.setTestComplete(false);
      dispatch(resetScore());
      dispatch(setScoreConfig({
        volume_level: volume_level,
        direction: direction,
        sound_set: sound_set,
        scoring: scoring,
        max_count: maxCount,
      }));
    }
  }

  useEffect(() => {
    dispatch(setScoreConfig({
      volume_level: volume_level,
      direction: direction,
      sound_set: sound_set,
      scoring: scoring,
      max_count: maxCount,
    }));

    return () => {
      dispatch(resetScore());
    };
  }, []);

  useEffect(() => {
    if (scoreData.scoreItems.length > 0 ) {
      const index = hooks.countTest - 1;
      const mp3 = scoreData.scoreItems[index].fileName;
      setSoundFile(mp3);
    }
  }, [scoreData.scoreItems.length])

  useEffect(() => {
    console.log('hooks.isTestComplete', hooks.isTestComplete);
    if (hooks.isTestComplete) {
      console.log("TEST COMPLETE");
      dispatch(setTestResult(scoreData.scoreItems));
    }
  }, [hooks.isTestComplete]);


  // useEffect(() => {
  //   console.log('hooks.digits', hooks.digits);
  // }, [hooks.digits]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    let bias = undefined;
    if (scoreData.scoreItems.length > 0) {
      const beforeIndex = index - 1;
      if (scoreData.scoreItems[beforeIndex].isPass) {
        const _bias = scoreData.scoreItems[beforeIndex].volume_level - 2;
        bias = _bias < minVolumeLevel ? minVolumeLevel : _bias;
      } else {
        const _bias = scoreData.scoreItems[beforeIndex].volume_level + 2;
        bias = _bias > maxVolumeLevel ? maxVolumeLevel : _bias;
      }
    }

    dispatch(setScoreItem({index: index, volume_level: bias}));

    if(hooks.countTest > 1 ) {
      setPlay(true);
    }
  }, [hooks.countTest]);

  return (
    <>
      <RightSnb />
      { play &&
        <PlaySound
          mp3={soundFile}
          volume={volume}
          delay={delay}
          onEnd={() => setPlay(false)}/>
      }
      <div className="check-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>테스트 진행중</p>
      </div>

      <div className="question-progress">
        <p>
          {hooks.countTest}/{hooks.testMaxCount}
        </p>
      </div>

      <div className="number-input-wrapper">
        <div className="number-input-inner">
          {hooks.digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              readOnly
              className="number-input"
            />
          ))}
        </div>
        <div className="render-number-wrapper">
          {hooks.renderButtons()}
        </div>
      </div>

      <div className="test-btn-wrapper">
        <button
          className={hooks.isTestStart
            ? "test-start-btn deactive-btn"
            : "test-start-btn"}
          disabled={hooks.isTestStart}
          type="button"
          onClick={startTest}
        >
          시작
        </button>
        <button
          className="test-abort-btn abort-btn"
          type="button"
          onClick={handleAbort}
        >
          중단
        </button>
        <button
          className={hooks.isTestComplete
            ? "test-complete-btn active-btn"
            : "test-complete-btn"}
          type="button"
          disabled={!hooks.isTestComplete}
          onClick={() => dispatch(nextPage())}
        >
          완료
        </button>
      </div>
    </>
  );
}

export default CheckScreen;
