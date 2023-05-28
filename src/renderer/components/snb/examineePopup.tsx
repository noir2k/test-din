export default function ExamineeInfoPopup({
  onClose,
}: {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
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
