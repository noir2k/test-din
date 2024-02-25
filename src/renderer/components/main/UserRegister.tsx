/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hook/index';

import { RootState } from '@store/index';

import { useForm } from 'react-hook-form';
import isEmpty from 'lodash.isempty';

import type { FieldError } from 'react-hook-form';

import { setNoticeOpen } from '@store/slices/navigateProvider';
import { setUserInfo } from '@store/slices/userDataProvider';
import { setReplaceUserInfo } from '@store/slices/testResultProvider';

import { UserInfo } from '@interfaces';
import { ColumnName, alertCustom } from '@lib/common';

import UserInfoImage from '@assets/images/user_info_bottom.svg';

type ErrorMessageType = {
  [key: string]: FieldError;
};

const UserRegister = () => {
  const userData = useAppSelector((state: RootState) => state.userData);
  const navigate = useAppSelector((state: RootState) => state.navigate);

  const dispatch = useAppDispatch();

  const [registerStatus, setRegisterStatus] = useState('등록');

  const { register, handleSubmit, setValue, setFocus } = useForm();

  const handleAfterSubmit = (userInfo: UserInfo) => {
    dispatch(setUserInfo(userInfo));
    dispatch(setReplaceUserInfo(userInfo));
    dispatch(setNoticeOpen());
  };

  const onSubmit = (data: any) => {
    const userInfoData = data as UserInfo;
    alertCustom({
      title: `환자 정보 ${registerStatus}`,
      message: '환자 정보가 등록/수정 되었습니다.',
      callback: () => handleAfterSubmit(userInfoData),
    });
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
        title: '환자 정보 입력 오류',
        message: err[firstError].message,
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

  const handleReset = () => {
    if (isEmpty(userData)) {
      setValue(ColumnName.user_name, '');
      setValue(ColumnName.gender, 'M');
      setValue(ColumnName.birthday, '');
      setValue(ColumnName.patient_no, '');
      setValue(ColumnName.tester_name, '');
      setFocus(ColumnName.user_name);
    }
  };

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let DataFormat: any;
    let RegDateFmt: any;

    const RegNotNum = /[^0-9]/g;
    const onlyNum = value.replace(RegNotNum, '');

    if (onlyNum.length <= 6) {
      DataFormat = '$1-$2';
      RegDateFmt = /([0-9]{4})([0-9]+)/;
    } else if (onlyNum.length <= 8) {
      DataFormat = '$1-$2-$3';
      RegDateFmt = /([0-9]{4})([0-9]{2})([0-9]+)/;
    }

    const newDate = onlyNum.replace(RegDateFmt, DataFormat);

    setValue(ColumnName.birthday, newDate);
  };

  useEffect(() => {
    if (navigate.isRegister) {
      handleReset();
      setRegisterStatus('등록');
    } else {
      setRegisterStatus('수정');
    }
  }, [navigate.isRegister]);

  return (
    <div className="test-contents-wrapper">
      <div className="user-register-title">
        <p>환자 정보 {registerStatus}</p>
        <span>아래 항목을 입력해 주십시오</span>
      </div>
      <div className="info-input-wrapper user-reg-input">
        <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
          <ul className="info-input-inner">
            <li className="info-input-item">
              <label
                htmlFor={ColumnName.user_name}
                className="info-input-item-subject"
              >
                이름
              </label>
              <input
                type="text"
                id={ColumnName.user_name}
                defaultValue={userData.user_name}
                className="info-input-item-input"
                {...register(`${ColumnName.user_name}`, {
                  required: '이름 항목은 필수입니다.',
                })}
              />
            </li>
            <li className="info-input-item">
              <label
                htmlFor={ColumnName.gender}
                className="info-input-item-subject"
              >
                성별
              </label>
              <div className="select-box">
                <select
                  id={ColumnName.gender}
                  defaultValue={userData.gender}
                  className="info-input-item-input"
                  {...register(`${ColumnName.gender}`)}
                >
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                </select>
              </div>
            </li>
            <li className="info-input-item">
              <label
                htmlFor={ColumnName.birthday}
                className="info-input-item-subject"
              >
                생년월일
              </label>
              <input
                type="text"
                id={ColumnName.birthday}
                defaultValue={userData.birthday}
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
                onChange={handleChangeDate}
              />
            </li>
            <li className="info-input-item">
              <label
                htmlFor={ColumnName.patient_no}
                className="info-input-item-subject"
              >
                환자번호
              </label>
              <input
                type="text"
                id={ColumnName.patient_no}
                defaultValue={userData.patient_no?.toString()}
                {...register(`${ColumnName.patient_no}`, {
                  required: '환자번호 항목은 필수입니다.',
                })}
                className="info-input-item-input"
              />
            </li>
            <li className="info-input-item">
              <label
                htmlFor={ColumnName.tester_name}
                className="info-input-item-subject"
              >
                검사자명
              </label>
              <input
                type="text"
                id={ColumnName.tester_name}
                defaultValue={userData.tester_name?.toString()}
                {...register(`${ColumnName.tester_name}`, {
                  required: '검사자명 항목은 필수입니다.',
                })}
                className="info-input-item-input"
              />
            </li>
          </ul>
          <div className="info-input-btn">
            <button
              className="btn-template btn-small btn-gray rounded-full"
              type="submit"
              onClick={() => {
                dispatch(setNoticeOpen());
              }}
            >
              홈으로
            </button>
            <button
              className="btn-template btn-small rounded-full"
              type="submit"
            >
              확인
            </button>
          </div>
        </form>
        <UserInfoImage className="info-input-bottom" />
      </div>
    </div>
  );
};

export default UserRegister;
