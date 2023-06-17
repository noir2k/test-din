import { useAppDispatch } from '@hook/index';

import { setNoticeOpen } from '@store/slices/popupToggle';

import RightSnb from '@components/snb/rightSnb';

import ico_speaker from '@assets/images/icons/icon_speaker.png';
import ico_check_circle from '@assets/images/icons/icon_check_circle.png';
import test_result_img from '@assets/images/test_result_img.png';
import { useState } from 'react';

export default function TestResult() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <>
      <RightSnb pageNum={3} />

      <div className="score-result-wrapper">
        <div className="score-result">
          <img src={ico_check_circle} alt="check circle" />
          <p className="currect-answer">사운드1: 정답</p>
        </div>
        <div className="score-result">
          <img src={ico_check_circle} alt="check circle" />
          <p className="currect-answer">사운드2: 정답</p>
        </div>
        <div className="score-result">
          <img src={ico_check_circle} alt="check circle" />
          <p className="currect-answer">사운드3: 정답</p>
        </div>
      </div>

      <div className="result-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>테스트 결과</p>
      </div>

      <div className="graph-wrapper">
        {/* TODO: 그래프 삽입하기 */}
        <img src={test_result_img} alt="test result image" />
      </div>

      <div className="result-btn-wrapper">
        <button type="button">내 결과 오버레이</button>
        <button type="button">PDF로 저장</button>
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
