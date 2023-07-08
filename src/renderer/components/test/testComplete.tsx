import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import { setInsertResult } from '@store/slices/testResultProvider';

import { setNoticeOpen } from '@store/slices/navigateProvicer';

import RightSnb from '@components/snb/rightSnb';
import TestResult from '@components/main/TestResultComponent';

import { TestForm } from '@interfaces';
import { formToColumn, alertCustom } from '@lib/common';

import iconSpeaker from '@assets/images/icons/icon_speaker.png';

const TestComplete = () => {
  const [testFormResult, setTestFormResult] = useState<TestForm>(
    {} as TestForm
  );

  const userData = useAppSelector((state: RootState) => state.userData);
  const testForm = useAppSelector((state: RootState) => state.testForm);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const saveTestResult = () => {
    let lastId = 0;
    if (testResult.data.length > 0 && testResult.data[0].id) {
      lastId = testResult.data[0].id;
    }

    const data = formToColumn(testFormResult, lastId);

    dispatch(setInsertResult(data));

    alertCustom({
      message: '저장되었습니다.',
      callback: () => dispatch(setNoticeOpen()),
    });
  };

  useEffect(() => {
    setTestFormResult(testForm);
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.invoke('set:temp', [
      {
        user: userData,
        data: testResult.data,
      },
    ]);
  }, [testResult.data.length]);

  return (
    <>
      <RightSnb />
      <div className="result-form-title">
        <img src={iconSpeaker} alt="speaker icon" />
        <p>테스트 결과</p>
      </div>
      <TestResult data={testFormResult} setData={setTestFormResult} />
      <div className="result-btn-wrapper">
        <button type="button" onClick={saveTestResult}>
          저장 후 종료
        </button>
      </div>
    </>
  );
};

export default TestComplete;
