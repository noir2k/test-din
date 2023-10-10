import { useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';

import {
  ScoringOptions,
  SoundSetOptions,
  DirectionOptions,
  FixedTypeOptions,
} from '@lib/common';

const PreCheckSnb = () => {
  return (
    <div className="right-snb-wrapper">
      <div className="right-snb-title">
        <p>연습 및 MCL 확인</p>
      </div>
      <div className="right-snb-text">
        <p>
          연습 검사를 실시합니다. <br />
          검사 전 아래 레버를 움직여 <br />
          최적의 소리 강도를 찾아내세요.
        </p>
      </div>
    </div>
  );
};

const CheckSnb = () => {
  const testForm = useAppSelector((state: RootState) => state.testForm);

  const _soundSet = SoundSetOptions[testForm.sound_set?.toString() ?? ''];
  const _fixedType = FixedTypeOptions[testForm.fixed_type ?? ''];
  const _direction = DirectionOptions[testForm.direction ?? ''];
  const _scoring = ScoringOptions[testForm.scoring ?? ''];

  return (
    <div className="right-snb-wrapper">
      <div className="right-snb-title">
        <p>검사 현황</p>
      </div>
      <div className="right-snb-text on-test">
        <p>검사 사운드 세트: {_soundSet}</p>
        <p>사운드 제시 방식: {_fixedType}</p>
        <p>사운드 제시 방향: {_direction}</p>
        <p>채점 방식: {_scoring}</p>
        {testForm.test_result && testForm.test_estimate && (
          <p>
            점수 : {testForm.test_result}({testForm.test_estimate})
          </p>
        )}
        {testForm.test_datetime && <p>날짜 : {testForm.test_datetime}</p>}
      </div>
    </div>
  );
};

const RightSnb = () => {
  const testProgress = useAppSelector((state: RootState) => state.testProgress);

  return (
    <>
      {testProgress.currentPage === 1 && <PreCheckSnb />}
      {(testProgress.currentPage === 2 || testProgress.currentPage === 3) && (
        <CheckSnb />
      )}
    </>
  );
};

export default RightSnb;
