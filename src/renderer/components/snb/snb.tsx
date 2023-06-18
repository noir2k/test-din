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
  setNoticeOpen,
  setEditingName,
  setInfoPopupOpen,
  setSettingOpen,
  setTestStartOpen,
} from '@store/slices/popupToggle';
import { setUserInfo } from '@store/slices/userDataProvider';
import { getAnswers } from '@store/slices/answerProvider';

import { ColumnType } from '@interfaces';

const snb = () => {
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exData, setExData] = useState<ColumnType[] | null>(null);

  const userData = useAppSelector((state: RootState) => state.userData);

  const dispatch = useAppDispatch();

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
      console.log(colData);
      dispatch(setUserInfo(colData[0]));
      const isNoMore = colData.length < 10;
      setMoreData(!isNoMore);
    }
    setLoading(false);
  };

  // TODO: will be removed
  // const popupToggle = useAppSelector((state: RootState) => state.popupToggle);
  // console.log(popupToggle);
  // const answerProvider = useAppSelector((state: RootState) => state.answer);
  // console.log(answerProvider);
  // TODO: will be removed END

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
            <a
              href="!#"
              onClick={() => {
                dispatch(setNoticeOpen());
              }}
            >
              <img width="26" src={ico_home} alt="icon_home" />
            </a>
            <a
              href="!#"
              onClick={() => {
                dispatch(setSettingOpen());
              }}
            >
              <img width="26" src={ico_settings} alt="icon_home" />
            </a>
          </div>
          <div className="snb-btn-container">
            <div className="snb-column-child-container">
              <button
                type="button"
                className="snb-column-child-btn btn-blue"
                onClick={() => {
                  console.log('getAnswer');
                  console.log(getAnswers(2));
                }}
              >
                피검사자
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
                  백업하기
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
                  가져오기
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="child snb-data-wrapper">
        <div className="examinee-data-wrapper">
          <a
            className="cursor-pointer data-text ml-5"
            onClick={() => {
              if (isEmpty(userData)) {
                alert('사용자 검사 정보가 없습니다.')
              } else {
                dispatch(setInfoPopupOpen());
              }
            }}
          >
            <img className="float-left mr-5" src={ico_user} alt="user icon" />
            <span className="text-white">피검사자명</span>
          </a>
          <button
            type="button"
            className="bg-transparent snb-column-child-btn snb-modify-btn"
            disabled={isEmpty(userData)}
            onClick={() => {
              if (!isEmpty(userData)) {
                dispatch(setEditingName());
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
          className="test-start-btn"
          onClick={() => {
            dispatch(setTestStartOpen());
          }}
        >
          검사하기
        </button>
      </div>
    </div>
  );
};

export default snb;
