import { useState } from 'react';

import useNumberInput from '@hook/useNumberInput';
import RightSnb from '@components/snb/rightSnb';

export default function PreCheckScreen() {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  const hooks = useNumberInput();

  return (
    <>
      <RightSnb pageNum={1} />
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
          <p className="min-value">0dB</p>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={value}
            onChange={handleSliderChange}
          />
          <p className="max-value">100dB</p>
        </div>
        <p className="current-value">{value}dB</p>
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
        <button className="test-start-btn" type="button">
          시작
        </button>
        <button className="test-complete-btn" type="button">
          완료
        </button>
      </div>
    </>
  );
}
