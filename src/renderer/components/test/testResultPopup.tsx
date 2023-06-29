import icoCheckCircle from '@assets/images/icons/icon_check_circle.png';

const TestResultPopup = () => {
  return (
    <div className="score-result-wrapper">
      <div className="score-result">
        <img src={icoCheckCircle} alt="check circle" />
        <p className="currect-answer">사운드1: 정답</p>
      </div>
      <div className="score-result">
        <img src={icoCheckCircle} alt="check circle" />
        <p className="currect-answer">사운드2: 정답</p>
      </div>
      <div className="score-result">
        <img src={icoCheckCircle} alt="check circle" />
        <p className="currect-answer">사운드3: 정답</p>
      </div>
    </div>
  );
};

export default TestResultPopup;
