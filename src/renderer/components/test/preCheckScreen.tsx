import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import hash from 'object-hash';

import { nextPage, setVolume } from '@store/slices/testProgressProvider';

import { alertCustom } from '@lib/common';

import RightSnb from '@components/snb/RightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

const ext = '.mp3';
const fileNames = ['1', '7', '25'];
const filePath = 'static://sounds/TEST/';
const maxCount = 3;

const PreCheckScreen = () => {
  const hooks = useNumberInput(maxCount, true);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');
  const [sliderVolume, setSliderVolume] = useState(50);
  const [btnText, setBtnText] = useState('테스트시작');
  const [isBtnDisable, setBtnDisable] = useState(false);

  const { volume, delay } = useAppSelector(
    (state: RootState) => state.testProgress
  );

  const dispatch = useAppDispatch();

  const startTest = () => {
    hooks.resetTest();
    hooks.setTestStart(true);
    setPlay(true);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderVolume(newValue);
    setVolume(newValue);
  };

  useEffect(() => {
    if (hooks.isTestComplete) {
      alertCustom({
        title: '검사 완료',
        message: `사전 테스트가 완료되었습니다.
테스트완료 버튼을 클릭하여 본 테스트로 진행하세요.`,
        // callback: () => dispatch(nextPage())
      });
    }
    if (hooks.isTestStart && !hooks.isTestComplete) {
      setBtnText('테스트진행중');
      setBtnDisable(true);
    } else if (hooks.isTestStart && hooks.isTestComplete) {
      setBtnText('다시시작');
      setBtnDisable(false);
    } else if (!hooks.isTestStart && !hooks.isTestComplete) {
      setBtnText('테스트시작');
      setBtnDisable(false);
    }
  }, [hooks.isTestStart, hooks.isTestComplete]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    const fileName = filePath + fileNames[index] + ext;
    setSoundFile(fileName);
  }, [hooks.countTest]);

  useEffect(() => {
    const index = hooks.countTest - 1;
    if (index > 0 && soundFile !== undefined && soundFile.length > 0) {
      setPlay(true);
    }
  }, [soundFile]);

  return (
    <>
      <RightSnb />
      {play && (
        <PlaySound mp3={soundFile} volume={sliderVolume} delay={delay} />
      )}
      <div className="pre-check-form-title">
        <p>
          이제 <span className="blue">3개의 연속된 숫자</span>가 들리게 됩니다.
          <br />
          숫자를 다 듣고 해당 숫자를 순서대로 말하세요.
        </p>
        <p>
          <span>반드시 3개의 숫자</span>가 다 제시된 후 말하세요. <br />
          정확히 듣지 못한 숫자가 있는 경우 추측해서 입력하세요.
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
        <p className="text-sm">
          검사자는 연습 문항 실시하면서 환자의 MCL 레벨을 찾아내세요.
        </p>
      </div>

      <div className="number-input-wrapper">
        <div className="number-input-inner">
          {hooks.digits.map((digit, index) => (
            <input
              key={hash(index).toString()}
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
            isBtnDisable ? 'test-start-btn deactive-btn' : 'test-start-btn'
          }
          disabled={isBtnDisable}
          type="button"
          onClick={startTest}
        >
          {btnText}
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
          className={
            hooks.isTestComplete
              ? 'test-complete-btn active-btn'
              : 'test-complete-btn'
          }
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
};

export default PreCheckScreen;
