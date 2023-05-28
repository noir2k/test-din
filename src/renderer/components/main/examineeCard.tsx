export default function ExamineeCard() {
  return (
    <ul className="examinee-card flex items-center justify-center justify-between text-cyan-900 p-5 border-b border-slate-300">
      <li className="examinee-name">
        <p>TEST</p>
      </li>
      <li className="examination-date">
        <p>2023-01-01 01:01</p>
      </li>
      <li className="btn-delete">
        <button
          type="button"
          className="bg-transparent"
          onClick={() => {
            alert('버튼 클릭 시 출력되는 메시지 박스입니다.');
          }}
        >
          삭제
        </button>
      </li>
    </ul>
  );
}
