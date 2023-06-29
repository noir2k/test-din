import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';
import hash from 'object-hash';

import {
  HomeIcon,
  Cog6ToothIcon,
  InboxIcon,
  PrinterIcon,
  PencilSquareIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

import useInfiniteScroll from '@hook/useInfiniteScroll';

import ExamineeCard from '@components/main/examineeCard';

import { resetForm } from '@store/slices/testFormProvider';

import { resetProgress } from '@store/slices/testProgressProvider';

import {
  setTestResult,
  setMergeResult,
  resetTestResult,
} from '@store/slices/testResultProvider';

import {
  setNoticeOpen,
  setUserRegister,
  setInfoPopupOpen,
  setSettingOpen,
  setTestStartOpen,
} from '@store/slices/navigateProvicer';

import { setUserInfo, resetUserInfo } from '@store/slices/userDataProvider';

import { ColumnType } from '@interfaces';
import { alertCustom, confirmCustom } from '@lib/common';

const PAGE_COUNT = 15;

const snb = () => {
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const userData = useAppSelector((state: RootState) => state.userData);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const testStartOpen = () => {
    if (isEmpty(userData)) {
      alertCustom({
        title: '환자 정보 오류',
        message: `등록된 환자 정보가 없습니다.\n환자 정보를 등록해주세요.`,
      });
    } else {
      dispatch(resetForm());
      dispatch(resetProgress());
      dispatch(setTestStartOpen());
    }
  };

  const createUserInfo = () => {
    setMoreData(false);
    setSelectedIndex(0);
    setLoading(false);
    dispatch(resetTestResult());
    dispatch(resetUserInfo());
    dispatch(setUserRegister(true));
  };

  const userRegister = () => {
    if (!isEmpty(userData)) {
      confirmCustom({
        title: '신규 환자 정보 등록 확인',
        message: `이미 등록된 환자 정보가 있습니다.
기존의 환자 정보 및 테스트 세션이 초기화 됩니다.

새로 등록하시겠습니까?`,
        callback: () => createUserInfo(),
      });
    } else {
      createUserInfo();
    }
  };

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && isMoreData && !isLoading) {
      setLoading(true);
      window.electron.ipcRenderer.sendMessage('next-page', []);
    }
  };

  const { setTarget } = useInfiniteScroll({ onIntersect });

  const onLoadData = (data: unknown) => {
    const colData = data as ColumnType[];
    if (colData !== null) {
      dispatch(setTestResult(colData));
      dispatch(setUserInfo(colData[0]));
      const isNoMore = colData.length < PAGE_COUNT;
      setMoreData(!isNoMore);
    }
    setLoading(false);
    dispatch(setNoticeOpen());
  };

  useEffect(() => {
    const channel = 'sql-file-selected';
    window.electron.ipcRenderer.on(channel, onLoadData);
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  useEffect(() => {
    const channel = 'reload-data';
    window.electron.ipcRenderer.on(channel, onLoadData);
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  useEffect(() => {
    const channel = 'update-user-name';
    window.electron.ipcRenderer.on(channel, onLoadData);
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  useEffect(() => {
    const channel = 'load-more-data';
    window.electron.ipcRenderer.on(channel, (data) => {
      const colData = data as ColumnType[];
      if (colData !== null && testResult.data !== null) {
        const result = colData.map((item: ColumnType) => {
          return {
            ...item,
            user_name: userData.user_name,
            gender: userData.gender,
            birthday: userData.birthday,
            patient_no: userData.patient_no,
          };
        });
        dispatch(setMergeResult(result));
        const isNoMore = colData.length < PAGE_COUNT;
        setMoreData(!isNoMore);
      }
      setLoading(false);
    });

    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  useEffect(() => {
    const channel = 'no-more-data';
    window.electron.ipcRenderer.on(channel, () => setMoreData(false));
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  // TODO: remove system confirm popup

  return (
    <div id="snb" className="snb-container">
      <div className="child snb-setting-wrapper">
        <div className="snb-column-container">
          <div className="snb-icons-container">
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(setNoticeOpen());
              }}
            >
              <HomeIcon className="h-8 w-8 text-black" />
            </div>
            {/**
             * TODO: when release, remove this code
             * DISABLE import sql for release
             */}
            {/* <div
              className="cursor-pointer"
              onClick={() => {
                setLoading(true);
                window.electron.ipcRenderer.sendMessage(
                  'show-open-sql',
                  []
                );
              }}
            >
              <InboxIcon className='h-8 w-8 text-black' />
            </div> */}
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(setSettingOpen());
              }}
            >
              <Cog6ToothIcon className="h-8 w-8 text-black" />
            </div>
          </div>
          <div className="snb-btn-container">
            <div className="snb-column-child-container">
              <button
                type="button"
                className="snb-column-child-btn btn-blue"
                onClick={userRegister}
              >
                <span>
                  <UserPlusIcon className="h-4 w-4 text-white mr-1" />
                  신규환자등록
                </span>
              </button>
            </div>
            {/* <div className="snb-column-child-container">
              <label htmlFor="backupData">
                <button
                  type="button"
                  className="snb-column-child-btn btn-backup"
                  onClick={() => {
                    window.electron.ipcRenderer.sendMessage(
                      'show-save-sql',
                      []
                    );
                  }}
                >
                  저장하기
                </button>
              </label>
            </div> */}
            <div className="snb-column-child-container">
              <button
                type="button"
                className="snb-column-child-btn btn-print"
                onClick={() => {}}
              >
                <span>
                  <PrinterIcon className="h-4 w-4 text-white mr-1" />
                  결과지 출력
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="child snb-data-wrapper">
        <div className="examinee-data-wrapper">
          <div
            className="cursor-pointer data-text ml-5"
            onClick={() => {
              if (!isEmpty(userData)) {
                dispatch(setInfoPopupOpen());
              }
            }}
          >
            <span className="user-info-span">
              <UserIcon className="h-8 w-8 text-white mr-1" />
              <p>
                {isEmpty(userData)
                  ? '환자명 (환자번호)'
                  : `${userData.user_name} (${userData.patient_no})`}
              </p>
            </span>
          </div>
          <button
            type="button"
            className="bg-transparent snb-column-child-btn snb-modify-btn"
            disabled={isEmpty(userData)}
            onClick={() => {
              if (!isEmpty(userData)) {
                dispatch(setUserRegister(false));
              }
            }}
          >
            수정
          </button>
        </div>
      </div>
      <div className="child import-success-screen overflow-y-auto">
        <div>
          {!isEmpty(testResult.data) &&
            testResult.data.map((item, index) => (
              <div
                key={hash(item)}
                id={hash(item)}
                className={selectedIndex === item.id ? 'selected-item' : ''}
                onClick={() => setSelectedIndex(item.id)}
              >
                <ExamineeCard item={item} index={index} />
              </div>
            ))}
        </div>
        <div className="scroll-end" ref={setTarget} />
      </div>
      <div className="child btn-wrapper">
        <button
          type="button"
          className="test-start-btn text-xl"
          onClick={testStartOpen}
        >
          <PencilSquareIcon className="h-8 w-8 text-white mr-1" />
          <span>시작하기</span>
        </button>
      </div>
    </div>
  );
};

export default snb;
