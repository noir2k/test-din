import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';

import {
  nextPage,
  resetProgress,
} from '@store/slices/testProgressProvider';

import {
  setTestResult,
} from '@store/slices/testFormProvider';

import {
  setScoreConfig,
  setScoreItem,
  clearScoreItems,
  resetScore,
} from '@store/slices/scoreProvider';

import {
  setAlertModal,
} from '@store/slices/alertModalProvider';

import RightSnb from '@components/snb/RightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const maxCount = 6;
const minVolumeLevel = -18;
const maxVolumeLevel = 12;

const CheckScreen = () => {
  const hooks = useNumberInput(maxCount);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');
  const [testTitle, setTestTitle] = useState('테스트 진행중');

  const { volume, delay } = useAppSelector((state: RootState) => state.testProgress);
  const testForm = useAppSelector((state: RootState) => state.testForm);
  const scoreData = useAppSelector((state: RootState) => state.scoreData);

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    setPlay(true);
  }

  const handleAbort = () => {
    if(confirm('테스트를 중단하고 처음으로 돌아가겠습니까?')) {
      hooks.resetTest();
      dispatch(resetScore());
      dispatch(setScoreConfig({
        volume_level: testForm.volume_level,
        direction: testForm.direction,
        sound_set: testForm.sound_set,
        scoring: testForm.scoring,
        max_count: maxCount,
      }));
      setPlay(false);
    }
  }

  const handleTestFormError = () => {
    dispatch(resetProgress());
    dispatch(resetScore());
  }

  const handleTestComplete = () => {
    dispatch(setTestResult(scoreData.scoreItems));
    dispatch(nextPage());
  }

  useEffect(() => {
    if (isEmpty(testForm)) {
      dispatch(
        setAlertModal({
          isShow: true,
          title:'기본 정보 오류',
          message: `입력 정보 중 오류 내용이 있습니다.
기본 정보 입력 화면으로 돌아갑니다.`,
          callback: () => handleTestFormError()
        })
      );

    } else {
      dispatch(setScoreConfig({
        volume_level: testForm.volume_level,
        direction: testForm.direction,
        sound_set: testForm.sound_set,
        scoring: testForm.scoring,
        max_count: maxCount,
      }));
    }

    return () => {
      dispatch(clearScoreItems());
      hooks.resetTest();
    };
  }, []);

  useEffect(() => {
    const title = hooks.isTestStart
      ? '테스트 진행중'
      : `본 테스트를 실시합니다.
아래의 시작 버튼을 눌러서 검사를 실시하세요`;
    setTestTitle(title);
  }, [hooks.isTestStart]);

  useEffect(() => {
    if (hooks.isTestComplete) {
      dispatch(
        setAlertModal({
          isShow: true,
          title:'검사 완료',
          message: `본 테스트가 완료되었습니다.
결과 화면으로 진행합니다.`,
          callback: () => handleTestComplete()
        })
      );
    }
  }, [hooks.isTestComplete]);

  useEffect(() => {
    if (scoreData.scoreItems.length > 0 ) {
      const index = hooks.countTest - 1;
      const mp3 = scoreData.scoreItems[index].fileName;
      setSoundFile(mp3);
    }
  }, [scoreData.scoreItems.length])

  useEffect(() => {
    const index = hooks.countTest - 1;
    let bias = testForm.volume_level;
    if (scoreData.scoreItems.length > 1) {
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
  }, [hooks.countTest]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    if(index > 0 && soundFile !== undefined && soundFile.length > 0) {
      setPlay(true);
    }
  }, [soundFile]);

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
        <p style={{whiteSpace: "pre"}}>{testTitle}</p>
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
        {/* <button
          className={hooks.isTestComplete
            ? "test-complete-btn active-btn"
            : "test-complete-btn"}
          type="button"
          disabled={!hooks.isTestComplete}
          onClick={() => dispatch(nextPage())}
        >
          완료
        </button> */}
      </div>
    </>
  );
}

export default CheckScreen;
