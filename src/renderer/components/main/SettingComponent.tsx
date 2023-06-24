import type { ConfigSchemaType } from '@interfaces';
import { useState, useEffect } from 'react';

import { useAppDispatch } from '@hook/index';
import { setNoticeOpen } from '@store/slices/popupToggle';

import ico_speaker from '@assets/images/icons/icon_speaker.png';

const _config = {} as ConfigSchemaType;

const Setting = () => {
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  useEffect(() => {
    const conf = window.electron.store.get('config');

    if (conf && conf.soundInterval) {
      setValue(conf.soundInterval);
    }
  }, []);

  // TODO: will be removed
  // save config onChanged
  // useEffect(() => {
  //   _config.soundInterval = value;
  //   window.electron.store.set('config', _config);
  // }, [value]);

  return (
    <div className="sound-setting-wrapper">
      <div className="sound-setting-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p className="text-3xl font-bold">설정</p>
      </div>

      <div className="sound-setting-text">
        <p className="text-xl">
          각 문제 사운드간 간격을 지정해 주세요. <br />
          0초에서 5초까지 지정 가능합니다.
        </p>
      </div>

      <div className="input-wrapper text-slate-950 mb-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full">
            <span className="w-12">0초</span>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={value}
              onChange={handleSliderChange}
            />
            <span className="ml-6 w-12">5초</span>
          </div>
          <span className="text-slate-950">{value}초</span>
        </div>
      </div>

      <div className="sound-setting-btn-wrapper">
        {/* <button
          className="exit-btn"
          type="button"
          onClick={() => {
            dispatch(setNoticeOpen());
          }}
        >
          종료
        </button> */}
        <button
          className="test-complete-btn"
          type="button"
          onClick={() => {
            _config.soundInterval = value;
            window.electron.store.set('config', _config);
            alert('설정이 저장되었습니다.');
            dispatch(setNoticeOpen());
          }}
        >
          설정완료
        </button>
      </div>
    </div>
  );
};

export default Setting;
