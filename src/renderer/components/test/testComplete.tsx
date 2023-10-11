import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import { setInsertResult } from '@store/slices/testResultProvider';

import { setNoticeOpen } from '@store/slices/navigateProvicer';

import TestResult from '@components/main/TestResultComponent';

import { TestForm } from '@interfaces';
import {
  formToColumn,
  alertCustom,
  ScoringOptions,
  SoundSetOptions,
  DirectionOptions,
  FixedTypeOptions,
} from '@lib/common';

const TestComplete = () => {
  const [testFormResult, setTestFormResult] = useState<TestForm>(
    {} as TestForm
  );

  const userData = useAppSelector((state: RootState) => state.userData);
  const testForm = useAppSelector((state: RootState) => state.testForm);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const _soundSet = SoundSetOptions[testForm.sound_set?.toString() ?? ''];
  const _fixedType = FixedTypeOptions[testForm.fixed_type ?? ''];
  const _direction = DirectionOptions[testForm.direction ?? ''];
  const _scoring = ScoringOptions[testForm.scoring ?? ''];

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
      <div className="check-form-title">
        <div className="check-form-header">
          <div className="check-form-header-start">
            <p>검사 현황</p>
          </div>
          <div className="check-form-header-mid">
            <p>검사 사운드 세트</p>
            <p>사운드 제시 방식</p>
            <p>사운드 제시 방향</p>
            <p>채점 방식</p>
          </div>
          <div className="check-form-header-end">
            <p>{_soundSet}</p>
            <p>{_fixedType}</p>
            <p>{_direction}</p>
            <p>{_scoring}</p>
          </div>
          <div className="check-form-header-result">
            <p>DIN SRT</p>
            <p>날짜</p>
          </div>
          <div className="check-form-header-result-value">
            <p>{testFormResult.test_result} dB</p>
            <p>{testFormResult.test_datetime}</p>
          </div>
        </div>
        <p>테스트 결과</p>
      </div>
      <TestResult data={testFormResult} setData={setTestFormResult} />
      <div className="result-btn-wrapper">
        <button
          type="button"
          className="btn-template btn-small"
          onClick={saveTestResult}
        >
          저장 후 종료
        </button>
      </div>
    </>
  );
};

export default TestComplete;
