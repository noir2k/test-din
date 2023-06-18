import RightSnb from '@components/snb/rightSnb';
import useNumberInput from '@hook/useNumberInput';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

export default function CheckScreen() {
  const hooks = useNumberInput(25);

  return (
    <>
      <RightSnb pageNum={2} />
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
          onClick={() => hooks.setTestStart(true)}
        >
          시작
        </button>
        <button className="test-abort-btn abort-btn" type="button">
          중단
        </button>
        <button
          className={hooks.isTestComplete
            ? "test-complete-btn active-btn"
            : "test-complete-btn"}
          type="button"
          disabled={!hooks.isTestComplete}
        >
          완료
        </button>
      </div>
    </>
  );
}
