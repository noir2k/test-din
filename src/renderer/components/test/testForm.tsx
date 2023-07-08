import { useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';

import hash from 'object-hash';

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
