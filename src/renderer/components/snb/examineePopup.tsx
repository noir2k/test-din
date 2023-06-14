import { useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';

const ExamineeInfoPopup = ({
  onClose,
}: {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const userData = useAppSelector((state: RootState) => state.userData);

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
          <p className="mb-4">이름: {userData.name}</p>
          <p className="mb-4">성별: {userData.sex}</p>
          <p className="mb-4">생년월일: {userData.birth}</p>
          <p className="mb-4">환자번호: {userData.patient.toString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ExamineeInfoPopup;
