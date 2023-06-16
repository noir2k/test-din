import { useAppSelector } from '@hook/index';
import { RootState } from '@store/index';

import TestForm from '@components/test/testForm';
import Header from '@components/header/header';
import Notice from '@components/main/notice';
import History from '@components/main/history';
import Setting from '@components/main/SettingComponent';

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
      <Header />
      <div className="main-container">
        <div className="w-3/12">
          <Snb />
        </div>
        <div className="w-9/12">
          <main className="h-screen">
            <div
              id="mainContent"
              className="flex justify-center items-center h-full"
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
}

export default MainPage;
