import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@hook/index';
import { RootState } from '@store/index';

import isEmpty from 'lodash.isempty';

import bgCircle1 from '@assets/images/bg_circle_1.png';
import bgCircle2 from '@assets/images/bg_circle_2.png';
import bgCircle3 from '@assets/images/bg_circle_3.png';
import bgCircle4 from '@assets/images/bg_circle_4.png';

import Notice from '@components/main/notice';
import TestForm from '@components/test/testForm';
import TestResult from '@components/main/TestResultComponent';
import Snb from '@components/snb/snb';
import UserRegister from '@components/main/UserRegister';
import TestSession from '@components/main/TestSessionComponent';

import { setTestResult } from '@store/slices/testResultProvider';
import { setUserInfo } from '@store/slices/userDataProvider';

import { confirmCustom } from '@lib/common';

const MainPage = () => {
  const {
    isNoticeOpen,
    isTestResultOpen,
    isTestStartOpen,
    isUserRegister,
    isTestSessionOpen,
    isDimPopupOpen,
  } = useAppSelector((state: RootState) => state.navigate);

  const userData = useAppSelector((state: RootState) => state.userData);
  const testResult = useAppSelector((state: RootState) => state.testResult);

  const dispatch = useAppDispatch();

  const loadTempData = async () => {
    const temp = await window.electron.ipcRenderer.invoke('get:temp');
    // dispatch(setUserInfo(temp.user));
    // dispatch(setTestResult(temp.data));

    if (!isEmpty(temp) && !isEmpty(temp.user) && !isEmpty(temp.data)) {
      confirmCustom({
        title: '임시 정보 불러오기',
        message: `프로그램 종료전 진행하던 테스트가 있습니다.
이어서 진행하시겠습니까?`,
        callback: () => {
          dispatch(setUserInfo(temp.user));
          dispatch(setTestResult(temp.data));
        },
        dissmiss: () => {},
      });
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('react-route', ['MainPage']);
    loadTempData();
  }, []);

  useEffect(() => {
    window.electron.ipcRenderer.on('app-close', () => {
      if (!isEmpty(userData) && !isEmpty(testResult.data)) {
        window.electron.ipcRenderer
          .invoke('set:temp', [
            {
              user: userData,
              data: testResult.data,
            },
          ])
          .then(() => {
            window.electron.ipcRenderer.sendMessage('closed');
          });
      } else {
        window.electron.ipcRenderer.sendMessage('closed');
      }
    });
  });

  return (
    <div>
      <div className="main-container">
        {isDimPopupOpen && <div className="dim-popup-wrapper" />}
        <Snb />
        <div id="contents" className="contents-area">
          <main className="h-screen">
            <div
              id="mainContent"
              className="main-contents flex justify-center items-center"
            >
              {isNoticeOpen && <Notice />}
              {isUserRegister && <UserRegister />}
              {isTestResultOpen && <TestResult />}
              {isTestStartOpen && <TestForm />}
              {isTestSessionOpen && <TestSession />}
            </div>
            <div className="main-contents main-contents-bg">
              <img
                className="absolute bottom-0"
                src={bgCircle1}
                alt="background decoration"
              />
              <img
                className="absolute top-0 right-0"
                src={bgCircle2}
                alt="background decoration"
              />
              <img
                className="absolute right-0 bottom-0"
                src={bgCircle3}
                alt="background decoration"
              />
              <img
                className="absolute bg-circle-4"
                src={bgCircle4}
                alt="background decoration"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
