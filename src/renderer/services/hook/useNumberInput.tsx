import { useEffect, useState } from 'react';

import ico_check from '@assets/images/icons/icon_check.png';

const useNumberInput = (testMaxCount: number) => {
  const [digits, setDigits] = useState(['', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countTest, setCountTest] = useState(1);
  const [error, setError] = useState(false);

  const [isTestStart, setTestStart] = useState(false);
  const [isTestComplete, setTestComplete] = useState(false);

  const totalQuestions = testMaxCount;

  const handleNumberClick = (number: string) => {
    if (currentIndex < 3) {
      const updatedDigits = [...digits];
      updatedDigits[currentIndex] = number;
      setDigits(updatedDigits);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCheck = () => {
    if (!isTestStart) {
      alert('시작 버튼을 눌러서 시작해주세요');
      return;
    }
    if (currentIndex === 3) {
      if (countTest < totalQuestions) {
        setCountTest(countTest + 1);
        setDigits(['', '', '']);
        setCurrentIndex(0);
        setError(false);
      } else {
        setTestComplete(true);
      }
    } else {
      setError(true);
      alert('모든 숫자가 입력되지 않았습니다.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const number = Number(e.key);
      if (!isNaN(number) && currentIndex < 3) {
        handleNumberClick(number.toString());
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (currentIndex >= 1) {
          const updatedDigits = [...digits];
          updatedDigits[currentIndex - 1] = '';
          setDigits(updatedDigits);
          setCurrentIndex(currentIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [digits]);

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <div key={i} className="number-btn-wrapper">
          <button
            className="number-btn"
            onClick={() => handleNumberClick(i.toString())}
          >
            {i}
          </button>
        </div>
      );
    }
    buttons.push(
      <div key={-1} className="number-btn-wrapper remove-margin">
        <button className="hidden" disabled>
          간격 조절용 버튼
        </button>
      </div>
    );
    buttons.push(
      <div key={0} className="number-btn-wrapper remove-margin">
        <button className="number-btn" onClick={() => handleNumberClick('0')}>
          0
        </button>
      </div>
    );
    buttons.push(
      <div key="confirm" className="number-btn-wrapper remove-margin">
        <button className="number-btn confirm-btn" onClick={handleCheck}>
          <img src={ico_check} alt="check icon" />
        </button>
      </div>
    );
    return buttons;
  };

  return {
    digits,
    currentIndex,
    countTest,
    error,
    totalQuestions,
    isTestComplete,
    isTestStart,
    setTestStart,
    handleNumberClick,
    handleCheck,
    renderButtons,
  };
};

export default useNumberInput;
