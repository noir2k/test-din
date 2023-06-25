const Notice = () => {
  return (
    <div className="notice-wrapper">
      <div className="notice-inner">
        <p className="notice-text">
          본 검사는 <span className="font-bold">아이해브 청력 테스트 (Korean Digit-In-Noise test)</span> 입니다. <br />
          검사 실시 전 메신저 알림 등<br />
          소리를 발생시키는 서비스를 종료해주세요. <br />
          검사 실시 전 기기 사운드 볼륨을 확인해주세요.
        </p>
      </div>
    </div>
  );
}

export default Notice;
