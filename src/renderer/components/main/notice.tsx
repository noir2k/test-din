import ico_speaker from '@assets/images/icons/icon_speaker.png';

export default function Notice() {
  return (
    <div className="notice-wrapper">
      <div className="notice-inner">
        <img width="30" src={ico_speaker} alt="speaker icon" />
        <p className="notice-text">
          본 검사는 XXX 청각 테스트 검사입니다. <br />
          검사 전에 윈도우 알림 등 다른 사운드를 발생시키는 <br />
          서비스를 종료해 주세요. <br />
          검사 전에 기기 사운드 볼륨을 적당한 수준으로 조정해 주세요.
        </p>
      </div>
    </div>
  );
}
