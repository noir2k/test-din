import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';
import hash from "object-hash";

import ico_home from '@assets/images/icons/icon_home.png';
import ico_settings from '@assets/images/icons/icon_settings.png';
import ico_user from '@assets/images/icons/icon_user_white.png';

import useInfiniteScroll from '@hook/useInfiniteScroll';

import ExamineeCard from '@components/main/examineeCard';

import {
  resetProgress
} from '@store/slices/testProgressProvider';

import {
  resetForm
} from '@store/slices/testFormProvider';

import {
  setNoticeOpen,
  setUserRegister,
  setInfoPopupOpen,
  setSettingOpen,
  setTestStartOpen,
} from '@store/slices/popupToggle';

import {
  setAlertModal,
} from '@store/slices/alertModalProvider';

import {
  setUserInfo,
  resetUserInfo,
} from '@store/slices/userDataProvider';

import { ColumnType } from '@interfaces';

const snb = () => {
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exData, setExData] = useState<ColumnType[] | null>(null);

  const userData = useAppSelector((state: RootState) => state.userData);

  const dispatch = useAppDispatch();

  const testStartOpen = () => {
    if (isEmpty(userData)) {
      dispatch(
        setAlertModal({
          isShow: true,
          title:'환자 정보 오류',
          message: `등록된 환자정보가 없습니다.
먼저 환자정보를 등록해주세요.`
        })
      );
    } else {
      dispatch(resetForm());
      dispatch(resetProgress());
      dispatch(setTestStartOpen());
    }
  }

  const userRegister = () => {
    let isConfirm = true;
    if (!isEmpty(userData)) {
      isConfirm = confirm(`이미 등록된 환자 정보가 있습니다.
신규 환자를 등록하시면 기존의 검사정보는 초기화 됩니다.

새로 등록하시겠습니까?`);
    }

    if (isConfirm) {
      setMoreData(false);
      setSelectedIndex(0);
      setExData(null);
      dispatch(resetUserInfo());
      dispatch(setUserRegister(true));
    }
  }

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
      setExData(colData);
      dispatch(setUserInfo(colData[0]));
      const isNoMore = colData.length < 10;
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
      if (colData !== null && exData !== null) {
        setExData([...exData, ...colData]);
        const isNoMore = colData.length < 10;
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

  return (
    <div id="snb" className="snb-container">
      <div className="child snb-setting-wrapper">
        <div className="snb-column-container">
          <div className="snb-icons-container">
            <div
              className="cursor-pointer"
              onClick={() => { dispatch(setNoticeOpen()); }}
            >
              <img width="26" src={ico_home} alt="icon_home" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => { dispatch(setSettingOpen()); }}
            >
              <img width="26" src={ico_settings} alt="icon_home" />
            </div>
          </div>
          <div className="snb-btn-container">
            <div className="snb-column-child-container">
              <button
                type="button"
                className="snb-column-child-btn btn-blue"
                onClick={userRegister}
              >
                신규환자등록
              </button>
            </div>
            <div className="snb-column-child-container">
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
            </div>
            <div className="snb-column-child-container">
              <label htmlFor="examineeDataFile">
                <button
                  className="snb-column-child-btn btn-import"
                  onClick={() => {
                    setLoading(true);
                    window.electron.ipcRenderer.sendMessage(
                      'show-open-sql',
                      []
                    );
                  }}
                >
                  불러오기
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="child snb-data-wrapper">
        <div className="examinee-data-wrapper">
          <div className="cursor-pointer data-text ml-5"
            onClick={() => {
              if (!isEmpty(userData)) {
                dispatch(setInfoPopupOpen());
              }
            }}
          >
            <img className="float-left mr-5" src={ico_user} alt="user icon" />
            <span className="text-white text-lg font-bold">
              {
                isEmpty(userData)
                  ? '환자명 (환자번호)'
                  : <p>{userData.user_name} ({userData.patient_no})</p>
              }
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
          {exData && exData.map((item) => (
            <div key={hash(item)} className={selectedIndex == item.id ? "selected-item" : ""} onClick={() => setSelectedIndex(item.id)}>
              <ExamineeCard item={item} />
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
          시작하기
        </button>
      </div>
    </div>
  );
};

export default snb;
