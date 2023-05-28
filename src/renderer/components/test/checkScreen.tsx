import RightSnb from '@components/snb/rightSnb';
import { useNumberInput } from '@hooks/index';

export default function CheckScreen() {
  const hooks = useNumberInput();

  return (
    <>
      <h1 className="text-slate-950 text-center mb-11">테스트 진행 중</h1>
      <RightSnb />
      <div className="text-center text-slate-950 mt-16">
        <p>
          {hooks.count}/{hooks.totalQuestions}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center text-slate-950 w-64 mx-auto mt-24">
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
        <button type="button" className="w-36 h-14 bg-green-200 rounded-full">
          중단하기
        </button>
      </div>
    </>
  );
}
