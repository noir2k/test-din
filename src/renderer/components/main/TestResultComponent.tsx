import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import {
  setReplaceResult,
} from '@store/slices/testResultProvider';

import {
  setDimPopup,
} from '@store/slices/navigateProvicer';

import {
  XMarkIcon,
} from '@heroicons/react/24/outline';

import isEmpty from 'lodash.isempty';

import { TestForm } from '@interfaces';
import { ColumnName, DataRange } from '@lib/common';

const TestResult = ({...props}) => {
  const [isEditMemoShow, setEditMemoShow] = useState(false);
  const [memoStr, setMemoStr] = useState<string | undefined>('');
  const [result, setResult] = useState<TestForm>({} as TestForm);
  const [estimate, setEstimate] = useState('');

  const prevResultRef = useRef<TestForm>(result);

  const navigate = useAppSelector((state: RootState) => state.navigate);

  const dispatch = useAppDispatch();

  const findEst = (result: number | undefined) => {
    for (const e of Object.entries(DataRange)) {
      const key = e[0];
      const MIN = e[1][0];
      const MAX = e[1][1];
      if (!!result && (MIN <= result && MAX >= result)) {
        return key;
      }
    }
    return 'ERROR';
  }

  const showEditMemo = (toggle: boolean) => {
    setEditMemoShow(toggle);
    dispatch(setDimPopup(toggle));
  }

  const saveMemo = () => {
    const data = { ...result, memo: memoStr };
    setResult(data);
    if (props.isTestResult) {
      props.setData(data);
    } else if (!isEmpty(navigate.itemResult)) {
      const index = navigate.itemResult.index;
      dispatch(setReplaceResult({index: index, data: data}))
    }
    showEditMemo(false);
  }

  useEffect(() => {
    setMemoStr('');
    setEditMemoShow(false);
  }, [navigate.itemResult])

  useEffect(() => {
    setMemoStr(result.memo);
    prevResultRef.current = result;
  }, [result])

  useEffect(() => {
    if (props.isTestResult) {
      setEstimate(findEst(props.data.test_result));
      setResult(props.data);
    } else if (!isEmpty(navigate.itemResult)) {
      const data = navigate.itemResult.data;
      setEstimate(findEst(data.test_result));
      setResult(data);
    }
  }, [props.data, navigate.itemResult])

  return (
    <>
      <div className="test-result-wrapper">
        <div className="inner">
          <div className="flex-col leading-12 mb-3 text-center">
            <div className="text-xl font-bold">아이해브 청력테스트 Pro</div>
            <div className="text-lg font-bold">[Korean Digit-In-Noise test]</div>
          </div>
          <hr/>
          <div className="flex-row flex-wrap leading-8">
            <div><span className="font-bold">ID:</span>&nbsp; {result.patient_no}</div>
            <div><span className="font-bold">Name:</span>&nbsp; {result.user_name}</div>
            <div><span className="font-bold">Sex/Birth:</span>&nbsp; {result.gender} / {result.birthday}</div>
          </div>
          <hr/>
          <div className="flex-row flex-wrap leading-8">
            <div><span className="font-bold">Test Date:</span>&nbsp; {result.test_date}</div>
            <div><span className="font-bold">Tested by:</span>&nbsp; {result.tester_name}</div>
          </div>
          <hr/>
          <div className="flex-row flex-wrap leading-8">
            <div><span className="font-bold">Reciever:</span>&nbsp; {result.receiver}</div>
            <div><span className="font-bold">Mode:</span>&nbsp; {result.fixed_type}</div>
            <div><span className="font-bold">Stim Type:</span>&nbsp; {result.direction}</div>
            <div><span className="font-bold">Score:</span>&nbsp; {result.scoring}</div>
            <div><span className="font-bold">List:</span>&nbsp; {result.sound_set}</div>
          </div>
          <hr/>
          <div className="flex-row flex-wrap leading-8">
            <div><span className="font-bold">DIN SRT:</span>&nbsp; {result.test_result}db</div>
            <div><span className="font-bold">Esimated Hearing Level:</span>&nbsp; {estimate}</div>
          </div>
          <hr/>
          <div className="flex-row flex-wrap leading-8">
            <div><span className="font-bold">NOTE:</span><br /> {result.memo}</div>
          </div>
        </div>
        <div className="test-result-btn-wrapper">
          <button
            className={"test-result-btn"}
            type="button"
            onClick={() => showEditMemo(true)}
          >
            노트수정
          </button>
        </div>
      </div>
      {isEditMemoShow && (
        <div className="edit-note-wrapper">
          <div className="edit-note-title">
            <button
              type="button"
              className="close-btn"
              onClick={() => showEditMemo(false)}
            >
              <XMarkIcon className='h-8 w-8 text-white'/>
            </button>
          </div>
          <div className="edit-note-inner">
            <label htmlFor={ColumnName.memo} className="hidden">
              참고사항
            </label>
            <textarea
              id={ColumnName.memo}
              value={!!memoStr ? memoStr : ''}
              className="info-memo-input"
              placeholder="참고사항을 입력해주세요."
              autoFocus={true}
              onChange={(e) => setMemoStr(e.target.value)}
            />
          </div>
          <div className="edit-note-confirm">
            <button
              type="button"
              className="close-btn"
              onClick={saveMemo}
            >
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestResult;
