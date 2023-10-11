/* eslint-disable react/require-default-props */
import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import { setReplaceResult } from '@store/slices/testResultProvider';

import { setDimPopup } from '@store/slices/navigateProvicer';

import isEmpty from 'lodash.isempty';

import { TestForm } from '@interfaces';
import { ColumnName } from '@lib/common';

import AddUserIcon from '@assets/images/icons/icon_add_user.svg';
import UserIcon from '@assets/images/icons/icon_user.svg';
import HeadphoneIcon from '@assets/images/icons/icon_headphone.svg';
import BookmarkIcon from '@assets/images/icons/icon_bookmark.svg';
import NoteIcon from '@assets/images/icons/icon_note.svg';

interface PropsType {
  data?: TestForm;
  setData?: (data: TestForm) => void;
}

const TestResult = ({ data, setData }: PropsType) => {
  const [isEditMemoShow, setEditMemoShow] = useState(false);
  const [memoStr, setMemoStr] = useState<string | undefined>('');
  const [result, setResult] = useState<TestForm>({} as TestForm);

  const prevResultRef = useRef<TestForm>(result);

  const navigate = useAppSelector((state: RootState) => state.navigate);
  const userData = useAppSelector((state: RootState) => state.userData);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const showEditMemo = (toggle: boolean) => {
    setEditMemoShow(toggle);
    dispatch(setDimPopup(toggle));
  };

  const saveMemo = () => {
    const mergedData = { ...result, memo: memoStr || '' };
    setResult(mergedData);

    if (!!data && !isEmpty(data) && !!setData) {
      setData(mergedData);
    } else if (!isEmpty(navigate.itemResult)) {
      const { index } = navigate.itemResult;
      dispatch(setReplaceResult({ index, data: mergedData }));
    }
    showEditMemo(false);
  };

  useEffect(() => {
    window.electron.ipcRenderer.invoke('set:temp', [
      {
        user: userData,
        data: testResult.data,
      },
    ]);
  }, [testResult]);

  useEffect(() => {
    setMemoStr('');
    setEditMemoShow(false);
  }, [navigate.itemResult]);

  useEffect(() => {
    setMemoStr(result.memo);
    prevResultRef.current = result;
  }, [result]);

  useEffect(() => {
    if (!!data && !isEmpty(data) && !!setData) {
      setResult(data);
    } else if (
      !isEmpty(navigate.itemResult) &&
      !isEmpty(navigate.itemResult.data)
    ) {
      setResult(navigate.itemResult.data);
    }
  }, [data, navigate.itemResult]);

  return (
    <>
      <div className="test-result-wrapper">
        <div className="test-result-wrapper-inner">
          <div className="test-result-wrapper-item">
            <div>
              <AddUserIcon
                width={36}
                height={36}
                viewBox="0 0 32 32"
                fill="#000000"
              />
            </div>
            <div>
              <p>ID</p>
              <p>Name</p>
              <p>Sex/Birth</p>
            </div>
            <div>
              <p className="font-bold">{result.patient_no}</p>
              <p className="font-bold">{result.user_name}</p>
              <p className="font-bold">
                {result.gender} / {result.birthday}
              </p>
            </div>
          </div>
          <div className="test-result-wrapper-item">
            <div>
              <UserIcon
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="#000000"
              />
            </div>
            <div>
              <p>Test Date</p>
              <p>Tested by</p>
            </div>
            <div>
              <p className="font-bold">{result.test_datetime}</p>
              <p className="font-bold">{result.tester_name}</p>
            </div>
          </div>
          <div className="test-result-wrapper-item">
            <div>
              <HeadphoneIcon
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="#000000"
              />
            </div>
            <div>
              <p>Reciever</p>
              <p>Mode</p>
              <p>Stim Type</p>
              <p>Score</p>
              <p>List</p>
            </div>
            <div>
              <p className="font-bold">{result.receiver}</p>
              <p className="font-bold">{result.fixed_type}</p>
              <p className="font-bold">{result.direction}</p>
              <p className="font-bold">{result.scoring}</p>
              <p className="font-bold">{result.sound_set}</p>
            </div>
          </div>
          <div className="test-result-wrapper-item">
            <div>
              <BookmarkIcon
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="#000000"
              />
            </div>
            <div>
              <p>DIN SRT</p>
              <p>Esimated Hearing Level</p>
            </div>
            <div>
              <p className="font-bold">{result.test_result}</p>
              <p className="font-bold">{result.test_estimate}</p>
            </div>
          </div>
          <div className="test-result-wrapper-item">
            <div>
              <NoteIcon
                width={32}
                height={34}
                viewBox="0 0 32 34"
                fill="#000000"
              />
            </div>
            <div>
              <p>Note</p>
            </div>
            <div>
              <p className="font-bold">{result.memo}</p>
            </div>
          </div>
        </div>
        <div className="test-result-btn-wrapper">
          <button
            className="btn-template btn-small btn-deep-gray"
            type="button"
            onClick={() => showEditMemo(true)}
          >
            노트수정
          </button>
        </div>
      </div>
      {isEditMemoShow && (
        <div className="edit-note-wrapper">
          <div className="edit-note-inner">
            <label htmlFor={ColumnName.memo} className="hidden">
              참고사항
            </label>
            <textarea
              id={ColumnName.memo}
              value={memoStr || ''}
              className="info-memo-input"
              placeholder="참고사항을 입력해주세요."
              onChange={(e) => setMemoStr(e.target.value)}
            />
          </div>
          <div className="edit-note-confirm">
            <button type="button" className="close-btn" onClick={saveMemo}>
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TestResult;
