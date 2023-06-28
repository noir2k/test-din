import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  setInsertResult,
} from '@store/slices/testResultProvider';

import {
  setNoticeOpen,
  setDimPopup,
} from '@store/slices/navigateProvicer';

import RightSnb from '@components/snb/RightSnb';
import TestResult from '@components/main/TestResultComponent';

import { TestForm } from '@interfaces';
import { formToColumn } from '@lib/common';
// import TestResultPopup from './testResultPopup';

import isEmpty from 'lodash.isempty';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const TestComplete = () => {
  const [testFormResult, setTestFormResult] = useState<TestForm>({} as TestForm);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const testForm = useAppSelector((state: RootState) => state.testForm);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const saveTestResult = () => {
    let lastId = 0;
    if (!isEmpty(testResult.data)) {
      lastId = testResult.data[0].id;
    }

    const data = formToColumn(testFormResult, lastId);
    dispatch(setInsertResult(data));
    dispatch(setDimPopup(true));
    setShowSuccessPopup(true);
  }

  useEffect(() => {
    setTestFormResult(testForm);
  }, []);

  return (
    <>
      <RightSnb />
      {/* <TestResultPopup /> */}
      <div className="result-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>테스트 결과</p>
      </div>
      <TestResult isTestResult={true} data={testFormResult} setData={setTestFormResult}/>
      <div className="result-btn-wrapper">
        <button
          type="button"
          onClick={saveTestResult}
        >
          저장 후 종료
        </button>
      </div>

      {showSuccessPopup && <SuccessPopup show={setShowSuccessPopup}/>}
    </>
  );
}

const SuccessPopup = ({...props}) => {
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
                  props.show(false);
                  dispatch(setDimPopup(false));
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

export default TestComplete;
