import { useState } from 'react';

import ico_angle_left from '@assets/images/icons/icon_angle_left.png';
import ico_angle_right from '@assets/images/icons/icon_angle_right.png';

import ExamineeInfoForm from './examineeInfoForm';
import PreCheckScreen from './preCheckScreen';
import CheckScreen from './checkScreen';
import TestResult from './testResult';

export default function TestForm() {
  let [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col h-full p-5">
      <div className="progress-bar flex justify-center items-center mb-10">
        {[0, 1, 2, 3].map(function (a, i) {
          return (
            <div
              key={i}
              className={
                currentPage === i
                  ? 'w-4 h-4 rounded-full bg-gray-300 mr-3 active'
                  : 'w-4 h-4 rounded-full bg-gray-300 mr-3'
              }
            >
              <p className="hidden">진행 단계 표시</p>
            </div>
          );
        })}
      </div>

      <div className="progress-btn-wrapper flex justify-center items-center relative w-full">
        <button
          disabled={currentPage === 0 ? true : false}
          type="button"
          className="absolute left-0 w-1/6 disabled:opacity-10"
          onClick={() => {
            setCurrentPage(--currentPage);
          }}
        >
          <img
            src={ico_angle_left}
            alt="icon_angle_left"
            className="w-full h-full "
          />
        </button>
        <button
          disabled={currentPage === 3 ? true : false}
          type="button"
          className="absolute right-0 w-1/6 disabled:opacity-10"
          onClick={() => {
            setCurrentPage(++currentPage);
          }}
        >
          <img
            src={ico_angle_right}
            alt="icon_angle_left"
            className="w-full h-full"
          />
        </button>
      </div>
      {currentPage === 0 && <ExamineeInfoForm />}
      {currentPage === 1 && <PreCheckScreen />}
      {currentPage === 2 && <CheckScreen />}
      {currentPage === 3 && <TestResult />}
    </div>
  );
}
