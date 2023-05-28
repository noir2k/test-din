import { useNumberInput } from '@hooks/index';
import { useState } from 'react';

export default function PreCheckScreen() {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  const hooks = useNumberInput();

  return (
    <>
      <h1 className="text-slate-950 text-center -mt-5 mb-10">
        연습 검사를 실시합니다. <br />
        검사 전 아래 레버를 움직여 최적의 소리 강도를 찾아내세요.
      </h1>

      <div className="input-wrapper text-slate-950 mb-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full">
            <span className="mr-3">0dB</span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={value}
              onChange={handleSliderChange}
            />
            <span className="ml-3">100dB</span>
          </div>
          <span className="text-slate-950">{value}dB</span>
        </div>
      </div>

      <div className="text-center text-slate-950">
        <p>이제 3개의 연속된 숫자가 들리게 됩니다.</p>
        <p>숫자를 다 듣고 해당 숫자를 순서대로 말하세요.</p>
        <p>반드시 3개의 숫자가 다 제시된 후 말하세요.</p>
        <p>잘 듣지 못한 경우, 추측해서 숫자 3개를 모두 말해야 합니다.</p>
      </div>

      <div className="flex flex-col justify-center items-center text-center text-slate-950 w-64 mx-auto">
        <div className="flex mt-3 mb-5">
          {hooks.digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              readOnly
              className="w-1/3 text-center p-2 text-2xl border-b-2 border-black ml-3"
            />
          ))}
        </div>
        <div className="flex flex-wrap">{hooks.renderButtons()}</div>
      </div>

      <div className="flex justify-center items-center text-slate-950 mt-5">
        <button
          type="button"
          className="w-36 h-14 bg-green-200 rounded-full mr-10"
        >
          시작
        </button>
        <button type="button" className="w-36 h-14 bg-gray-300	 rounded-full">
          완료
        </button>
      </div>
    </>
  );
}
