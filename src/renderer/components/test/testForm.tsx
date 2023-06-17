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
    <div className="test-form-wrapper">
      <div className="test-form-inner">
        <div className="progress-bar">
          {[0, 1, 2, 3].map(function (a, i) {
            return (
              <div key={i} className={currentPage === i ? 'dot active' : 'dot'}>
                <p className="hidden">진행 단계 표시</p>
              </div>
            );
          })}
        </div>

        <div className="progress-btn-wrapper">
          <button
            disabled={currentPage === 0 ? true : false}
            type="button"
            className="progress-btn prev-btn"
            onClick={() => {
              setCurrentPage(--currentPage);
            }}
          >
            <img
              src={ico_angle_left}
              alt="icon_angle_left"
              className="icon-arrow"
            />
          </button>
          <button
            disabled={currentPage === 3 ? true : false}
            type="button"
            className="progress-btn next-btn"
            onClick={() => {
              setCurrentPage(++currentPage);
            }}
          >
            <img
              src={ico_angle_right}
              alt="icon_angle_left"
              className="icon-arrow"
            />
          </button>
        </div>

        <div className="test-contents-wrapper">
          {currentPage === 0 && <ExamineeInfoForm />}
          {currentPage === 1 && <PreCheckScreen />}
          {currentPage === 2 && <CheckScreen />}
          {currentPage === 3 && <TestResult />}
        </div>
      </div>
    </div>
  );
}
