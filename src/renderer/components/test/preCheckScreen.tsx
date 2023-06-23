import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  nextPage,
  setVolume,
} from '@store/slices/testProgressProvider';

import RightSnb from '@components/snb/RightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';
import { count } from 'console';

const ext = '.mp3';
const fileNames = ['1', '7', '25'];
const filePath = 'static://sounds/TEST/';
const maxCount = 3;

const PreCheckScreen = () => {
  const hooks = useNumberInput(maxCount, true);

  const [play, setPlay] = useState(false);
  const [sliderVolume, setSliderVolume] = useState(50);
  const [soundFile, setSoundFile] = useState('');

  const { volume, delay } = useAppSelector((state: RootState) => state.testProgress);

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    console.log("start_play?", play);
    setPlay(true);
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderVolume(newValue);
    setVolume(newValue);
  };

  const stop = () => {
    if (hooks.countTest === fileNames.length) {
      console.log("last_play1", play);
      console.log("last_play2", soundFile);
      // hooks.resetTest();
    }
    console.log("stop_sound?", play);
    setPlay(false);
  }

  useEffect(() => {
    const index = hooks.countTest - 1;
    console.log("countTest", index);
    console.log("play_sound?_1", play);
    setSoundFile(filePath + fileNames[index] + ext);
    if(index > 0 ) {
      console.log("play_sound?_2", play);
      setPlay(true);
    }
  }, [hooks.countTest]);

  useEffect(() => {
    if (hooks.isTestComplete) {
      console.log("TEST COMPLETE");
      setPlay(false);
      setSoundFile('');
    }
  }, [hooks.isTestComplete]);

  useEffect(() => {
    // hooks.resetTest();
  }, []);

  return (
    <>
      <RightSnb />
      { play &&
        <PlaySound
          mp3={soundFile}
          volume={sliderVolume}
          delay={delay}
          onEnd={stop}/>
      }
      <div className="pre-check-form-title">
        <p>
          이제 <span className="blue">3개의 연속된 숫자</span>가 들리게 됩니다.<br />
          숫자를 다 듣고 해당 숫자를 순서대로 말하세요.
        </p>
        <p>
          <span>반드시 3개의 숫자</span>가 다 제시된 후 말하세요. <br />
          정확히 듣지 못한 숫자가 있는 경우 추측해서 입력하세요.
          검사자는 연습 문항 실시하면서 환자의 MCL 레벨을 찾아내세요.<br />
        </p>
      </div>

      <div className="slide-bar-wrapper">
        <div className="slider-bar-inner">
          <p className="min-value">0%</p>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={sliderVolume}
            onChange={handleSliderChange}
          />
          <p className="max-value">100%</p>
        </div>
        <p className="current-value">{sliderVolume}</p>
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
          className={!hooks.isTestStart || (hooks.isTestStart && hooks.isTestComplete)
            ? "test-start-btn" : "test-start-btn deactive-btn" }
          disabled={!(!hooks.isTestStart || (hooks.isTestStart && hooks.isTestComplete)) }
          type="button"
          onClick={startTest}
        >
          {(hooks.isTestStart && hooks.isTestComplete) ? "다시시작" : "테스트시작"}
        </button>
        <button
          className="test-skip-btn"
          type="button"
          onClick={() => {
            dispatch(setVolume(volume));
            dispatch(nextPage());
          }}
        >
          테스트건너뛰기
        </button>
        <button
          className={hooks.isTestComplete
            ? "test-complete-btn active-btn"
            : "test-complete-btn"}
          type="button"
          disabled={!hooks.isTestComplete}
          onClick={() => {
            dispatch(setVolume(volume));
            dispatch(nextPage());
          }}
        >
          테스트완료
        </button>
      </div>
    </>
  );
}

export default PreCheckScreen;
