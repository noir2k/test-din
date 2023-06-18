import type { ConfigSchemaType } from '@interfaces';
import { useState, useEffect } from 'react';

import { useAppDispatch } from '@hook/index';
import { setNoticeOpen } from '@store/slices/popupToggle';

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
    <div className="flex flex-col justify-start h-full p-5 w-1/2">
      <h1 className="text-slate-950 text-center mb-10">설정</h1>

      <div className="text-center text-slate-950 mb-10">
        <p>
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

      <div className="flex justify-center text-slate-950 mt-5">
        <button
          type="button"
          className="w-36 h-14 bg-green-200 rounded-full mr-10"
          onClick={() => {
            dispatch(setNoticeOpen());
          }}
        >
          종료
        </button>
        <button
          type="button"
          className="w-36 h-14 bg-green-200 rounded-full"
          onClick={() => {
            _config.soundInterval = value;
            window.electron.store.set('config', _config);
            alert('설정이 저장되었습니다.');
          }}
        >
          설정완료
        </button>
      </div>
    </div>
  );
};

export default Setting;
