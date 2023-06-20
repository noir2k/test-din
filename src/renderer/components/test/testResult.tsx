import { useAppDispatch } from '@hook/index';

import { setNoticeOpen } from '@store/slices/popupToggle';

import RightSnb from '@components/snb/RightSnb';
import TestResultComponent from '@components/main/TestResultComponent';

// import TestResultPopup from './testResultPopup';

import ico_speaker from '@assets/images/icons/icon_speaker.png';
import test_result_img from '@assets/images/test_result_img.png';
import { useState } from 'react';

export default function TestResult() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // const dispatch = useAppDispatch();

  return (
    <>
      <RightSnb />
      {/* <TestResultPopup /> */}

      <div className="result-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>테스트 결과</p>
      </div>

      <div className="graph-wrapper">
        <TestResultComponent />
      </div>

      <div className="result-btn-wrapper">
        <button type="button">내 결과 오버레이</button>
        <button
          type="button"
          onClick={() => {
            setShowSuccessPopup(true);
          }}
        >
          저장 후 종료
        </button>
      </div>

      {showSuccessPopup && <SuccessPopup />}
    </>
  );
}

function SuccessPopup() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="popup-wrapper"></div>
      <div className="save-success-wrapper">
        <div className="editing-name-modal">
          <ul className="modal-item-wrapper">
            <li>
              <p>저장되었습니다.</p>
            </li>
          </ul>
          <ul className="modal-btn-wrapper">
            <li className="modal-btn-inner">
              <button
                className="confirm-btn"
                type="button"
                onClick={() => {
                  dispatch(setNoticeOpen());
                }}
              >
                확인
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
