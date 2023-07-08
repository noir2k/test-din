import lgLogo from '@assets/images/logo/main_lg_logo.png';

const Notice = () => {
  return (
    <div className="notice-wrapper">
      <div className="notice-inner">
        <img width="480" height="100" alt="icon" src={lgLogo} />
        <p className="text-2xl leading-8">
          <b>※ 검사 실시 전 주의 사항</b>
        </p>
        <br />
        <p className="text-xl leading-10">
          ▶ 메신저 알림 소리를 발생시키는 서비스를 종료해주세요.
        </p>
        <p className="text-xl leading-10">
          ▶ 기기(노트북, 컴퓨터) 사운드 볼륨을 확인해주세요.
        </p>
      </div>
    </div>
  );
};

export default Notice;
