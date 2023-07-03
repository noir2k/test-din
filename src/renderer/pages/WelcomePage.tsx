import { Link } from 'react-router-dom';
import smLogo from '@assets/images/logo/main_sm_logo.png';
import lgLogo from '@assets/images/logo/main_lg_logo.png';
import { useState } from 'react';

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

export default function Welcome() {
  // licenseStatus === 1 → 라이센스 확인 완료
  const [licenseStatus, setLicenseStatus] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img width="192" alt="icon" src={smLogo} />
      <img width="640" height="100" alt="icon" src={lgLogo} />
      <h2 className="my-10 text-4xl font-semibold">&nbsp;</h2>
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
