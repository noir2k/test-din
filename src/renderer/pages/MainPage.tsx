/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

import TestForm from '@components/test/testForm';
import Header from '@components/header/header';
import Notice from '@components/main/notice';
import History from '@components/main/history';
import Setting from '@components/main/setting';
import Snb from '@components/snb/snb';

export default function MainPage() {
  const state = useSelector((state: RootState) => state);

  const isNoticeVisible = state.isNoticeVisible.isNoticeVisible;
  const isHistoryOpen = state.isHistoryOpen.isHistoryOpen;
  const isTestStarted = state.isTestStarted.isTestStarted;
  const isSettingOpen = state.isSettingOpen.isSettingOpen;

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-3/12">
          <Snb />
        </div>
        <div className="w-9/12">
          <main className="h-screen">
            <div
              id="mainContent"
              className="flex justify-center items-center h-full"
            >
              {isNoticeVisible && <Notice />}
              {isHistoryOpen && <History />}
              {isTestStarted && <TestForm />}
              {isSettingOpen && <Setting />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
