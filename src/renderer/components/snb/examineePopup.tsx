import { useAppDispatch, useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';
import { setNoticeOpen } from '@store/slices/navigateProvicer';

import ico_close from '@assets/images/icons/icon_close.png';
import ico_speaker from '@assets/images/icons/icon_speaker.png';

const ExamineeInfoPopup = () => {
  const userData = useAppSelector((state: RootState) => state.userData);

  const dispatch = useAppDispatch();

  return (
    <div className="examinee-popup-wrapper">
      <div className="close-btn-wrapper">
        <button
          type="button"
          className="close-btn"
          onClick={() => dispatch(setNoticeOpen()) }
        >
          <img src={ico_close} alt="close icon" />
        </button>
      </div>

      <ul className="popup-contents">
        <li className="popup-title">
          <img src={ico_speaker} alt="speaker icon" />
          <span>환자 정보</span>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">01</p>
          <p className="popup-item-subject">이름</p>
          <p className="popup-item-data">{userData.user_name}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">02</p>
          <p className="popup-item-subject">성별</p>
          <p className="popup-item-data">{userData.gender}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">03</p>
          <p className="popup-item-subject">생년월일</p>
          <p className="popup-item-data">{userData.birthday}</p>
        </li>
        <li className="popup-item">
          <p className="popup-item-order-number">04</p>
          <p className="popup-item-subject">환자번호</p>
          <p className="popup-item-data">{userData.patient_no?.toString()}</p>
        </li>
      </ul>
    </div>
  );
};

export default ExamineeInfoPopup;
