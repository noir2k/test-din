import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hook/index';

import { RootState } from '@store/index';

import { useForm } from "react-hook-form";
import isEmpty from 'lodash.isempty';

import type { FieldError } from 'react-hook-form';

import {
  setNoticeOpen,
} from '@store/slices/navigateProvicer';

import {
  setUserInfo,
} from '@store/slices/userDataProvider';

import {
  setReplaceUserInfo,
} from '@store/slices/testResultProvider';

import { UserInfo } from '@interfaces';
import { ColumnName, alertCustom } from '@lib/common';

import { IdentificationIcon } from '@heroicons/react/24/solid';

type ErrorMessageType = {
  [key: string]: FieldError;
};

const UserRegister = () => {
  const userData = useAppSelector((state: RootState) => state.userData);
  const navigate = useAppSelector((state: RootState) => state.navigate);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
  } = useForm();

  const handleAfterSubmit = (userData: UserInfo) => {
    dispatch(setUserInfo(userData));
    dispatch(setReplaceUserInfo(userData));
    dispatch(setNoticeOpen());
  }

  const onSubmit = (data: any) => {
    const userData = data as UserInfo;
    alertCustom({
      title: '환자 정보 등록/수정',
      message: '환자 정보가 등록/수정 되었습니다.',
      callback: () => handleAfterSubmit(userData)
    });
  }

  const onError = (error: any) => {
    const err = error as ErrorMessageType;
    const firstError = (
      Object.keys(err) as Array<keyof typeof err>
    ).reduce<keyof typeof err | null>((field, a) => {
      const fieldKey = field as keyof typeof err;
      return !!err[fieldKey] ? fieldKey : a;
    }, null);

    if (firstError) {
      const error = err[firstError];
      alertCustom({
        title: '환자 정보 입력 오류',
        message: error.message,
      });
      setFocus(firstError.toString());
    }
  }

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
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day === 31) {
      return false;
    }
    if (month === 2) {
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (day > 29 || (day === 29 && !isLeapYear)) {
        return false;
      }
    }
    return true;
  }

  const handleReset = () => {
    if (isEmpty(userData)) {
      setValue(ColumnName.user_name, '');
      setValue(ColumnName.gender, 'M');
      setValue(ColumnName.birthday, '');
      setValue(ColumnName.patient_no, '');
      setFocus(ColumnName.user_name);
    }
  }

  useEffect(() => {
    if (navigate.isRegister)  {
      handleReset();
    }
  }, [navigate.isRegister]);

  return (
    <>
      <div className="test-contents-wrapper">
        <form className="w-500" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="user-register-title">
          <IdentificationIcon className='h-8 w-8 text-white' />&nbsp;&nbsp;&nbsp;
          <p>환자 정보 등록 / 수정</p>
          <br/>
        </div>
        <div className="info-input-wrapper user-reg-input">
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
                defaultValue={userData?.user_name}
                className="info-input-item-input"
                autoFocus={true}
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
                defaultValue={userData?.birthday}
                className="info-input-item-input"
                maxLength={10}
                minLength={10}
                {...register(
                  `${ColumnName.birthday}`,
                  {
                    required: '생년월일 항목은 필수입니다.',
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: 'YYYY-MM-DD 형식으로 입력해 주세요.',
                    },
                    validate: (fieldValue: string) => validateDate(fieldValue) || '올바른 날짜 입력 범위가 아닙니다.',
                  }
                )}
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
                defaultValue={userData?.patient_no?.toString()}
                {...register(
                  `${ColumnName.patient_no}`,
                  { required: '환자번호 항목은 필수입니다.' }
                )}
                className="info-input-item-input"
              />
            </li>
          </ul>
          <ul className="modal-btn-wrapper">
            <li>
              <button className="btn-apply" type="submit">
                확인
              </button>
              <button
                className="btn-cancel"
                type="button"
                onClick={() => {
                  dispatch(setNoticeOpen());
                }}
              >
                닫기
              </button>
            </li>
          </ul>
        </div>
        </form>
      </div>
    </>
  );
}

export default UserRegister;
