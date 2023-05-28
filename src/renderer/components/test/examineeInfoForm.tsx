import ico_refresh from '@assets/images/icons/icon_refresh.png';
import ico_check from '@assets/images/icons/icon_check.png';

export default function ExamineeInfoForm() {
  return (
    <>
      <h1 className="text-slate-950 text-center mb-10">
        피검사자 기본 정보를 입력해 주세요.
      </h1>

      <div className="input-wrapper text-slate-950">
        <ul className="flex flex-col">
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">이름</p>
            <input
              type="text"
              name="username"
              id="username"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">성별</p>
            <input
              type="text"
              name="gender"
              id="gender"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">생년월일</p>
            <input
              type="text"
              name="birthDate"
              id="birthDate"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">피검사자번호</p>
            <input
              type="text"
              name="examineeId"
              id="examineeId"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor="direction-select" className="w-48">
              제시방향
            </label>
            <select id="direction-select" className="w-full">
              <option value="좌">좌</option>
              <option value="우">우</option>
              <option value="양방향">양방향</option>
              <option value="좌 노이즈 우 스피치">좌 노이즈 우 스피치</option>
              <option value="우 노이즈 좌 스피치">우 노이즈 좌 스피치</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor="start-level" className="w-48">
              시작레벨
            </label>
            <select id="start-level" className="w-full">
              <option value="-6">-6</option>
              <option value="-5">-5</option>
              <option value="-4">-4</option>
              <option value="-3">-3</option>
              <option value="-2">-2</option>
              <option value="-1">-1</option>
              <option value="0">0</option>
              <option value="+1">+1</option>
              <option value="+2">+2</option>
              <option value="+3">+3</option>
              <option value="+4">+4</option>
              <option value="+5">+5</option>
              <option value="+6">+6</option>
              <option value="+7">+7</option>
              <option value="+8">+8</option>
              <option value="+9">+9</option>
              <option value="+10">+10</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor="scoring-method" className="w-48">
              채점방식
            </label>
            <select id="scoring-method" className="w-full">
              <option value="Digit Scoring">Digit Scoring</option>
              <option value="Tripet Scoring">Tripet Scoring</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor="sound-set" className="w-48">
              사운드세트
            </label>
            <select id="sound-set" className="w-full">
              <option value="List 1">List 1</option>
              <option value="List 2">List 2</option>
              <option value="List 3">List 3</option>
              <option value="List 4">List 4</option>
              <option value="List 5">List 5</option>
              <option value="List 6">List 6</option>
            </select>
          </li>
          <li className="flex flex-col flex-start mb-5">
            <p className="w-48">참고사항</p>
            <textarea
              className="w-full h-32 border border-gray-300 shadow-md p-2 resize-none"
              placeholder="메모를 입력하세요."
            />
          </li>
          <div className="refresh-check-wrapper flex justify-between items-center">
            <a
              href="#!"
              className="flex justify-center items-center rounded-full bg-gray-300 w-20 h-20 mx-auto"
            >
              <img src={ico_refresh} alt="ico_refresh" className="w-1/2" />
            </a>
            <a
              href="#!"
              className="flex justify-center items-center rounded-full bg-gray-300 w-20 h-20 mx-auto"
            >
              <img src={ico_check} alt="ico_check" className="w-1/2" />
            </a>
          </div>
        </ul>
      </div>
    </>
  );
}
