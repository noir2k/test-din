import { ColumnType, TestForm } from '@interfaces';

import Swal from 'sweetalert2';

export const ColumnName = {
  id: 'id',
  user_name: 'user_name',
  gender: 'gender',
  birthday: 'birthday',
  patient_no: 'patient_no',
  tester_name: 'tester_name',
  receiver: 'receiver',
  fixed_type: 'fixed_type',
  direction: 'direction',
  volume_level: 'volume_level',
  scoring: 'scoring',
  memo: 'memo',
  sound_set: 'sound_set',
  test_date: 'test_date',
  test_result: 'test_result',
  reg_timestamp: 'reg_timestamp',
};

export const ColumnNameHeader = [
  { label: 'INDEX', key: ColumnName.id },
  { label: '환자명', key: ColumnName.user_name },
  { label: '성별', key: ColumnName.gender },
  { label: '생일', key: ColumnName.birthday },
  { label: '환자번호', key: ColumnName.patient_no },
  { label: '테스터명', key: ColumnName.tester_name },
  { label: '리시버', key: ColumnName.receiver },
  { label: '제시방법', key: ColumnName.fixed_type },
  { label: '제시방향', key: ColumnName.direction },
  { label: '시작레벨(db SNR)', key: ColumnName.volume_level },
  { label: '채점방식', key: ColumnName.scoring },
  { label: '노트', key: ColumnName.memo },
  { label: '검사목록', key: ColumnName.sound_set },
  { label: '시험날짜', key: ColumnName.test_date },
  { label: '시험결과(DIN-SRT/db SNR)', key: ColumnName.test_result },
  { label: 'timestamp', key: ColumnName.reg_timestamp },
];

type DataRangeType = { [key: string]: number[] };

export const DataRange: DataRangeType = {
  Normal: [-18, -5.28],
  Mild: [-5.27, 0.27],
  Moderate: [0.28, 0.68],
  'Moderate to Severe': [0.69, 12],
};

type OptionProps = { [key: string]: string };

export const ReceiverOptions: OptionProps = {
  Headphone: 'Headphone',
  Speaker: 'Speaker',
  Earphone: 'Earphone',
};

export const FixedTypeOptions: OptionProps = {
  NF: 'Noise Fixed',
  SF: 'Signal Fixed',
};

export const DirectionOptions: OptionProps = {
  L: '좌(L)',
  R: '우(R)',
  LR: '양방향(LR)',
  LNRS: '좌 노이즈 우 스피치(LNRS)',
  LSRN: '우 노이즈 좌 스피치(LSRN)',
};

export const ScoringOptions: OptionProps = {
  digit: 'Digit Scoring',
  triplet: 'Triplet Scoring',
};

export const SoundSetOptions: OptionProps = {
  '1': 'List 1',
  '2': 'List 2',
  '3': 'List 3',
  '4': 'List 4',
  '5': 'List 5',
  '6': 'List 6',
};

export const columnToForm = (payload: ColumnType) => {
  return {
    user_name: payload.user_name,
    gender: payload.gender,
    birthday: payload.birthday,
    patient_no: payload.patient_no,
    tester_name: payload.tester_name,
    receiver: payload.receiver,
    fixed_type: payload.fixed_type,
    direction: payload.direction,
    scoring: payload.scoring,
    memo: payload.memo,
    sound_set: payload.sound_set,
    test_date: payload.test_date,
    test_result: payload.test_result,
  };
};

export const formToColumn = (payload: TestForm, lastId: number) => {
  return {
    id: lastId + 1,
    user_name: payload.user_name,
    gender: payload.gender,
    birthday: payload.birthday,
    patient_no: payload.patient_no,
    tester_name: payload.tester_name,
    receiver: payload.receiver,
    fixed_type: payload.fixed_type,
    direction: payload.direction,
    scoring: payload.scoring,
    volume_level: payload.volume_level,
    memo: payload.memo,
    sound_set: payload.sound_set,
    test_date: payload.test_date,
    test_result: payload.test_result,
    reg_timestamp: new Date().getTime(),
  };
};

type AlertPropType = {
  message: string | undefined;
  title?: string | undefined;
  callback?: () => void;
};

export const alertCustom = (prop: AlertPropType) => {
  const message = prop.message ? prop.message.replace(/\n/g, '<br />') : '';
  Swal.fire({
    html: message,
    title: prop.title,
    width: '448px',
    confirmButtonText: '확인',
    customClass: {
      title: 'sweet_title_text',
      confirmButton: 'sweet_confirm_button',
    },
  }).then(() => {
    !!prop.callback && prop.callback();
  });
};

export const confirmCustom = (prop: AlertPropType) => {
  const message = prop.message ? prop.message.replace(/\n/g, '<br />') : '';
  Swal.fire({
    html: message,
    title: prop.title,
    width: '448px',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    customClass: {
      title: 'sweet_title_text',
      confirmButton: 'sweet_confirm_button',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      !!prop.callback && prop.callback();
    }
  });
};

export const findEst = (value: number | undefined) => {
  for (const e of Object.entries(DataRange)) {
    const key = e[0];
    const MIN = e[1][0];
    const MAX = e[1][1];
    if (!!value && MIN <= value && MAX >= value) {
      return key;
    }
  }
  return 'ERROR';
};
