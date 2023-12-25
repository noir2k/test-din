import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import isEmpty from 'lodash.isempty';

import ihabTextLogo from '@assets/images/logo/ihab_text_logo.png';
import kdinTextLogo from '@assets/images/logo/kdin_text_logo.png';
import ihabCorpLogo from '@assets/images/logo/ihab_corp_logo.png';

function Alert() {
  const navigate = useNavigate();

  const loadConfig = async () => {
    const config = await window.electron.ipcRenderer.invoke('get:config');
    if (!isEmpty(config) && !Number.isNaN(config.defaultVolume)) {
      navigate('/main-page');
    } else {
      navigate('/config-page');
    }
  };

  return (
    <div className="alert-dim">
      <div className="alert-wrapper">
        <div className="alert-inner">
          <p className="alert-text">라이센스 확인 완료!</p>
          <button
            type="button"
            className="alert-btn"
            onClick={() => loadConfig()}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Welcome() {
  // licenseStatus === 1 → 라이센스 확인 완료
  const [licenseStatus, setLicenseStatus] = useState(0);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('react-route', ['WelcomePage']);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex main-logo">
        <img className="img-50 mr-6" alt="ihabTextLogo" src={ihabTextLogo} />
        <img className="img-50" alt="kdinTextLogo" src={kdinTextLogo} />
      </div>
      <button
        type="button"
        className="btn-template-square rounded-full"
        onClick={() => {
          setLicenseStatus(1);
        }}
      >
        시작하기
      </button>
      <div className="flex justify-center bottom-logo">
        <img className="img-50" alt="ihabCorpLogo" src={ihabCorpLogo} />
      </div>
      {licenseStatus === 1 && <Alert />}
    </div>
  );
}
