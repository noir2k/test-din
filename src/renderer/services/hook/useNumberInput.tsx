import { useEffect, useState } from 'react';

import { useAppDispatch } from '@hook/index';

import { setScoreItemResult } from '@store/slices/scoreProvider';

import { alertCustom } from '@lib/common';

const useNumberInput = (
  testMaxCount: number,
  isPreChecked: boolean = false
) => {
  const [digits, setDigits] = useState(['', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countTest, setCountTest] = useState(1);
  const [error, setError] = useState(false);

  const [isTestStart, setTestStart] = useState(false);
  const [isTestComplete, setTestComplete] = useState(false);

  const dispatch = useAppDispatch();

  const resetTest = () => {
    setCountTest(1);
    setDigits(['', '', '']);
    setCurrentIndex(0);
    setTestStart(false);
    setTestComplete(false);
  };

  const handleNumberClick = (number: string) => {
    if (isTestStart) {
      setError(false);
      if (currentIndex < 3) {
        const updatedDigits = [...digits];
        updatedDigits[currentIndex] = number;
        setDigits(updatedDigits);
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setError(true);
      alertCustom({ message: '시작 버튼을 눌러서 시작해주세요.' });
    }
  };

  const handleCheck = () => {
    if (isTestStart) {
      if (currentIndex === 3) {
        setError(false);
        if (!isPreChecked) {
          dispatch(setScoreItemResult({ countTest, digits }));
        }
        const nextCount = countTest + 1;
        if (countTest < testMaxCount) {
          setCountTest(nextCount);
          setDigits(['', '', '']);
          setCurrentIndex(0);
        } else {
          setDigits(['', '', '']);
          setTestComplete(true);
        }
      } else {
        setError(true);
        alertCustom({ message: '모든 숫자가 입력되지 않았습니다.' });
      }
    } else {
      setError(true);
      alertCustom({ message: '시작 버튼을 눌러서 시작해주세요.' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      const number = Number(e.key);
      if (!Number.isNaN(number) && currentIndex < 3) {
        handleNumberClick(number.toString());
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (currentIndex >= 1) {
          const updatedDigits = [...digits];
          updatedDigits[currentIndex - 1] = '';
          setDigits(updatedDigits);
          setCurrentIndex(currentIndex - 1);
        }
      } else if (e.key === 'Enter') {
        const target = e.currentTarget as HTMLInputElement;
        if (target) target.blur();
        handleCheck();
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
            type="button"
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
        <button type="button" className="hidden" disabled>
          간격 조절용 버튼
        </button>
      </div>
    );
    buttons.push(
      <div key={0} className="number-btn-wrapper remove-margin">
        <button
          type="button"
          className="number-btn"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
      </div>
    );
    buttons.push(
      <div key="confirm" className="number-btn-wrapper remove-margin">
        <button
          type="button"
          className="number-btn confirm-btn"
          onClick={handleCheck}
        >
          확인
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
    testMaxCount,
    isTestComplete,
    isTestStart,
    resetTest,
    setTestStart,
    setTestComplete,
    handleNumberClick,
    handleCheck,
    renderButtons,
  };
};

export default useNumberInput;
