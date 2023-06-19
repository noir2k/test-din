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

export default function CheckScreen() {
  const ext = '.mp3';
  const fileNames = ['NFLR[0]1', 'NFLR[0]2', 'NFLR[0]3'];
  const filePath = 'static://sounds/NFLR/';
  const hooks = useNumberInput(3);

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
    const index = hooks.countTest - 1;
    // setSoundFile(testAudioPaths['paths'][index].default);
    setSoundFile(filePath + fileNames[index] + ext);
    if(index > 0 ) {
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
