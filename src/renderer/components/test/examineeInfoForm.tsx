import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { FieldError } from 'react-hook-form';
import isEmpty from 'lodash.isempty';

import { useAppSelector, useAppDispatch } from '@hook/index';
import type { RootState } from '@store/index';

import {
  ColumnName,
  ReceiverOptions,
  ScoringOptions,
  SoundSetOptions,
  FixedTypeOptions,
  DirectionOptions,
  alertCustom,
} from '@lib/common';

import { setSession } from '@store/slices/userDataProvider';

import { setTestForm, resetDefaultForm } from '@store/slices/testFormProvider';

import { nextPage } from '@store/slices/testProgressProvider';

type ErrorMessageType = {
  [key: string]: FieldError;
};

const ExamineeInfoForm = () => {
  const [isDisabled, setDisable] = useState(false);

  const userData = useAppSelector((state: RootState) => state.userData);
  const testForm = useAppSelector((state: RootState) => state.testForm);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    setFocus,
  } = useForm();

  const onSubmit = (data: any) => {
    if (userData.sessionId !== undefined) {
      console.log('NEW SESSION');
      dispatch(setSession());
    }
    dispatch(setTestForm(data));
    dispatch(nextPage());
  };

  const defaultValue = () => {
    setValue(ColumnName.tester_name, '');
    setValue(ColumnName.receiver, 'Headphone');
    setValue(ColumnName.fixed_type, 'NF');
    setValue(ColumnName.direction, 'LR');
    setValue(ColumnName.volume_level, 0);
    setValue(ColumnName.scoring, 'digit');
    setValue(ColumnName.sound_set, '1');
    setValue(ColumnName.memo, '');
    setFocus(ColumnName.tester_name);
  };

  const handleReset = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(resetDefaultForm());
    defaultValue();
    if (isEmpty(userData)) {
      setValue(ColumnName.user_name, '');
      setValue(ColumnName.gender, 'M');
      setValue(ColumnName.birthday, '');
      setValue(ColumnName.patient_no, '');
      setFocus(ColumnName.user_name);
    }
  };

  const onError = (error: any) => {
    const err = error as ErrorMessageType;
    const firstError = (Object.keys(err) as Array<keyof typeof err>).reduce<
      keyof typeof err | null
    >((field, a) => {
      const fieldKey = field as keyof typeof err;
      return err[fieldKey] ? fieldKey : a;
    }, null);

    if (firstError) {
      alertCustom({
        message: err[firstError].message,
        title: '환자 정보 입력 오류',
      });
      setFocus(firstError.toString());
    }
  };

  const validateDate = (date: string) => {
    const dateReg = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateReg.test(date)) {
      return false;
    }
    const dateArr = date.split('-');
    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]);
    const day = Number(dateArr[2]);
    if (month < 1 || month > 12) {
      return false;
    }
    if (day < 1 || day > 31) {
      return false;
    }
    if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day === 31
    ) {
      return false;
    }
    if (month === 2) {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (day > 29 || (day === 29 && !isLeapYear)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (!isEmpty(userData)) {
      setDisable(true);
    }
  }, [userData]);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="info-form-title">
        <p>청력테스트를 위한 기본 정보를 입력해 주세요.</p>
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
              {...register(`${ColumnName.user_name}`, {
                required: '이름 항목은 필수입니다.',
              })}
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
              type="text"
              id={ColumnName.birthday}
              disabled={isDisabled}
              defaultValue={userData?.birthday}
              className="info-input-item-input"
              maxLength={10}
              minLength={10}
              {...register(`${ColumnName.birthday}`, {
                required: '생년월일 항목은 필수입니다.',
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: 'YYYY-MM-DD 형식으로 입력해 주세요.',
                },
                validate: (fieldValue: string) =>
                  validateDate(fieldValue) ||
                  '올바른 날짜 입력 범위가 아닙니다.',
              })}
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
              {...register(`${ColumnName.patient_no}`, {
                required: '환자번호 항목은 필수입니다.',
              })}
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">05</p>
            <label
              htmlFor={ColumnName.tester_name}
              className="info-input-item-subject"
            >
              검사자명
            </label>
            <input
              type="text"
              id={ColumnName.tester_name}
              defaultValue={testForm?.tester_name}
              {...register(`${ColumnName.tester_name}`, {
                required: '검사자명 항목은 필수입니다.',
              })}
              className="info-input-item-input"
            />
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">06</p>
            <label
              htmlFor={ColumnName.receiver}
              className="info-input-item-subject"
            >
              리시버
            </label>
            <select
              id={ColumnName.receiver}
              defaultValue="Headphone"
              {...register(`${ColumnName.receiver}`)}
              className="info-input-item-input"
            >
              {Object.entries(ReceiverOptions).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">07</p>
            <label
              htmlFor={ColumnName.fixed_type}
              className="info-input-item-subject"
            >
              제시방식
            </label>
            <select
              id={ColumnName.fixed_type}
              defaultValue="NF"
              className="info-input-item-input"
              {...register(`${ColumnName.fixed_type}`)}
            >
              {Object.entries(FixedTypeOptions).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">08</p>
            <label
              htmlFor={ColumnName.direction}
              className="info-input-item-subject"
            >
              제시방향
            </label>
            <select
              id={ColumnName.direction}
              defaultValue="LR"
              className="info-input-item-input"
              {...register(`${ColumnName.direction}`)}
            >
              {Object.entries(DirectionOptions).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">09</p>
            <label
              htmlFor={ColumnName.volume_level}
              className="info-input-item-subject"
            >
              시작레벨
              <br />
              (db SNR)
            </label>
            <select
              id={ColumnName.volume_level}
              defaultValue="0"
              className="info-input-item-input"
              {...register(`${ColumnName.volume_level}`)}
            >
              <option value="-18">-18</option>
              <option value="-16">-16</option>
              <option value="-14">-14</option>
              <option value="-12">-12</option>
              <option value="-10">-10</option>
              <option value="-8">-8</option>
              <option value="-6">-6(정상 권장 레벨)</option>
              <option value="-4">-4(경도 권장 레벨)</option>
              <option value="-2">-2</option>
              <option value="0">0(중도, 중고도 권장 레벨)</option>
              <option value="2">+2(고도 이상 권장 레벨)</option>
              <option value="4">+4</option>
              <option value="6">+6</option>
              <option value="8">+8</option>
              <option value="10">+10</option>
              <option value="12">+12</option>
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">10</p>
            <label
              htmlFor={ColumnName.scoring}
              className="info-input-item-subject"
            >
              채점방식
            </label>
            <select
              id={ColumnName.scoring}
              defaultValue="digit"
              className="info-input-item-input"
              {...register(`${ColumnName.scoring}`)}
            >
              {Object.entries(ScoringOptions).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </li>
          <li className="info-input-item">
            <p className="info-input-item-order-number">11</p>
            <label
              htmlFor={ColumnName.sound_set}
              className="info-input-item-subject"
            >
              검사목록
            </label>
            <select
              id={ColumnName.sound_set}
              className="info-input-item-input"
              defaultValue="1"
              {...register(`${ColumnName.sound_set}`)}
            >
              {Object.entries(SoundSetOptions).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
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
        <button className="info-btn" type="button" onClick={handleReset}>
          입력초기화
        </button>
        <button className="info-btn" type="submit" disabled={isSubmitting}>
          저장
        </button>
      </div>
    </form>
  );
};

export default ExamineeInfoForm;
