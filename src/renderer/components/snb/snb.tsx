import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';

import ExamineeCard from '@components/main/examineeCard';
import ExamineeInfoPopup from './examineePopup';

import { setHistoryOpen, setTestStartOpen } from '@store/slices/popupToggle';

import { ColumnType } from '@main/util';

const snb = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [data, setData] = useState<ColumnType[] | null>(null);

  const dispatch = useDispatch();
  // TODO: will be removed
  const popupToggle = useSelector((state: RootState) => state.popupToggle);
  console.log(popupToggle);

  useEffect(() => {
    window.electron.ipcRenderer.on('sql-file-selected', (message) => {
      console.log('sql-file-selected');
      console.log(message);
      const colData = message as ColumnType[];
      if (colData !== null) {
        setData(colData);
      }
    });
  }, []);

  return (
    <div
      id="snb"
      className="snb flex flex-col justify-between h-full border-r-2 border-black box-border"
    >
      <ul className="snb-list flex shadow-md">
        <li className="flex items-center">
          <div className="text-examinee p-3 m-2.5">피검사자</div>
        </li>
        <li className="flex items-center ml-auto">
          <label htmlFor="backupData">
            <div className="text-examinee p-3 cursor-pointer m-2.5">
              백업하기
            </div>
          </label>
          <input
            type="file"
            name="backupData"
            id="backupData"
            className="hidden"
          />
        </li>
        <li className="flex items-center">
          <label htmlFor="examineeDataFile">
            <div className="text-examinee p-3 cursor-pointer m-2.5"
              onClick={() => {
                console.log('loadFile');
                window.electron.ipcRenderer.sendMessage('show-open-sql', []);
              }}>
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
            <a
              href="#!"
              className="text-left"
              onClick={() => {
                setPopupOpen(!isPopupOpen);
              }}
            >
              피검사자명
            </a>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => { dispatch(setHistoryOpen()); }}
          >
            {
              data !== null &&
              data.map((item) => <ExamineeCard props={item} key={item.id.toFixed()}/>)
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
