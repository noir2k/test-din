import { useState } from 'react';

const useNumberInput = () => {
  const [digits, setDigits] = useState(['', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [error, setError] = useState(false);
  const totalQuestions = 25;

  const handleNumberClick = (number: string) => {
    if (currentIndex < 3) {
      const updatedDigits = [...digits];
      updatedDigits[currentIndex] = number;
      setDigits(updatedDigits);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCheck = () => {
    if (currentIndex === 3) {
      if (count < totalQuestions) {
        setCount(count + 1);
        setDigits(['', '', '']);
        setCurrentIndex(0);
        setError(false);
      }
    } else {
      setError(true);
      alert('모든 숫자가 입력되지 않았습니다.');
    }
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <div key={i} className="w-1/3 p-1">
          <button
            className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
            onClick={() => handleNumberClick(i.toString())}
          >
            {i}
          </button>
        </div>
      );
    }
    buttons.push(
      <div key={-1} className="w-1/3">
        <button className="hidden" disabled>
          간격 조절용 버튼
        </button>
      </div>
    );
    buttons.push(
      <div key={0} className="w-1/3">
        <button
          className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
      </div>
    );
    buttons.push(
      <div key="confirm" className="w-1/3">
        <button
          className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
          onClick={handleCheck}
        >
          &#10003;
        </button>
      </div>
    );
    return buttons;
  };

  return {
    digits,
    currentIndex,
    count,
    error,
    totalQuestions,
    handleNumberClick,
    handleCheck,
    renderButtons,
  };
};

export default useNumberInput;
