import {
  // useEffect,
  useState,
  useRef,
} from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';
import hash from 'object-hash';
import CSVReader from 'react-csv-reader';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

// import useInfiniteScroll from '@hook/useInfiniteScroll';
import ExamineeCard from '@components/main/examineeCard';
import { resetForm } from '@store/slices/testFormProvider';
import { resetProgress } from '@store/slices/testProgressProvider';

import {
  setTestResult,
  // setMergeResult,
  resetTestResult,
} from '@store/slices/testResultProvider';

import {
  setNoticeOpen,
  setUserRegister,
  setTestStartOpen,
  setTestSession,
} from '@store/slices/navigateProvicer';

import { setUserInfo, resetUserInfo } from '@store/slices/userDataProvider';

import { UserInfo, TestForm } from '@interfaces';
import { ColumnNameHeader, alertCustom, confirmCustom } from '@lib/common';

import HomeIcon from '@assets/images/icons/icon_home.svg';
import AddUserIcon from '@assets/images/icons/icon_add_user.svg';
import PrinterIcon from '@assets/images/icons/icon_printer.svg';
import DownloadIcon from '@assets/images/icons/icon_download.svg';
import ProfileIcon from '@assets/images/icons/icon_profile.svg';

// const PAGE_COUNT = 15;
const headerArr = ColumnNameHeader.map((item) => {
  return item.key;
});

