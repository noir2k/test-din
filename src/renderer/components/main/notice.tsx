import ihabTextLogo from '@assets/images/logo/ihab_text_logo.png';
import kdinTextLogo from '@assets/images/logo/kdin_text_logo.png';
import ihabCorpLogo from '@assets/images/logo/ihab_corp_logo.png';

const Notice = () => {
  return (
    <div className="notice-wrapper">
      <div className="notice-inner">
        <div className="flex main-logo-notice">
          <img className="mb-6 img-33" alt="ihabTextLogo" src={ihabTextLogo} />
          <img className="img-50" alt="kdinTextLogo" src={kdinTextLogo} />
        </div>
        <p className="main-color text-2xl leading-8">
          <b>검사 실시 전 주의 사항</b>
        </p>
        <br />
        <p className="text-xl leading-10">
          메신저 알림 소리를 발생시키는 서비스를 종료해주세요.
        </p>
        <p className="text-xl leading-10">
          기기(노트북, 컴퓨터) 사운드 볼륨을 확인해주세요.
        </p>
        <div className="bottom-logo-notice">
          <img className="img-50" alt="ihabCorpLogo" src={ihabCorpLogo} />
        </div>
      </div>
    </div>
  );
};

export default Notice;
