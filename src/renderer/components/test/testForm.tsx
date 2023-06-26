import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@hook/index';
import type { RootState } from '@store/index';

import {
  nextPage,
  prevPage,
  setDelay,
} from '@store/slices/testProgressProvider';

import ico_angle_left from '@assets/images/icons/icon_angle_left.png';
import ico_angle_right from '@assets/images/icons/icon_angle_right.png';

import ExamineeInfoForm from './examineeInfoForm';
import PreCheckScreen from './preCheckScreen';
import CheckScreen from './checkScreen';
import TestComplete from './testComplete';

const TestForm = () => {
  const createPages = (length: number): number[] => {
    const array: number[] = [];
    for (let i = 0; i < length; i++) {
      array.push(i);
    }
    return array;
  }

  const testProgress = useAppSelector((state: RootState) => state.testProgress);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const conf = window.electron.store.get('config');
    if (conf && conf.soundInterval) {
      setDelay(conf.soundInterval);
    }
  }, []);

  const currentPage = testProgress.currentPage;
  const pages = createPages(testProgress.lastPage);

  return (
    <div className="test-form-wrapper">
      <div className="test-form-inner">
        <div className="progress-bar">
          {pages.map(function (a, i) {
            return (
              <div key={i} className={currentPage === i ? 'dot active' : 'dot'}>
                <p className="hidden">진행 단계 표시</p>
              </div>
            );
          })}
        </div>

        <div className="progress-btn-wrapper">
          <button
            disabled={currentPage === 0 ? true : false}
            type="button"
            className="progress-btn prev-btn"
            onClick={() => dispatch(prevPage())}
          >
            <img
              src={ico_angle_left}
              alt="icon_angle_left"
              className="icon-arrow"
            />
          </button>
          <button
            disabled={currentPage === 3 ? true : false}
            type="button"
            className="progress-btn next-btn"
            onClick={() => dispatch(nextPage())}
          >
            <img
              src={ico_angle_right}
              alt="icon_angle_left"
              className="icon-arrow"
            />
          </button>
        </div>

        <div className="test-contents-wrapper">
          {currentPage === 0 && <ExamineeInfoForm />}
          {currentPage === 1 && <PreCheckScreen />}
          {currentPage === 2 && <CheckScreen />}
          {currentPage === 3 && <TestComplete />}
        </div>
      </div>
    </div>
  );
}

export default TestForm;
