import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import hash from 'object-hash';

import { nextPage, setVolume } from '@store/slices/testProgressProvider';

import { alertCustom } from '@lib/common';

import RightSnb from '@components/snb/rightSnb';
import useNumberInput from '@hook/useNumberInput';
import PlaySound from '@hook/playSound';

import NotificationIcon from '@assets/images/icons/icon_notification.svg';

const ext = '.mp3';
const fileNames = ['1', '7', '25'];
const filePath = 'static://sounds/TEST/';
const maxCount = 3;

interface IButtonStateType {
  title: string | undefined;
  style: string | undefined;
  disabled: boolean;
}

const PreCheckScreen = () => {
  const hooks = useNumberInput(maxCount, true);

  const [play, setPlay] = useState(false);
  const [soundFile, setSoundFile] = useState('');
  const [sliderVolume, setSliderVolume] = useState(50);

  const [isStartBtnState, setStartBtnState] = useState<IButtonStateType | null>(
    null
  );
  const [isSkipBtnState, setSkipBtnState] = useState<IButtonStateType | null>(
    null
  );
  const [isFinishBtnState, setFinishBtnState] =
    useState<IButtonStateType | null>(null);

  const { volume } = useAppSelector((state: RootState) => state.testProgress);

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
        title: '연습 완료',
        message: `사전 연습이 완료되었습니다.
연습완료 버튼을 클릭하여 본 테스트로 진행하세요.`,
        // callback: () => dispatch(nextPage())
      });
    }
    if (hooks.isTestStart && !hooks.isTestComplete) {
      setStartBtnState({
        title: '연습진행중',
        style: 'btn-template btn-small btn-gray',
        disabled: true,
      });
      setSkipBtnState({
        title: '연습건너뛰기',
        style: 'btn-template btn-small',
        disabled: false,
      });
      setFinishBtnState({
        title: '연습종료',
        style: 'btn-template btn-small btn-deep-gray',
        disabled: false,
      });
    } else if (hooks.isTestStart && hooks.isTestComplete) {
      setStartBtnState({
        title: '다시시작',
        style: 'btn-template btn-small btn-deep-gray',
        disabled: false,
      });
      setSkipBtnState({
        title: '연습건너뛰기',
        style: 'btn-template btn-small btn-gray',
        disabled: true,
      });
      setFinishBtnState({
        title: '연습종료',
        style: 'btn-template btn-small',
        disabled: false,
      });
    } else if (!hooks.isTestStart && !hooks.isTestComplete) {
      setStartBtnState({
        title: '연습시작',
        style: 'btn-template btn-small',
        disabled: false,
      });
      setSkipBtnState({
        title: '연습건너뛰기',
        style: 'btn-template btn-small btn-deep-gray',
        disabled: false,
      });
      setFinishBtnState({
        title: '연습종료',
        style: 'btn-template btn-small btn-gray',
        disabled: true,
      });
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
      {play && <PlaySound mp3={soundFile} volume={sliderVolume} />}
      <div className="pre-check-form-wrapper">
        <div className="pre-check-form-title">
          <p>
            이제 <span className="blue">3개의 연속된 숫자</span>가 들리게
            됩니다.
            <br />
            숫자를 다 듣고 해당 숫자를 순서대로 입력하세요.
            <br />
            반드시 3개의 숫자가 다 제시된 후 입력하세요.
            <br />잘 듣지 못한 경우 추측해서 <span>숫자 3개 모두를 입력</span>
            해야 합니다.
          </p>
        </div>

        <div className="slide-bar-wrapper">
          <div className="slider-bar-top">
            <p className="slide-bar-title">소리 강도 조절</p>
          </div>
          <div className="slider-bar-inner">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={sliderVolume}
              onChange={handleSliderChange}
            />
          </div>
          <div className="slider-bar-inner-text">
            <p className="min-value">0%</p>
            <p className="current-value">{sliderVolume}%</p>
            <p className="max-value">100%</p>
          </div>
          <div className="slider-bar-inner-baloon">
            <i className="slider-bar-inner-baloon-arrow" />
            <NotificationIcon />
            레버를 움직여 최적의 소리 강도를 찾아내세요.
          </div>
        </div>
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
          className={isStartBtnState?.style}
          disabled={isStartBtnState?.disabled}
          type="button"
          onClick={startTest}
        >
          {isStartBtnState?.title}
        </button>
        <button
          className={isSkipBtnState?.style}
          disabled={isSkipBtnState?.disabled}
          type="button"
          onClick={() => {
            dispatch(setVolume(volume));
            dispatch(nextPage());
          }}
        >
          연습건너뛰기
        </button>
        <button
          className={isFinishBtnState?.style}
          disabled={isFinishBtnState?.disabled}
          type="button"
          onClick={() => {
            dispatch(setVolume(volume));
            dispatch(nextPage());
          }}
        >
          연습종료
        </button>
      </div>
    </>
  );
};

export default PreCheckScreen;
