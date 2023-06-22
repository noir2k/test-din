import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import type { FieldError } from 'react-hook-form';

import { useAppSelector, useAppDispatch } from '@hook/index';
import type { RootState } from '@store/index';

import {
  ColumnName,
  ScoringOptions,
  SoundSetOptions,
  DirectionOptions
} from '@interfaces';

import {
  setTestForm,
  resetDefaultForm
} from '@store/slices/testFormProvider';

import {
  nextPage
} from '@store/slices/testProgressProvider';

import isEmpty from 'lodash.isempty';

import ico_refresh from '@assets/images/icons/icon_refresh_white.png';
import ico_check from '@assets/images/icons/icon_check_white.png';

type ErrorMessageType = {
  [key: string]: FieldError;
};

const ExamineeInfoForm = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [isDisabled, setDisable] = useState(false);

  const userData = useAppSelector((state: RootState) => state.userData);

  const dispatch = useAppDispatch();

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(resetDefaultForm());
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
   } = useForm();

  const onSubmit = (data: any) => {
    dispatch(setTestForm(data));
    dispatch(nextPage());
  }

  const onError = (error: any) => {
    console.log("isEmpty(error)", isEmpty(error));
    if (!isEmpty(error)) {
      const err = error as ErrorMessageType;
      for (const [key, value] of Object.entries(err)) {
        alert(value.message);
        return;
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(userData)) {
      setDisable(true);
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="info-form-title">
        <p>환자 기본 정보를 입력해 주세요.</p>
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
              id={ColumnName.user_name}
              disabled={isDisabled}
              defaultValue={userData?.user_name}
              className="info-input-item-input"
              {...register(
                `${ColumnName.user_name}`,
                { required: '이름 항목은 필수입니다.' }
              )}
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
              defaultValue={userData?.gender}
              className="info-input-item-input"
              {...register(`${ColumnName.gender}`)}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
              <option value="U">선택안함</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">03</p>
            <label
              htmlFor={ColumnName.birthday}
              className="info-input-item-subject"
            >
              생년월일
            </label>
            <input
              type="date"
              id={ColumnName.birthday}
              disabled={isDisabled}
              defaultValue={userData?.birthday}
              className="info-input-item-input"
              {...register(
                `${ColumnName.birthday}`,
                { required: '생년월일 항목은 필수입니다.' }
              )}
              onChange={(e) => {
                e.target.value = formatDate(e.target.value);
              }}
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">04</p>
            <label
              htmlFor={ColumnName.patient_no}
              className="info-input-item-subject"
            >
              환자번호
            </label>
            <input
              type="text"
              id={ColumnName.patient_no}
              disabled={isDisabled}
              defaultValue={userData?.patient_no?.toString()}
              {...register(
                `${ColumnName.patient_no}`,
                { required: '환자번호 항목은 필수입니다.' }
              )}
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
              {...register(`${ColumnName.direction}`)}
            >
              {
                Object.entries(DirectionOptions)
                  .map(([k, v]) => <option key={k} value={k}>{v}</option>)
              }
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
              {...register(`${ColumnName.volume_level}`)}
            >
              <option value="-18">-18</option>
              <option value="-16">-16</option>
              <option value="-14">-14</option>
              <option value="-12">-12</option>
              <option value="-10">-10</option>
              <option value="-8">-8</option>
              <option value="-6">-6</option>
              <option value="-4">-4</option>
              <option value="-2">-2</option>
              <option value="0">0</option>
              <option value="2">+2</option>
              <option value="4">+4</option>
              <option value="6">+6</option>
              <option value="8">+8</option>
              <option value="10">+10</option>
              <option value="12">+12</option>
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
              {...register(`${ColumnName.scoring}`)}
            >
              {
                Object.entries(ScoringOptions)
                  .map(([k, v]) => <option key={k} value={k}>{v}</option>)
              }
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">08</p>
            <label
              htmlFor={ColumnName.sound_set}
              className="info-input-item-subject"
            >
              검사목록
            </label>
            <select
              id={ColumnName.sound_set}
              className="info-input-item-input"
              defaultValue={'1'}
              {...register(`${ColumnName.sound_set}`)}
            >
              {
                Object.entries(SoundSetOptions)
                  .map(([k, v]) => <option key={k} value={k}>{v}</option>)
              }
            </select>
          </li>
        </ul>
      </div>

      <div className="info-memo-wraper">
        <label htmlFor={ColumnName.memo} className="hidden">
          참고사항
        </label>
        <textarea
          id={ColumnName.memo}
          className="info-memo-input"
          placeholder="참고사항을 입력해주세요."
          {...register(`${ColumnName.memo}`)}
        />
      </div>

      <div className="info-btn-wrapper">
        <button
          className="info-btn"
          type="reset"
          onClick={handleReset}
        >
          <img src={ico_refresh} alt="ico_refresh" />
        </button>
        <button
          className="info-btn"
          type="submit"
          disabled={isSubmitting}
        >
          <img src={ico_check} alt="ico_check" />
        </button>
      </div>
    </form>
  );
};

export default ExamineeInfoForm;
