import ico_speaker_white from '@assets/images/icons/icon_speaker_white.png';

type RightSnbProps = {
  pageNum: number;
};

export default function RightSnb(props: RightSnbProps) {
  return (
    <>
      {props.pageNum === 1 && <PreCheckSnb />}
      {props.pageNum === 2 && <CheckSnb />}
    </>
  );
}

function PreCheckSnb() {
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

function CheckSnb() {
  return (
    <div className="right-snb-wrapper">
      <div className="right-snb-title">
        <img src={ico_speaker_white} alt="white speaker icon" />
        <p>검사 테스트</p>
      </div>
      <div className="right-snb-text on-test">
        <p>검사 사운드 세트: List 1</p>
        <p>사운드 제시 방향: Noise Left + Speech Right</p>
        <p>채점 방식: Digit Scoring</p>
      </div>
    </div>
  );
}
