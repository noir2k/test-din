import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Howl, Howler } from 'howler';

import { useAppDispatch } from '@hook/index';
import { setNoticeOpen } from '@store/slices/navigateProvider';
import { alertCustom } from '@lib/common';

import ihabCorpLogo from '@assets/images/logo/ihab_corp_logo.png';

import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/solid';

const ConfigPage = () => {
  const mp3 = 'static://sounds/CALIBRATION/cal-tone.mp3';
  const option = {
    volume: 0.5,
    src: [mp3],
    loop: true,
  };

  const howl = new Howl(option);

  const [play, setPlay] = useState(false);
  const [sliderVolume, setSliderVolume] = useState(50);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const saveConfig = async () => {
    await window.electron.ipcRenderer
      .invoke('set:conf', [
        {
          defaultVolume: sliderVolume,
        },
      ])
      .then(() => {
        dispatch(setNoticeOpen());
        alertCustom({
          title: '캘리브레이션 설정 완료',
          message: `설정이 저장되었습니다.`,
          callback: () => navigate('/main-page'),
        });
      });
  };

  const loadConfig = async () => {
    const defaultVolume = await window.electron.ipcRenderer.invoke('get:conf', [
      'defaultVolume',
    ]);
    if (defaultVolume && !Number.isNaN(defaultVolume)) {
      setSliderVolume(defaultVolume);
    }
  };

  const togglePlay = () => {
    setPlay(!play);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderVolume(newValue);
  };

  useEffect(() => {
    if (play) howl.play();
    else howl.stop();

    return () => {
      howl.stop();
    };
  }, [play]);

  useEffect(() => {
    const vol = sliderVolume / 100;
    Howler.volume(vol);
  }, [sliderVolume]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('react-route', ['ConfigPage']);
    loadConfig();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl font-black mb-16">
        아이해브 청력테스트 Pro 캘리브레이션 볼륨 설정
      </p>
      <div className="flex justify-center w-4/5  mb-16">
        <div className="w-1/2">
          <p className="text-xl font-black mb-6">권장사항</p>
          <p className="leading-8">
            ● 소프트웨어 사용 전 사운드 재생에 대한 적정한 기본 볼륨값을
            설정해주세요.
          </p>
          <p className="leading-8">
            ● 아이해브 청력테스트 Pro의 캘리브레이션은 80 dB SPL 이상으로
            설정하는 것을 권장합니다.
          </p>
          <p className="leading-8">
            ● 아이해브 청력테스트 Pro의 사운드 볼륨은 운영체제의 볼륨 설정에
            영향을 받습니다.
          </p>
          <br />
        </div>
        <div className="w-1/2">
          <p className="text-xl font-black mb-6">설정 방법</p>
          <p className="leading-8">
            ● PC와 외부의 청력검사기(AudioMeter)를 연결하여 사용하는 경우
          </p>
          1) 윈도우 볼륨은 80% 이상으로 설정 (권장 사항) <br />
          2) 보정음이 재생 중인 상태에서 청력검사기의 VU 미터가 0을 가리키도록
          외부입력 Gain을 조절, 필요시(청력검사기 Gain을 너무 많이 올리거나
          줄여야 하는 경우) 윈도우 볼륨도 함께 조절 <br />
          <br />
          <p className="leading-8">● PC만 사용하는 경우(사운드카드 포함)</p>
          1) Transducer에 맞는 커플러를 사운드레벨미터에 연결하고 보정을 실시{' '}
          <br />
          2) 윈도우 볼륨은 80% 이상으로 설정(권장 사항) <br />
          3) 보정음이 재생 중인 상태에서 청력검사기의 VU 미터가 0을 가리키도록
          윈도우 볼륨 조절, 또는 외장 사운드카드를 사용하는 경우 사운드카드의
          음량 조절 노브를 사용할 수 있음 <br />
          4) 목표 레벨은 80 dB SPL 이상으로 설계 권장
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="slider-bar calibration-config mb-4">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={sliderVolume}
            onChange={handleSliderChange}
          />
        </div>
        <div>
          <p className="text-3xl">{sliderVolume}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="btn-template calibration-play rounded-full"
            onClick={() => togglePlay()}
          >
            {play ? (
              <PauseCircleIcon className="h-10 w-10" />
            ) : (
              <PlayCircleIcon className="h-10 w-10" />
            )}
            <span>캘리브레이션 음원 재생</span>
          </button>

          <button
            type="button"
            className="btn-template rounded-full"
            onClick={() => saveConfig()}
          >
            저장 후 닫기
          </button>
        </div>
        <br />
      </div>

      <div className="flex justify-center bottom-logo">
        <img className="img-50" alt="ihabCorpLogo" src={ihabCorpLogo} />
      </div>
    </div>
  );
};

export default ConfigPage;
