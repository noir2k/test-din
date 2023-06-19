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
// import testAudioPaths from '@lib/testAudioPaths';

const PreCheckScreen = () => {
  const ext = '.mp3';
  const fileNames = ['1', '7', '25'];
  const filePath = 'static://sounds/TEST/';
  const hooks = useNumberInput(3);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');

  const { volume, delay } = useAppSelector((state: RootState) => state.testProgress);

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    setPlay(true);
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setVolume(newValue);
  };

  // useEffect(() => {
  //   console.log('play', play);
  // }, [play]);

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
      <div className="pre-check-form-title">
        <p>
          이제 <span className="blue">3개의 연속된 숫자</span>가 들리게 됩니다.{' '}
          <br />
          숫자를 다 듣고 해당 숫자를 순서대로 말하세요.
        </p>
        <p>
          <span>반드시 3개의 숫자</span>가 다 제시된 후 말하세요. <br />잘 듣지
          못한 경우 추측해서 <span>숫자 3개 모두</span>를 말해야 합니다.
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
            value={volume}
            onChange={handleSliderChange}
          />
          <p className="max-value">100%</p>
        </div>
        <p className="current-value">{volume}</p>
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
          완료
        </button>
      </div>
    </>
  );
}

export default PreCheckScreen;
