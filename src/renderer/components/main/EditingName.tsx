import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hook/index';
import { RootState } from '@store/index';
import { setNoticeOpen } from '@store/slices/popupToggle';

import ico_speaker_white from '@assets/images/icons/icon_speaker_white.png';
import ico_user_blue from '@assets/images/icons/icon_user_blue.png';

export default function EditingName() {
  const userData = useAppSelector((state: RootState) => state.userData);
  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState(userData.user_name);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.electron.ipcRenderer.sendMessage('update-user-name', [userName]);

    setShowSuccessPopup(true);
  };

  return (
    <>
      {showSuccessPopup ? (
        <SuccessPopup />
      ) : (
        <div className="editing-name-wrapper">
          <div className="editing-name-title">
            <img src={ico_speaker_white} alt="white speaker icon" />
            <p>수정할 환자의 이름을 입력해 주세요.</p>
          </div>
          <div className="editing-name-modal">
            <form onSubmit={handleSubmit}>
              <ul className="modal-item-wrapper">
                <li>
                  <img src={ico_user_blue} alt="blue user icon" />
                  <p className="modal-item-subject">환자 이름</p>
                  <input
                    type="text"
                    className="modal-item-data"
                    value={userName}
                    onChange={handleNameChange}
                  />
                </li>
              </ul>
              <ul className="modal-btn-wrapper">
                <li>
                  <button className="btn-apply" type="submit">
                    확인
                  </button>
                  <button
                    className="btn-cancle"
                    type="button"
                    onClick={() => {
                      dispatch(setNoticeOpen());
                    }}
                  >
                    취소
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function SuccessPopup() {
  const dispatch = useAppDispatch();

  return (
    <div className="editing-name-wrapper">
      <div className="editing-name-title">
        <img src={ico_speaker_white} alt="white speaker icon" />
        <p>본 검사는 XXX 청각 테스트 검사입니다.</p>
      </div>
      <div className="editing-name-modal">
        <ul className="modal-item-wrapper">
          <li>
            <p>저장되었습니다.</p>
          </li>
        </ul>
        <ul className="modal-btn-wrapper">
          <li className="modal-btn-inner">
            <button
              className="confirm-btn"
              type="button"
              onClick={() => {
                dispatch(setNoticeOpen());
              }}
            >
              확인
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
