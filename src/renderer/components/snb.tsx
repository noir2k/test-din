export default function SNB() {
  return (
    <div
      id="snb"
      className="snb flex flex-col h-full border-r-2 border-black box-border"
    >
      <ul className="snb-list flex">
        <li className="flex items-center">
          <a href="#!" className="text-examinee p-3">
            피검사자
          </a>
        </li>
        <li className="flex items-center ml-auto">
          <a href="#!" className="text-backup p-3">
            백업하기
          </a>
        </li>
        <li className="flex items-center">
          <a href="#!" className="text-import p-3">
            가져오기
          </a>
        </li>
      </ul>
      <div className="btn-wrapper flex items-center justify-center h-full relative">
        <button
          type="button"
          className="bg-lime-400 text-cyan-900 w-2/3 absolute bottom-60"
          onClick={() => {
            alert('버튼 클릭 시 출력되는 메시지 박스입니다.');
          }}
        >
          검사하기
        </button>
      </div>
    </div>
  );
}
