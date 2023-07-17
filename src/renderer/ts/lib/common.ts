import { TestForm } from '@interfaces';

import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export const ColumnName = {
  id: 'id',
  user_name: 'user_name',
  gender: 'gender',
  birthday: 'birthday',
  patient_no: 'patient_no',
  tester_name: 'tester_name',
  sessionId: 'sessionId',
  receiver: 'receiver',
  fixed_type: 'fixed_type',
  direction: 'direction',
  volume_level: 'volume_level',
  scoring: 'scoring',
  memo: 'memo',
  sound_set: 'sound_set',
  test_datetime: 'test_datetime',
  test_result: 'test_result',
  test_estimate: 'test_estimate',
  reg_timestamp: 'reg_timestamp',
};

export const ColumnNameHeader = [
  { label: 'INDEX', key: ColumnName.id },
  { label: '시험일시', key: ColumnName.test_datetime },
  { label: '환자명', key: ColumnName.user_name },
  { label: '성별', key: ColumnName.gender },
  { label: '생일', key: ColumnName.birthday },
  { label: '환자번호', key: ColumnName.patient_no },
  { label: '테스터명', key: ColumnName.tester_name },
  { label: '테스트세션ID', key: ColumnName.sessionId },
  { label: '리시버', key: ColumnName.receiver },
  { label: '제시방법', key: ColumnName.fixed_type },
  { label: '제시방향', key: ColumnName.direction },
  { label: '시작레벨(db SNR)', key: ColumnName.volume_level },
  { label: '채점방식', key: ColumnName.scoring },
  { label: '노트', key: ColumnName.memo },
  { label: '검사목록', key: ColumnName.sound_set },
  { label: '시험결과(DIN-SRT/db SNR)', key: ColumnName.test_result },
  { label: 'Estimated Hearing Level', key: ColumnName.test_estimate },
  { label: 'timestamp', key: ColumnName.reg_timestamp },
];

type DataRangeType = { [key: string]: number[] };

export const DataRange: DataRangeType = {
  Normal: [-18, -5.92],
  Mild: [-5.91, -4.64],
  Moderate: [-4.63, -0.64],
  'Moderate to Severe': [-0.63, 0.69],
  'Severe 이상': [0.7, 12],
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

export const formToColumn = (payload: TestForm, lastId: number) => {
  return {
    id: lastId + 1,
    user_name: payload.user_name,
    gender: payload.gender,
    birthday: payload.birthday,
    patient_no: payload.patient_no,
    tester_name: payload.tester_name,
    sessionId: payload.sessionId,
    receiver: payload.receiver,
    fixed_type: payload.fixed_type,
    direction: payload.direction,
    scoring: payload.scoring,
    volume_level: payload.volume_level,
    memo: payload.memo,
    sound_set: payload.sound_set,
    test_datetime: payload.test_datetime,
    test_result: payload.test_result,
    test_estimate: payload.test_estimate,
    reg_timestamp: dayjs(payload.test_datetime).unix(),
  };
};

type AlertPropType = {
  message: string | undefined;
  title?: string | undefined;
  callback?: () => void;
  dissmiss?: () => void;
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

    if (result.isDismissed) {
      !!prop.dissmiss && prop.dissmiss();
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

export const findMargin = (key: string, value: number | undefined) => {
  const MAXL = 190;
  const range = DataRange[key];
  const length = range[1] - range[0];
  const rate = MAXL / length;
  if (value) {
    const v = Math.floor((value - range[0]) * rate - MAXL / 2);
    if (v === 0) {
      return '';
    }
    return { marginLeft: `${v}%` };
  }

  return '';
};
