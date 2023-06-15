/* eslint-disable camelcase */
import { useAppSelector } from '@hook/index';
import { RootState } from '@store/index';

import bg_circle_1 from '@assets/images/bg_circle_1.png';
import bg_circle_2 from '@assets/images/bg_circle_2.png';
import bg_circle_3 from '@assets/images/bg_circle_3.png';
import bg_circle_4 from '@assets/images/bg_circle_4.png';

import TestForm from '@components/test/testForm';
import Notice from '@components/main/notice';
import History from '@components/main/history';
import Setting from '@components/main/setting';
import Snb from '@components/snb/snb';

const MainPage = () => {
  // const state = useAppSelector((state: RootState) => state);
  const popupToggle = useAppSelector((state: RootState) => state.popupToggle);

  const isNoticeOpen = popupToggle.isNoticeOpen;
  const isHistoryOpen = popupToggle.isHistoryOpen;
  const isTestStartOpen = popupToggle.isTestStartOpen;
  const isSettingOpen = popupToggle.isSettingOpen;

  return (
    <div>
      <div className="main-container">
        <Snb />
        <div id="contents">
          <img
            className="absolute bottom-0"
            src={bg_circle_1}
            alt="background decoration"
          />
          <img
            className="absolute right-0"
            src={bg_circle_2}
            alt="background decoration"
          />
          <img
            className="absolute right-0 bottom-0"
            src={bg_circle_3}
            alt="background decoration"
          />
          <img
            className="absolute right-2/4 bottom-2/3"
            src={bg_circle_4}
            alt="background decoration"
          />
          <main className="h-screen">
            <div
              id="mainContent"
              className="main-contents flex justify-center items-center h-full"
            >
              {isNoticeOpen && <Notice />}
              {isHistoryOpen && <History />}
              {isTestStartOpen && <TestForm />}
              {isSettingOpen && <Setting />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
