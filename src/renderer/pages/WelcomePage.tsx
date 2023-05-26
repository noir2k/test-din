import { Link } from 'react-router-dom';
import logo from '@assets/welcome_logo.png';

export default function Welcome() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-slate-950">
      <img width="150" alt="icon" src={logo} />
      <h1>BrainCog_CM</h1>
      <img width="200" height="100" alt="icon" src={logo} />
      <h2 className="mb-5">i HAB 청력 테스트</h2>
      <Link to="/main-page">
        <button
          type="button"
          className="bg-lime-400 text-cyan-900"
          onClick={() => {
            alert('버튼 클릭 시 출력되는 메시지 박스입니다.');
          }}
        >
          시작
        </button>
      </Link>
    </div>
  );
}
