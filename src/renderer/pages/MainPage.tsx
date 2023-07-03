import { useAppSelector } from '@hook/index';
import { RootState } from '@store/index';

import bgCircle1 from '@assets/images/bg_circle_1.png';
import bgCircle2 from '@assets/images/bg_circle_2.png';
import bgCircle3 from '@assets/images/bg_circle_3.png';
import bgCircle4 from '@assets/images/bg_circle_4.png';

import Notice from '@components/main/notice';
import TestForm from '@components/test/testForm';
import TestResult from '@components/main/TestResultComponent';
import Setting from '@components/main/SettingComponent';
import Snb from '@components/snb/snb';
import UserRegister from '@components/main/UserRegister';
import TestSession from '@components/main/TestSessionComponent';

const MainPage = () => {
  const {
    isNoticeOpen,
    isTestResultOpen,
    isTestStartOpen,
    isSettingOpen,
    isUserRegister,
    isTestSessionOpen,
    isDimPopupOpen,
  } = useAppSelector((state: RootState) => state.navigate);

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
              {isSettingOpen && <Setting />}
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
