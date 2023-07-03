import lgLogo from '@assets/images/logo/main_lg_logo.png';

const Notice = () => {
  return (
    <div className="notice-wrapper">
      <div className="notice-inner">
        <img width="480" height="100" alt="icon" src={lgLogo} />
        <p className="notice-text">
          검사 실시 전 메신저 알림 등<br />
          소리를 발생시키는 서비스를 종료해주세요. <br />
          검사 실시 전 기기 사운드 볼륨을 확인해주세요.
        </p>
      </div>
    </div>
  );
};

export default Notice;
