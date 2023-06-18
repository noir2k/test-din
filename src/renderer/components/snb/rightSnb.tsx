import { useAppSelector, useAppDispatch } from '@hook/index';
import type { RootState } from '@store/index';

import {
  ScoringOptions,
  SoundSetOptions,
  DirectionOptions
} from '@interfaces';

import ico_speaker_white from '@assets/images/icons/icon_speaker_white.png';

const RightSnb = () => {
  const testProgress = useAppSelector((state: RootState) => state.testProgress);

  console.log("currentPage" , testProgress.currentPage);

  return (
    <>
      {testProgress.currentPage === 1
        && <PreCheckSnb />}
      {(testProgress.currentPage === 2 || testProgress.currentPage === 3)
        && <CheckSnb />}
    </>
  );
}

const PreCheckSnb = () => {
  return (
    <div className="right-snb-wrapper">
      <div className="right-snb-title">
        <img src={ico_speaker_white} alt="white speaker icon" />
        <p>검사 테스트</p>
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
}

const CheckSnb = () => {
  const {sound_set, direction, scoring} = useAppSelector((state: RootState) => state.testForm);

  const _soundSet = SoundSetOptions[sound_set?.toString() ?? ''];
  const _direction = DirectionOptions[direction ?? ''];
  const _scoring = ScoringOptions[scoring ?? ''];

  return (
    <div className="right-snb-wrapper">
      <div className="right-snb-title">
        <p>검사 현황</p>
      </div>
      <div className="right-snb-text on-test">
        <p>검사 사운드 세트: {_soundSet}</p>
        <p>사운드 제시 방향: {_direction}</p>
        <p>채점 방식: {_scoring}</p>
      </div>
    </div>
  );
}

export default RightSnb;
