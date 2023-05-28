import RightSnb from '@components/snb/rightSnb';

export default function TestResult() {
  return (
    <>
      <h1 className="text-slate-950 text-center mb-11">테스트 결과</h1>
      <RightSnb />
      <div className="graph-wrapper flex justify-center items-center text-slate-950">
        <div className="flex justify-center items-center border border-black w-1/2 h-96">
          그래프 영역
        </div>
      </div>

      <div className="flex justify-between items-center text-slate-950 mt-10">
        <button type="button" className="w-48 h-14 bg-green-200 rounded-full">
          내 결과와 오버레이
        </button>
        <button type="button" className="w-48 h-14 bg-green-200 rounded-full">
          PDF로 저장
        </button>
        <button type="button" className="w-48 h-14 bg-green-200 rounded-full">
          저장 후 종료
        </button>
      </div>
    </>
  );
}
