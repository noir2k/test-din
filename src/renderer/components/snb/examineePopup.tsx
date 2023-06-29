import { useAppDispatch, useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';
import { setNoticeOpen } from '@store/slices/navigateProvicer';

import { XMarkIcon } from '@heroicons/react/24/outline';

import iconSpeaker from '@assets/images/icons/icon_speaker.png';

const ExamineeInfoPopup = () => {
  const userData = useAppSelector((state: RootState) => state.userData);

  const dispatch = useAppDispatch();

  return (
    <div className="examinee-popup-wrapper">
      <div className="close-btn-wrapper">
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(setNoticeOpen())}
        >
          <XMarkIcon className="h-8 w-8 text-white" />
        </button>
      </div>

      <ul className="popup-contents">
        <li className="popup-title">
          <img src={iconSpeaker} alt="speaker icon" />
          <span>환자 정보</span>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">01</p>
          <p className="popup-item-subject font-bold">이름</p>
          <p className="popup-item-data">{userData.user_name}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">02</p>
          <p className="popup-item-subject font-bold">성별</p>
          <p className="popup-item-data">{userData.gender}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">03</p>
          <p className="popup-item-subject font-bold">생년월일</p>
          <p className="popup-item-data">{userData.birthday}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">04</p>
          <p className="popup-item-subject font-bold">환자번호</p>
          <p className="popup-item-data">{userData.patient_no?.toString()}</p>
        </li>
      </ul>
    </div>
  );
};

export default ExamineeInfoPopup;