const snb = () => {
  const importCsvRef = useRef<HTMLInputElement>(null);

  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  // const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDisableTest, setDisableTest] = useState(false);
  const [isAddUserFocused, setAddUserFocus] = useState(false);
  const [isDownloadFocused, setDownloadFocus] = useState(false);
  const [isPrinterFocused, setPrinterFocus] = useState(false);

  const userData = useAppSelector((state: RootState) => state.userData);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string, index: number) => {
      return headerArr[index];
    },
  };

  const handleLoadFileInfo = (data: TestForm[]) => {
    const { user_name, gender, birthday, patient_no, tester_name, sessionId } =
      data[0];

    const userInfo: UserInfo = {
      user_name,
      gender,
      birthday,
      patient_no,
      tester_name,
      sessionId,
    };

    setLoading(false);
    setDisableTest(true);
    dispatch(setNoticeOpen());
    dispatch(setUserInfo(userInfo));
    dispatch(setTestResult(data));
  };

  const handleFileLoad = (data: any) => {
    confirmCustom({
      title: '환자 정보 불러오기',
      message: `현재 진행중인 테스트 세션 및 환자 정보가 초기화 됩니다.

진행하시겠습니까?`,
      callback: () => handleLoadFileInfo(data),
      dissmiss: () => {
        if (importCsvRef.current) {
          importCsvRef.current.value = '';
        }
      },
    });
  };

  const testStartOpen = () => {
    if (isEmpty(userData)) {
      alertCustom({
        title: '환자 정보 오류',
        message: `등록된 환자 정보가 없습니다.\n환자 정보를 등록해주세요.`,
      });
    } else if (isDisableTest) {
      alertCustom({
        title: '테스트 시작 오류',
        message: `불러오기로 등록된 환자는\n결과지 보기 및 출력만 가능합니다.`,
      });
    } else {
      dispatch(resetForm());
      dispatch(resetProgress());
      dispatch(setTestStartOpen());
    }
  };

  const createUserInfo = () => {
    // setMoreData(false);
    setDisableTest(false);
    setSelectedIndex(0);
    setLoading(false);
    dispatch(resetTestResult());
    dispatch(resetUserInfo());
    dispatch(setUserRegister(true));
  };

  // const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
  //   if (isIntersecting && isMoreData && !isLoading) {
  //     setLoading(true);
  //     window.electron.ipcRenderer.sendMessage('next-page', []);
  //   }
  // };

  // const { setTarget } = useInfiniteScroll({ onIntersect });

  // const onLoadData = (data: unknown) => {
  //   const colData = data as TestForm[];
  //   if (colData !== null) {
  //     dispatch(setTestResult(colData));
  //     dispatch(setUserInfo(colData[0]));
  //     const isNoMore = colData.length < PAGE_COUNT;
  //     setMoreData(!isNoMore);
  //   }
  //   setLoading(false);
  //   dispatch(setNoticeOpen());
  // };

  const handleOpenTestSession = () => {
    if (testResult.data.length > 0) {
      dispatch(setTestSession());
    } else {
      alertCustom({
        title: '테스트 세션 오류',
        message: `저장된 테스트 세션이 없습니다.\n신규 테스트를 등록해주세요.`,
      });
    }
  };

  const userRegister = () => {
    if (!isEmpty(userData)) {
      confirmCustom({
        title: '신규 환자 정보 등록 확인',
        message: `이미 등록된 환자 정보가 있습니다.\n현재 진행중인 테스트 세션 및 환자 정보가 초기화 됩니다.\n\n신규 환자를 등록하시겠습니까?`,
        callback: () => createUserInfo(),
      });
    } else {
      createUserInfo();
    }
  };

  // useEffect(() => {
  //   const channel = 'sql-file-selected';
  //   window.electron.ipcRenderer.on(channel, onLoadData);
  //   return () => window.electron.ipcRenderer.removeAllListeners(channel);
  // });

  // useEffect(() => {
  //   const channel = 'reload-data';
  //   window.electron.ipcRenderer.on(channel, onLoadData);
  //   return () => window.electron.ipcRenderer.removeAllListeners(channel);
  // });

  // useEffect(() => {
  //   const channel = 'update-user-name';
  //   window.electron.ipcRenderer.on(channel, onLoadData);
  //   return () => window.electron.ipcRenderer.removeAllListeners(channel);
  // });

  // useEffect(() => {
  //   const channel = 'load-more-data';
  //   window.electron.ipcRenderer.on(channel, (data) => {
  //     const colData = data as TestForm[];
  //     if (colData !== null && testResult.data !== null) {
  //       const result = colData.map((item: TestForm) => {
  //         return {
  //           ...item,
  //           user_name: userData.user_name,
  //           gender: userData.gender,
  //           birthday: userData.birthday,
  //           patient_no: userData.patient_no,
  //         };
  //       });
  //       dispatch(setMergeResult(result));
  //       const isNoMore = colData.length < PAGE_COUNT;
  //       setMoreData(!isNoMore);
  //     }
  //     setLoading(false);
  //   });

  //   return () => window.electron.ipcRenderer.removeAllListeners(channel);
  // });

  // useEffect(() => {
  //   const channel = 'no-more-data';
  //   window.electron.ipcRenderer.on(channel, () => setMoreData(false));
  //   return () => window.electron.ipcRenderer.removeAllListeners(channel);
  // });

  return (
    <div id="snb" className="snb-container">
      <div className="snb-container-wrapper">
        <div className="child snb-setting-wrapper">
          <div className="snb-column-container">
            <div className="snb-icons-container">
              <div
                className="cursor-pointer"
                onClick={() => {
                  dispatch(setNoticeOpen());
                }}
              >
                {/* <img alt="homeIconUrl" src={HomeIcon} /> */}
                <HomeIcon className="snb-icon" />
              </div>
            </div>
            <div className="snb-btn-container">
              <div
                className="snb-column-child-container"
                onMouseEnter={() => {
                  setAddUserFocus(true);
                }}
                onMouseLeave={() => {
                  setAddUserFocus(false);
                }}
              >
                <span
                  className={
                    isAddUserFocused
                      ? 'snb-menu-text-show'
                      : 'snb-menu-text-hide'
                  }
                >
                  신규환자등록
                </span>
                <div className="cursor-pointer" onClick={userRegister}>
                  <AddUserIcon className="snb-icon" />
                </div>
              </div>
              <div
                className="snb-column-child-container"
                onMouseEnter={() => {
                  setDownloadFocus(true);
                }}
                onMouseLeave={() => {
                  setDownloadFocus(false);
                }}
              >
                <span
                  className={
                    isDownloadFocused
                      ? 'snb-menu-text-show'
                      : 'snb-menu-text-hide'
                  }
                >
                  불러오기
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setLoading(true);
                    importCsvRef.current!.click();
                    // window.electron.ipcRenderer.sendMessage('show-open-sql', []);
                  }}
                >
                  <DownloadIcon className="snb-icon" />
                  <CSVReader
                    ref={importCsvRef}
                    cssClass="csv-reader-input"
                    onFileLoaded={handleFileLoad}
                    // onError={}
                    parserOptions={papaparseOptions}
                  />
                </div>
              </div>
              {/**
               * TODO: when release, remove this code
               * DISABLE import sql for release
               */}
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
              <div
                className="snb-column-child-container"
                onMouseEnter={() => {
                  setPrinterFocus(true);
                }}
                onMouseLeave={() => {
                  setPrinterFocus(false);
                }}
              >
                <span
                  className={
                    isPrinterFocused
                      ? 'snb-menu-text-show'
                      : 'snb-menu-text-hide'
                  }
                >
                  결과지 출력
                </span>
                <div className="cursor-pointer" onClick={handleOpenTestSession}>
                  <PrinterIcon className="snb-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="child snb-data-wrapper">
          <div className="examinee-data-wrapper">
            <div className="data-text">
              <span className="user-info-span">
                <ProfileIcon className="snb-icon mr-4" />
                <p>
                  {isEmpty(userData)
                    ? '환자명 (환자번호)'
                    : `${userData.user_name} (${userData.patient_no})`}
                </p>
              </span>
            </div>
            {/* <button
              type="button"
              className="bg-transparent snb-column-child-btn snb-modify-btn"
              disabled={isEmpty(userData)}
              onClick={() => {
                if (!isEmpty(userData)) {
                  dispatch(setUserRegister(false));
                }
              }}
            > */}
            <div
              className="cursor-pointer snb-column-child-btn snb-modify-btn"
              onClick={() => {
                if (!isEmpty(userData)) {
                  dispatch(setUserRegister(false));
                }
              }}
            >
              수정
            </div>
            {/* </button> */}
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
                  <ExamineeCard
                    item={item}
                    index={index}
                    selected={selectedIndex === item.id}
                  />
                </div>
              ))}
          </div>
          {/* <div className="scroll-end" ref={setTarget} /> */}
        </div>
        <div className="child btn-wrapper">
          <button
            type="button"
            className={
              isDisableTest
                ? 'test-start-btn deactive-btn text-xl'
                : 'test-start-btn text-xl'
            }
            onClick={testStartOpen}
          >
            <PencilSquareIcon className="h-8 w-8 text-white mr-1" />
            <span>테스트시작</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default snb;
