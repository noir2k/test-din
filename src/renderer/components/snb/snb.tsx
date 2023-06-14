import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';

import ExamineeCard from '@components/main/examineeCard';
import ExamineeInfoPopup from './examineePopup';

import { setHistoryOpen, setTestStartOpen } from '@store/slices/popupToggle';
import { getAnswers } from '@store/slices/answerProvider';

import { ColumnType } from '@main/util';

const snb = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exData, setExData] = useState<ColumnType[] | null>(null);

  const dispatch = useAppDispatch();

  // TODO: will be removed
  // const popupToggle = useAppSelector((state: RootState) => state.popupToggle);
  // console.log(popupToggle);
  // const answerProvider = useAppSelector((state: RootState) => state.answerProvider);
  // console.log(answerProvider);
  // TODO: will be removed END

  useEffect(() => {
    const channel = 'sql-file-selected';
    window.electron.ipcRenderer.on(channel, (data) => {
      const colData = data as ColumnType[];
      // console.log(colData);
      if (colData !== null) {
        setExData(colData);
        const isNoMore = colData.length < 10;
        setMoreData(!isNoMore);
      }
      setLoading(false);
    });
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  useEffect(() => {
    const channel = 'load-more-data';
    window.electron.ipcRenderer.on(channel, (data) => {
      const colData = data as ColumnType[];
      // console.log(colData);
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
    window.electron.ipcRenderer.on(channel, () => {
      setMoreData(false);
    });
    return () => window.electron.ipcRenderer.removeAllListeners(channel);
  });

  return (
    <div
      id="snb"
      className="snb flex flex-col justify-between h-full border-r-2 border-black box-border"
    >
      <ul className="snb-list flex shadow-md">
        <li className="flex items-center">
          <div className="text-examinee p-3 m-2.5"
            onClick={() => {
              console.log("getAnswer");
              getAnswers(2);
              // more load
              // setLoading(true);
              // window.electron.ipcRenderer.sendMessage('next-page', []);
            }
            }>
          피검사자
          </div>
        </li>
        <li className="flex items-center ml-auto">
          <label htmlFor="backupData">
            <div className="text-examinee p-3 cursor-pointer m-2.5"
              onClick={() => { window.electron.ipcRenderer.sendMessage('show-save-sql', []); }
            }>
              백업하기
            </div>
          </label>
        </li>
        <li className="flex items-center">
          <label htmlFor="examineeDataFile">
            <div className="text-examinee p-3 cursor-pointer m-2.5"
              onClick={() => {
                setLoading(true);
                window.electron.ipcRenderer.sendMessage('show-open-sql', []); }
              }>
              가져오기
            </div>
          </label>
        </li>
      </ul>
      <div className="import-success-screen overflow-y-auto">
        <div className="examinee-data-wrapper">
          <div className="data-text text-cyan-900 p-5">
            {isPopupOpen && (
              <ExamineeInfoPopup onClose={() => setPopupOpen(false)} />
            )}
            피검사자명
          </div>
          <div
            className="cursor-pointer"
            onClick={() => { dispatch(setHistoryOpen()); }}
          >
            {
              exData !== null &&
              exData.map((item) => <ExamineeCard props={item} key={item.id.toFixed()}/>)
            }
          </div>
        </div>
      </div>
      <div className="btn-wrapper flex items-center justify-center h-full">
        <button
          type="button"
          className="bg-lime-400 text-cyan-900 w-2/3"
          onClick={() => { dispatch(setTestStartOpen()); }}
        >
          검사하기
        </button>
      </div>
    </div>
  );
}

export default snb;
