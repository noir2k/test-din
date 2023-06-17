import { useEffect, useState } from 'react';

import { useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';

import { ColumnName } from '@interfaces';

import isEmpty from 'lodash.isempty';

import ico_refresh from '@assets/images/icons/icon_refresh_white.png';
import ico_check from '@assets/images/icons/icon_check_white.png';
import ico_speaker from '@assets/images/icons/icon_speaker.png';

const ExamineeInfoForm = () => {
  const [isDisabled, setDisable] = useState(false);

  const userData = useAppSelector((state: RootState) => state.userData);

  useEffect(() => {
    if (!isEmpty(userData)) {
      setDisable(true);
    }
  }, [userData]);

  return (
    <>
      <div className="info-form-title">
        <img src={ico_speaker} alt="speaker icon" />
        <p>피검사자 기본 정보를 입력해 주세요.</p>
      </div>

      <div className="info-input-wrapper">
        <ul className="info-input-inner">
          <li className="info-input-item">
            <p className="info-input-item-order-number">01</p>
            <label
              htmlFor={ColumnName.user_name}
              className="info-input-item-subject"
            >
              이름
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">02</p>
            <label
              htmlFor={ColumnName.gender}
              className="info-input-item-subject"
            >
              성별
            </label>
            <select
              id={ColumnName.gender}
              disabled={isDisabled}
              className="info-input-item-input"
              defaultValue={userData?.gender}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
              <option value="U">선택안함</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">03</p>
            <label
              htmlFor={ColumnName.birth}
              className="info-input-item-subject"
            >
              생년월일
            </label>
            <input
              type="text"
              disabled={isDisabled}
              id={ColumnName.birth}
              defaultValue={userData?.birth}
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">04</p>
            <label
              htmlFor={ColumnName.patient}
              className="info-input-item-subject"
            >
              피검사자번호
            </label>
            <input
              type="text"
              disabled={isDisabled}
              id={ColumnName.patient}
              defaultValue={userData?.patient?.toString()}
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">05</p>
            <label
              htmlFor={ColumnName.direction}
              className="info-input-item-subject"
            >
              제시방향
            </label>
            <select
              id={ColumnName.direction}
              defaultValue={'LR'}
              className="info-input-item-input"
            >
              <option value="L">좌</option>
              <option value="R">우</option>
              <option value="LR">양방향</option>
              <option value="LNRS">좌 노이즈 우 스피치</option>
              <option value="LSRN">우 노이즈 좌 스피치</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">06</p>
            <label
              htmlFor={ColumnName.volume_level}
              className="info-input-item-subject"
            >
              시작레벨
            </label>
            <select
              id={ColumnName.volume_level}
              defaultValue={'0'}
              className="info-input-item-input"
            >
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
          <li className="info-input-item">
            <p className="info-input-item-order-number">07</p>
            <label
              htmlFor={ColumnName.scoring}
              className="info-input-item-subject"
            >
              채점방식
            </label>
            <select
              id={ColumnName.scoring}
              defaultValue={'digit'}
              className="info-input-item-input"
            >
              <option value="digit">Digit Scoring</option>
              <option value="tripet">Tripet Scoring</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">08</p>
            <label
              htmlFor={ColumnName.sound_set}
              className="info-input-item-subject"
            >
              사운드세트
            </label>
            <select id={ColumnName.sound_set} className="info-input-item-input">
              <option value="List 1">List 1</option>
              <option value="List 2">List 2</option>
              <option value="List 3">List 3</option>
              <option value="List 4">List 4</option>
              <option value="List 5">List 5</option>
              <option value="List 6">List 6</option>
            </select>
          </li>
          <li className="flex flex-col flex-start mb-5">
            <label htmlFor={ColumnName.memo} className="w-48">
              참고사항
            </label>
            <textarea
              id={ColumnName.memo}
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

      <div className="info-memo-wraper">
        <input
          type="text"
          className="info-memo-input"
          placeholder="참고사항을 입력해주세요."
        />
      </div>

      <div className="info-btn-wrapper">
        <button className="info-btn" type="reset">
          <img src={ico_refresh} alt="ico_refresh" />
        </button>
        <button className="info-btn" type="button">
          <img src={ico_check} alt="ico_check" />
        </button>
      </div>
    </>
  );
};

export default ExamineeInfoForm;
