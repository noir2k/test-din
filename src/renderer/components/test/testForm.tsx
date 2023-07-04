import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@hook/index';
import type { RootState } from '@store/index';

import hash from 'object-hash';

import {
  nextPage,
  prevPage,
  setDelay,
} from '@store/slices/testProgressProvider';

import icoAngleLeft from '@assets/images/icons/icon_angle_left.png';
import icoAngleRight from '@assets/images/icons/icon_angle_right.png';

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
  };

  const testProgress = useAppSelector((state: RootState) => state.testProgress);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const conf = window.electron.store.get('config');
  //   if (conf && conf.soundInterval) {
  //     setDelay(conf.soundInterval);
  //   }
  // }, []);

  const { currentPage } = testProgress;
  const pages = createPages(testProgress.lastPage);

  return (
    <div className="test-form-wrapper">
      <div className="test-form-inner">
        <div className="progress-bar">
          {pages.map((a, index) => {
            return (
              <div
                key={hash(index).toString()}
                className={currentPage === index ? 'dot active' : 'dot'}
              >
                <p className="hidden">진행 단계 표시</p>
              </div>
            );
          })}
        </div>

        <div className="progress-btn-wrapper">
          <button
            disabled={currentPage === 0}
            type="button"
            className="progress-btn prev-btn"
            onClick={() => {
              /**
               * TODO: when release, remove this code
               * DISABLE import sql for release
               */
              // dispatch(prevPage())
            }}
          >
            <img
              src={icoAngleLeft}
              alt="icon_angle_left"
              className="icon-arrow"
            />
          </button>
          <button
            disabled={currentPage === 3}
            type="button"
            className="progress-btn next-btn"
            onClick={() => {
              /**
               * TODO: when release, remove this code
               * DISABLE import sql for release
               */
              // dispatch(nextPage())
            }}
          >
            <img
              src={icoAngleRight}
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
};

export default TestForm;
