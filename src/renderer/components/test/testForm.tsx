/* eslint-disable camelcase */
import ico_refresh from '../../../../assets/images/icons/icon_refresh.png';
import ico_check from '../../../../assets/images/icons/icon_check.png';
import ico_angle_left from '../../../../assets/images/icons/icon_angle_left.png';
import ico_angle_right from '../../../../assets/images/icons/icon_angle_right.png';
import { useState } from 'react';

export default function TestForm() {
  let [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="flex flex-col h-full p-5">
      <div className="progress-bar flex justify-center items-center mb-10">
        {[0, 1, 2, 3].map(function (a, i) {
          return (
            <div
              key={i}
              className={
                currentPage === i
                  ? 'w-4 h-4 rounded-full bg-gray-300 mr-3 active'
                  : 'w-4 h-4 rounded-full bg-gray-300 mr-3'
              }
            >
              <p className="hidden">진행 단계 표시</p>
            </div>
          );
        })}
      </div>

      <div className="progress-btn-wrapper flex justify-center items-center relative w-full">
        <button
          disabled={currentPage === 0 ? true : false}
          type="button"
          className="absolute left-0 w-1/6 disabled:opacity-10"
          onClick={() => {
            setCurrentPage(--currentPage);
          }}
        >
          <img
            src={ico_angle_left}
            alt="icon_angle_left"
            className="w-full h-full "
          />
        </button>
        <button
          disabled={currentPage === 3 ? true : false}
          type="button"
          className="absolute right-0 w-1/6 disabled:opacity-10"
          onClick={() => {
            setCurrentPage(++currentPage);
          }}
        >
          <img
            src={ico_angle_right}
            alt="icon_angle_left"
            className="w-full h-full"
          />
        </button>
      </div>
      {currentPage === 0 && <ExamineeInfoForm />}
      {currentPage === 1 && <PreCheckScreen />}
    </div>
  );
}

// 검사 시작 화면
function ExamineeInfoForm() {
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
              name="username"
              id="username"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">생년월일</p>
            <input
              type="text"
              name="username"
              id="username"
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <p className="w-48">피검사자번호</p>
            <input
              type="text"
              name="username"
              id="username"
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
            <label htmlFor="direction-select" className="w-48">
              시작레벨
            </label>
            <select id="direction-select" className="w-full">
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
            <label htmlFor="direction-select" className="w-48">
              채점방식
            </label>
            <select id="direction-select" className="w-full">
              <option value="Digit Scoring">Digit Scoring</option>
              <option value="Tripet Scoring">Tripet Scoring</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor="direction-select" className="w-48">
              사운드세트
            </label>
            <select id="direction-select" className="w-full">
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

// 사전검사 화면
function PreCheckScreen() {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  const [digits, setDigits] = useState(['', '', '']); // 입력된 숫자를 분리 저장하는 상태 변수
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 입력할 숫자의 인덱스

  const handleNumberClick = (number) => {
    if (currentIndex < 3) {
      const updatedDigits = [...digits];
      updatedDigits[currentIndex] = number;
      setDigits(updatedDigits);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleConfirmClick = () => {
    const enteredNumber = digits.join('');
    alert('입력한 숫자: ' + enteredNumber);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 9; i++) {
      buttons.push(
        <div key={i} className="w-1/3 p-1">
          <button
            className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
            onClick={() => handleNumberClick(i.toString())}
          >
            {i}
          </button>
        </div>
      );
    }
    // 간격 조절용 버튼
    buttons.push(
      <div key={-1} className="w-1/3">
        <button className="hidden" disabled>
          공백
        </button>
      </div>
    );
    // 간격 조절용 버튼 끝
    buttons.push(
      <div key={0} className="w-1/3">
        <button
          className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
          onClick={() => handleNumberClick('0')}
        >
          0
        </button>
      </div>
    );
    buttons.push(
      <div key="confirm" className="w-1/3">
        <button
          className="rounded-full bg-gray-300 w-16 h-16 text-2xl"
          onClick={handleConfirmClick}
        >
          &#10003;
        </button>
      </div>
    );
    return buttons;
  };

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
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              readOnly
              className="w-1/3 text-center p-2 text-2xl border-b-2 border-black ml-3"
            />
          ))}
        </div>
        <div className="flex flex-wrap">{renderButtons()}</div>
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
