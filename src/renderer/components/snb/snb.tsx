import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@hook/index';

import type { RootState } from '@store/index';
import useInfiniteScroll from '@hook/useInfiniteScroll';

import ExamineeCard from '@components/main/examineeCard';
import ExamineeInfoPopup from './examineePopup';

import { setTestStartOpen } from '@store/slices/popupToggle';
import { getAnswers } from '@store/slices/answerProvider';

import { ColumnType } from '@main/util';

const snb = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMoreData, setMoreData] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [exData, setExData] = useState<ColumnType[] | null>(null);

  const dispatch = useAppDispatch();

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && isMoreData && !isLoading) {
      setLoading(true);
      window.electron.ipcRenderer.sendMessage('next-page', []);
    }
  };

  const onLoadData = (data: unknown) => {
    const colData = data as ColumnType[];
      // console.log(colData);
      if (colData !== null) {
        setExData(colData);
        const isNoMore = colData.length < 10;
        setMoreData(!isNoMore);
      }
      setLoading(false);
  }

  const { setTarget } = useInfiniteScroll({ onIntersect });

  // TODO: will be removed
  // const popupToggle = useAppSelector((state: RootState) => state.popupToggle);
  // console.log(popupToggle);
  // const answerProvider = useAppSelector((state: RootState) => state.answerProvider);
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
    <div id="snb"
      className="snb-container h-full border-r-2 border-black box-border"
    >
      <div className="child">
        <div className="snb-column-container shadow-md">
          <div className="snb-column-child-container items-center">
            <div className="text-examinee"
              onClick={() => {
                console.log("getAnswer");
                console.log(getAnswers(2));
              }
              }>
            피검사자
            </div>
          </div>
          <div className="snb-column-child-container items-center">
            <label htmlFor="backupData">
              <div className="text-examinee cursor-pointer"
                onClick={() => { window.electron.ipcRenderer.sendMessage('show-save-sql', []); }
              }>
                백업하기
              </div>
            </label>
          </div>
          <div className="snb-column-child-container items-center">
            <label htmlFor="examineeDataFile">
              <div className="text-examinee cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  window.electron.ipcRenderer.sendMessage('show-open-sql', []); }
                }>
                가져오기
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="child">
        <div className="examinee-data-wrapper">
          <div className="data-text text-cyan-900 p-5">
            {isPopupOpen && (
              <ExamineeInfoPopup onClose={() => setPopupOpen(false)} />
            )}
            피검사자명
          </div>
          <button
            type="button"
            className="bg-transparent"
            onClick={() => {
              alert('버튼 클릭 시 출력되는 메시지 박스입니다.');
            }}
          >
            수정
          </button>
        </div>
      </div>
      <div className="child import-success-screen overflow-y-auto">
        <div>
          {
            exData !== null &&
            exData.map((item) => <ExamineeCard props={item} key={item.id.toFixed()}/>)
          }
        </div>
        <div className="scroll-end" ref={setTarget} />
      </div>
      <div className="child btn-wrapper">
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
