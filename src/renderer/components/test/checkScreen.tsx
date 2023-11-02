import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';
import hash from 'object-hash';

import { nextPage, resetProgress } from '@store/slices/testProgressProvider';

import { setTestResult } from '@store/slices/testFormProvider';

import {
  setScoreConfig,
  setScoreItem,
  clearScoreItems,
  resetScore,
} from '@store/slices/scoreProvider';

import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

import {
  alertCustom,
  confirmCustom,
  ScoringOptions,
  SoundSetOptions,
  DirectionOptions,
  FixedTypeOptions,
} from '@lib/common';

import HeadphoneLargeIcon from '@assets/images/icons/icon_headphone_large.svg';

const maxCount = 30;
const minVolumeLevel_NF = -18;
const minVolumeLevel_SF = -14;
const maxVolumeLevel = 12;

function CheckScreen() {
  const hooks = useNumberInput(maxCount);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');
  const [testTitle, setTestTitle] = useState('테스트 진행중');

  const { volume } = useAppSelector((state: RootState) => state.testProgress);
  const testForm = useAppSelector((state: RootState) => state.testForm);
  const scoreData = useAppSelector((state: RootState) => state.scoreData);

  const _soundSet = SoundSetOptions[testForm.sound_set?.toString() ?? ''];
  const _fixedType = FixedTypeOptions[testForm.fixed_type ?? ''];
  const _direction = DirectionOptions[testForm.direction ?? ''];
  const _scoring = ScoringOptions[testForm.scoring ?? ''];

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    setPlay(true);
  };

  const handleAbort = () => {
    confirmCustom({
      message: '테스트를 중단하고 처음으로 돌아가겠습니까?',
      callback: () => {
        hooks.resetTest();
        dispatch(resetScore());
        dispatch(
          setScoreConfig({
            volume_level: testForm.volume_level,
            direction: testForm.direction,
            sound_set: testForm.sound_set,
            scoring: testForm.scoring,
            max_count: maxCount,
          })
        );
        setPlay(false);
      },
    });
  };

  const handleTestFormError = () => {
    dispatch(resetProgress());
    dispatch(resetScore());
  };

  const handleTestComplete = () => {
    // console.log(scoreData.scoreItems);
    dispatch(setTestResult(scoreData.scoreItems));
    dispatch(nextPage());
  };

  useEffect(() => {
    if (isEmpty(testForm)) {
      alertCustom({
        title: '기본 정보 오류',
        message: `입력 정보 중 오류 내용이 있습니다.
기본 정보 입력 화면으로 돌아갑니다.`,
        callback: () => handleTestFormError(),
      });
    } else {
      dispatch(
        setScoreConfig({
          fixed_type: testForm.fixed_type,
          volume_level: testForm.volume_level,
          direction: testForm.direction,
          sound_set: testForm.sound_set,
          scoring: testForm.scoring,
          max_count: maxCount,
        })
      );
    }

    return () => {
      dispatch(clearScoreItems());
      hooks.resetTest();
    };
  }, []);

  useEffect(() => {
    const title = hooks.isTestStart
      ? '테스트 진행중'
      : `본 검사를 실시합니다.
아래 시작 버튼을 누르세요.`;
    setTestTitle(title);
  }, [hooks.isTestStart]);

  useEffect(() => {
    if (hooks.isTestComplete) {
      alertCustom({
        title: '검사 완료',
        message: `본 테스트가 완료되었습니다.
결과 화면으로 진행합니다.`,
        callback: () => handleTestComplete(),
      });
    }
  }, [hooks.isTestComplete]);

  useEffect(() => {
    if (scoreData.scoreItems.length > 0) {
      const index = hooks.countTest - 1;
      const mp3 = scoreData.scoreItems[index].fileName;
      setSoundFile(mp3);
    }
  }, [scoreData.scoreItems.length]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    let bias = testForm.volume_level;
    if (scoreData.scoreItems.length > 0) {
      const beforeIndex = index - 1;
      if (scoreData.scoreItems[beforeIndex].isPass) {
        const biasVolumn = scoreData.scoreItems[beforeIndex].volume_level - 2;
        const minVolumeLevel =
          testForm.fixed_type === 'NF' ? minVolumeLevel_NF : minVolumeLevel_SF;
        bias = biasVolumn < minVolumeLevel ? minVolumeLevel : biasVolumn;
      } else {
        const biasVolumn = scoreData.scoreItems[beforeIndex].volume_level + 2;
        bias = biasVolumn > maxVolumeLevel ? maxVolumeLevel : biasVolumn;
      }
    }

    dispatch(setScoreItem({ index, volume_level: bias }));
  }, [hooks.countTest]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    if (index > 0 && soundFile !== undefined && soundFile.length > 0) {
      setPlay(true);
    }
  }, [soundFile]);

  return (
    <>
      {play && (
        <PlaySound
          mp3={soundFile}
          volume={volume}
          onEnd={() => setPlay(false)}
        />
      )}
      <div className="check-form-title">
        <div className="check-form-header">
          <div className="check-form-header-start">
            <p>검사 현황</p>
          </div>
          <div className="check-form-header-mid">
            <p>검사 사운드 세트</p>
            <p>사운드 제시 방식</p>
            <p>사운드 제시 방향</p>
            <p>채점 방식</p>
          </div>
          <div className="check-form-header-end">
            <p>{_soundSet}</p>
            <p>{_fixedType}</p>
            <p>{_direction}</p>
            <p>{_scoring}</p>
          </div>
        </div>
        <div className="check-form-headphone-icon">
          <HeadphoneLargeIcon
            className={play ? 'visible' : 'hidden invisible'}
          />
        </div>
        <p style={{ whiteSpace: 'pre' }}>{testTitle}</p>
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
              key={hash(index).toString()}
              id={index.toString()}
              type="text"
              value={digit}
              readOnly
              className="number-input"
            />
          ))}
        </div>
        <div className="render-number-wrapper">{hooks.renderButtons()}</div>
      </div>

      <div className="test-btn-wrapper">
        <button
          className={
            hooks.isTestStart
              ? 'btn-template btn-small deactive-btn'
              : 'btn-template btn-small'
          }
          disabled={hooks.isTestStart}
          type="button"
          onClick={startTest}
        >
          시작
        </button>
        <button
          className={
            hooks.isTestStart
              ? 'btn-template btn-small active-btn'
              : 'btn-template btn-small btn-deep-gray'
          }
          type="button"
          onClick={handleAbort}
        >
          중단
        </button>
      </div>
    </>
  );
}

export default CheckScreen;
