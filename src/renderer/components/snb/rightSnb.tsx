export default function RightSnb() {
  return (
    <div className="flex flex-col absolute end-0 text-slate-950 bg-white border-2 border-black box-border">
      <div className="bg-green-200 p-5 border-b-2 border-black">
        <p>검사현황</p>
      </div>
      <div className="p-5">
        <p>검사 사운드 세트: List 1</p>
        <p className="mt-5 mb-5">사운드 제시 방향: Noise Left + Speech Right</p>
        <p>채점 방식: Digit Scoring</p>
      </div>
    </div>
  );
}
