import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  setInsertResult,
} from '@store/slices/testResultProvider';

import {
  setNoticeOpen,
} from '@store/slices/navigateProvicer';

import RightSnb from '@components/snb/RightSnb';
import TestResult from '@components/main/TestResultComponent';

import { TestForm } from '@interfaces';
import { formToColumn } from '@lib/common';
// import TestResultPopup from './testResultPopup';

import isEmpty from 'lodash.isempty';

import { alertCustom } from '@lib/common';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const TestComplete = () => {
  const [testFormResult, setTestFormResult] = useState<TestForm>({} as TestForm);

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

    alertCustom({
      message: '저장되었습니다.',
      callback: () => dispatch(setNoticeOpen())
    });
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
    </>
  );
}

export default TestComplete;
