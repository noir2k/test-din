import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  nextPage,
} from '@store/slices/testProgressProvider';

import RightSnb from '@components/snb/RightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const ext = '.mp3';
const preType = 'NF';
const filePath = 'static://sounds/';
const maxCount = 6;
const soundSetGroupSize = 30;
const minVolumeLevel = -18;
const maxVolumeLevel = 12;

const getType = (direction: string) => {
  return 'NFLR';
  // return (preType + direction).toUpperCase()
};

const getSound = (_count: number,
    volume_level: number,
    direction: string,
    sound_set: number,
    _correction?: number) => {
  let type = getType(direction);

  let volumeLevel = volume_level;
  if (_correction) {
    const temp = volumeLevel + _correction;
    if (temp >= minVolumeLevel && temp <= maxVolumeLevel) {
      volumeLevel = temp;
    }
  }

  const soundSetGroup = (soundSetGroupSize * (sound_set - 1));
  const count = _count + soundSetGroup;

  let fileName = filePath + type + '/' + type + '[' + volumeLevel + ']' + count + ext;
  console.log(fileName);
  return fileName;
}

const CheckScreen = () => {
  const hooks = useNumberInput(maxCount);

  const [currentLevel, setCurrentLevel] = useState(0);
  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');

  const { volume, delay } = useAppSelector((state: RootState) => state.testProgress);
  const { volume_level, direction, sound_set } = useAppSelector((state: RootState) => state.testForm);

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    setPlay(true);
  }

  const handleAbort = () => {
    if(confirm('테스트를 중단하고 처음으로 돌아가겠습니까?')) {
      hooks.resetTest();
      hooks.setTestStart(false);
    }
  }

  useEffect(() => {
    if (hooks.countTest !== undefined) {
      const mp3 = getSound(hooks.countTest, volume_level || 0, direction || '', sound_set || 0);
      setSoundFile(mp3);
    }
  }, []);

  useEffect(() => {
    const mp3 = getSound(hooks.countTest, volume_level || 0, direction || '', sound_set || 0);
    setSoundFile(mp3);
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
          {hooks.countTest}/{hooks.totalQuestions}
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
        <div className="render-number-wrapper">{hooks.renderButtons()}</div>
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
