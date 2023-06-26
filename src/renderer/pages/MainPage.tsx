import { useAppSelector } from '@hook/index';
import { RootState } from '@store/index';

import bg_circle_1 from '@assets/images/bg_circle_1.png';
import bg_circle_2 from '@assets/images/bg_circle_2.png';
import bg_circle_3 from '@assets/images/bg_circle_3.png';
import bg_circle_4 from '@assets/images/bg_circle_4.png';

import TestForm from '@components/test/testForm';
import Notice from '@components/main/Notice';
import TestResult from '@components/main/TestResultComponent';
import Setting from '@components/main/SettingComponent';
import Snb from '@components/snb/snb';
import ExamineeInfoPopup from '@components/snb/examineePopup';
import UserRegister from '@components/main/UserRegister';

import AlertModal from '@hook/AlertModal';

const MainPage = () => {
  const navigate = useAppSelector((state: RootState) => state.navigate);

  const isNoticeOpen = navigate.isNoticeOpen;
  const isTestResultOpen = navigate.isTestResultOpen;
  const isTestStartOpen = navigate.isTestStartOpen;
  const isSettingOpen = navigate.isSettingOpen;
  const isInfoPopupOpen = navigate.isInfoPopupOpen;
  const isUserRegister = navigate.isUserRegister;

  return (
    <div>
      <div className="main-container">
        <Snb />
        <div id="contents" className="contents-area">
          <main className="h-screen">
            <div
              id="mainContent"
              className="main-contents flex justify-center items-center"
            >
              {isNoticeOpen && <Notice />}
              {isInfoPopupOpen && <ExamineeInfoPopup />}
              {isUserRegister && <UserRegister />}
              {isTestResultOpen && <TestResult />}
              {isTestStartOpen && <TestForm />}
              {isSettingOpen && <Setting />}
            </div>
            <div className="main-contents main-contents-bg">
              <img
                className="absolute bottom-0"
                src={bg_circle_1}
                alt="background decoration"
              />
              <img
                className="absolute top-0 right-0"
                src={bg_circle_2}
                alt="background decoration"
              />
              <img
                className="absolute right-0 bottom-0"
                src={bg_circle_3}
                alt="background decoration"
              />
              <img
                className="absolute bg-circle-4"
                src={bg_circle_4}
                alt="background decoration"
              />
            </div>
            <AlertModal />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
