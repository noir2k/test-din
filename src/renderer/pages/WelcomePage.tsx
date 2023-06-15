import { Link } from 'react-router-dom';
import sm_logo from '@assets/images/logo/main_sm_logo.png';
import lg_logo from '@assets/images/logo/main_lg_logo.png';
import { useState } from 'react';

export default function Welcome() {
  // licenseStatus === 1 → 라이센스 확인 완료
  const [licenseStatus, setLicenseStatus] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img width="250" alt="icon" src={sm_logo} />
      <img width="738" height="100" alt="icon" src={lg_logo} />
      <h2 className="my-10 text-2xl font-semibold">i HAB 청력 테스트</h2>
      <button
        type="button"
        className="start-btn rounded-full"
        onClick={() => {
          setLicenseStatus(1);
        }}
      >
        START
      </button>
      {licenseStatus === 1 && <WelcomePopup />}
    </div>
  );
}

function WelcomePopup() {
  return (
    <div className="popup-wrapper">
      <div className="popup-inner">
        <p className="popup-text">라이센스 확인 완료!</p>
        <Link to="/main-page" className="popup-btn">
          확인
        </Link>
      </div>
    </div>
  );
}
