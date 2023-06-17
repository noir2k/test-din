import { useEffect, useState } from 'react';

import { useAppSelector } from '@hook/index';
import type { RootState } from '@store/index';

import { ColumnName } from '@interfaces';

import isEmpty from 'lodash.isempty';

import ico_refresh from '@assets/images/icons/icon_refresh.png';
import ico_check from '@assets/images/icons/icon_check.png';

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
      <h1 className="text-slate-950 text-center mb-10">
        피검사자 기본 정보를 입력해 주세요.
      </h1>

      <div className="input-wrapper text-slate-950">
        <ul className="flex flex-col">
          <li className="flex justify-between items-center mb-5">
            <label
              htmlFor={ColumnName.user_name}
              className="w-48">
              이름
            </label>
            <input
              type="text"
              disabled={isDisabled}
              id={ColumnName.user_name}
              defaultValue={userData?.user_name}
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.gender} className="w-48">
              성별
            </label>
            <select
              id={ColumnName.gender}
              disabled={isDisabled}
              className="w-full"
              defaultValue={userData?.gender}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
              <option value="U">선택안함</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.birth} className="w-48">
              생년월일
            </label>
            <input
              type="text"
              disabled={isDisabled}
              id={ColumnName.birth}
              defaultValue={userData?.birth}
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.patient} className="w-48">
              피검사자번호
            </label>
            <input
              type="text"
              disabled={isDisabled}
              id={ColumnName.patient}
              defaultValue={userData?.patient?.toString()}
              className="border-b border-gray-300 focus:border-blue-500 w-full"
            />
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.direction} className="w-48">
              제시방향
            </label>
            <select
              id={ColumnName.direction}
              defaultValue={"LR"}
              className="w-full"
            >
              <option value="L">좌</option>
              <option value="R">우</option>
              <option value="LR">양방향</option>
              <option value="LNRS">좌 노이즈 우 스피치</option>
              <option value="LSRN">우 노이즈 좌 스피치</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.volume_level} className="w-48">
              시작레벨
            </label>
            <select
              id={ColumnName.volume_level}
              defaultValue={"0"}
              className="w-full"
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
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.scoring} className="w-48">
              채점방식
            </label>
            <select
              id={ColumnName.scoring}
              defaultValue={"digit"}
              className="w-full"
            >
              <option value="digit">Digit Scoring</option>
              <option value="tripet">Tripet Scoring</option>
            </select>
          </li>
          <li className="flex justify-between items-center mb-5">
            <label htmlFor={ColumnName.sound_set} className="w-48">
              사운드세트
            </label>
            <select id={ColumnName.sound_set} className="w-full">
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
        </ul>
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
      </div>
    </>
  );
}

export default ExamineeInfoForm;
