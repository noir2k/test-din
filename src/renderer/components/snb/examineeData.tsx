import { useState } from 'react';

export default function ExamineeData() {
  return (
    <div className="examinee-data-wrapper">
      <div className="data-text text-cyan-900 p-5">
        <p className="text-left">피검사자명</p>
      </div>
      <ExamineeCard />
      <ExamineeCard />
      <ExamineeCard />
      <ExamineeCard />
    </div>
  );
}

function ExamineeCard() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {isPopupOpen && <ExamineeInfoPopup onClose={() => setPopupOpen(false)} />}
      <ul
        className="examinee-card flex items-center justify-center justify-between text-cyan-900 p-5 border-b border-slate-300 cursor-pointer"
        onClick={() => {
          setPopupOpen(!isPopupOpen);
        }}
      >
        <li className="examinee-name">
          <p>TEST</p>
        </li>
        <li className="examination-date">
          <p>2023-01-01 01:01</p>
        </li>
      </ul>
    </>
  );
}

function ExamineeInfoPopup({ onClose }) {
  return (
    <div className="fixed inset-24 flex items-center justify-center text-cyan-900 z-50 w-full">
      <div className="shadow-lg">
        <div className="close-btn-wrapper bg-cyan-500 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="pop-contents bg-white h-full p-10">
          <h2 className="text-2xl font-bold mb-4">피검사자 정보</h2>
          <p className="mb-4">이름: John Doe</p>
          <p className="mb-4">성별: 남</p>
          <p className="mb-4">생년월일: 2000-01-01</p>
          <p className="mb-4">환자번호: 123-45-678</p>
        </div>
      </div>
    </div>
  );
}
