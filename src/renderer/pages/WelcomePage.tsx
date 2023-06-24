import { Link } from 'react-router-dom';
import sm_logo from '@assets/images/logo/main_sm_logo.png';
import lg_logo from '@assets/images/logo/main_lg_logo.png';
import { useState } from 'react';

export default function Welcome() {
  // licenseStatus === 1 → 라이센스 확인 완료
  const [licenseStatus, setLicenseStatus] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img width="192" alt="icon" src={sm_logo} />
      <img width="640" height="100" alt="icon" src={lg_logo} />
      <h2 className="my-10 text-4xl font-semibold">아이해브 청력 테스트 Pro</h2>
      <button
        type="button"
        className="start-btn rounded-full"
        onClick={() => {
          setLicenseStatus(1);
        }}
      >
        START
      </button>
      {licenseStatus === 1 && <Alert />}
    </div>
  );
}

// TODO: Alert.tsx로 분리 예정
function Alert() {
  return (
    <div className="alert-wrapper">
      <div className="alert-inner">
        <p className="alert-text">라이센스 확인 완료!</p>
        <Link to="/main-page" className="alert-btn">
          확인
        </Link>
      </div>
    </div>
  );
}
