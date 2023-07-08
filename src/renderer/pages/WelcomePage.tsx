import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';

import smLogo from '@assets/images/logo/main_sm_logo.png';
import lgLogo from '@assets/images/logo/main_lg_logo.png';

import packageInfo from '../../../package.json';

import {
  validateLicenseRequest,
  validateLicenseResponse,
} from '../../main/modules/license';

interface AlertPropType {
  licenseStatus: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert = ({ licenseStatus, setShowAlert }: AlertPropType) => {
  const handleAlertBtnClick = () => {
    setShowAlert(false);
  };

  const handleClearConf = () => {
    window.electron.store.clear();
    setShowAlert(false);
  };

  return (
    <div className="alert-wrapper">
      <div className="alert-inner">
        {licenseStatus ? (
          <>
            <p className="alert-text">라이센스 확인 완료!</p>
            {/* <Link to="/main-page" className="alert-btn">
              확인
            </Link> */}
            <button
              type="button"
              className="alert-btn"
              onClick={handleAlertBtnClick}
            >
              확인
            </button>
          </>
        ) : (
          <>
            <p className="alert-text">
              라이센스 확인 실패! <br /> 관리자(admin@mail.com)에게 문의하세요.
            </p>
            <div className="reset-register-user" onClick={handleClearConf}>
              사용자 등록 초기화
            </div>
            <button
              type="button"
              className="alert-btn"
              onClick={handleAlertBtnClick}
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default function Welcome() {
  const [showAlert, setShowAlert] = useState(false);
  const [showRegUser, setShowRegUser] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState(false);
  const [licenseStatMsg, setLicenseStatMsg] = useState('');
  const [licenseExpire, setLicenseExpire] = useState('####-##-##');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await window.electron.ipcRenderer.invoke('set:conf', [
      {
        user: data.register,
      },
    ]);
    window.location.reload();
  };

  useEffect(() => {
    window.electron.licenseKeys.send(validateLicenseRequest);
  }, []);

  useEffect(() => {
    window.electron.licenseKeys.onReceive(
      validateLicenseResponse,
      (data: any) => {
        console.log('License response:', data);
        setLicenseStatus(data.success);
        setLicenseStatMsg(data.message);
        if (data.expire === '' || data.expire === undefined) {
          setLicenseExpire('Full License');
        } else {
          setLicenseExpire(data.expire);
        }
      }
    );
    return () => window.electron.licenseKeys.clearRendererBindings();
  });

  const handleStart = async () => {
    // window.electron.licenseKeys.send(validateLicenseRequest);
    const user = await window.electron.ipcRenderer.invoke('get:conf', ['user']);
    console.log('config.user', user);

    if (user === undefined) {
      setShowRegUser(true);
    } else {
      setShowAlert(true);
    }
  };

  const handleSetConf = async () => {
    await window.electron.ipcRenderer.invoke('set:conf', [
      {
        user: 'noir2k@mail.com',
      },
    ]);
  };

  const handleGetConf = async () => {
    const user = await window.electron.ipcRenderer.invoke('get:conf', ['user']);
    console.log('config.user', user);
  };

  const handleClearConf = () => {
    window.electron.store.clear();
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    console.log('react-route');
    window.electron.ipcRenderer.sendMessage('react-route', ['WelcomePage']);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img width="192" alt="icon" src={smLogo} />
      <img width="640" height="100" alt="icon" src={lgLogo} />
      <h2 className="my-10 text-4xl font-semibold">&nbsp;</h2>
      <div className="license-version">
        <p>License status : {licenseStatMsg}</p>
        <p>Expire: {licenseExpire}</p>
        <p>App Version : {packageInfo.version}</p>
        <p>Copyright by iHab lab</p>
      </div>
      <button
        type="button"
        className="start-btn rounded-full"
        onClick={handleStart}
      >
        START
      </button>
      <div className="flex flex-column mt-2">
        <button
          type="button"
          className="start-btn rounded-full m-2"
          onClick={handleSetConf}
        >
          SET
        </button>
        <button
          type="button"
          className="start-btn rounded-full m-2"
          onClick={handleGetConf}
        >
          GET
        </button>
        <button
          type="button"
          className="start-btn rounded-full m-2"
          onClick={handleClearConf}
        >
          CLEAR
        </button>
        <button
          type="button"
          className="start-btn rounded-full m-2"
          onClick={handleReload}
        >
          RELOAD
        </button>
      </div>
      {showAlert && (
        <Alert licenseStatus={licenseStatus} setShowAlert={setShowAlert} />
      )}
      {showRegUser && (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="register-user-wrapper">
            <div className="edit-note-inner">
              <input
                className="register-user-input"
                placeholder="사용자 이메일을 등록해주세요 (ie. email)"
                {...register('register', {
                  required: '사용자 등록은 필수입니다.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: '이메일 형식이 아닙니다.',
                  },
                })}
              />
              {errors.register && (
                <p className="register-alert" role="alert">
                  {errors.register?.message?.toString()}
                </p>
              )}
            </div>
            <div className="register-user-confirm">
              <button type="submit" className="close-btn register-confirm-btn">
                저장
              </button>
              <button
                type="button"
                className="close-btn register-cancel-btn"
                onClick={() => setShowRegUser(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
