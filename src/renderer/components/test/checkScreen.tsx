import RightSnb from '@components/snb/rightSnb';
import useNumberInput from '@hook/useNumberInput';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

export default function CheckScreen() {
  const hooks = useNumberInput();

  return (
    <>
      <RightSnb pageNum={2} />
      <div className="check-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>테스트 진행중</p>
      </div>

      <div className="question-progress">
        <p>
          {hooks.count}/{hooks.totalQuestions}
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

      <div className="abort-btn-wrapper">
        <button className="abort-btn" type="button">
          중단하기
        </button>
      </div>
    </>
  );
}
