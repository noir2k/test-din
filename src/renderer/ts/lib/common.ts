import { ColumnType, TestForm } from '@interfaces';

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
}

export const DataRange = {
  "Normal": [-18, -5.28],
  "Mild": [-5.27, 0.27],
  "Moderate": [0.28, 0.68],
  "Moderate to Severe": [0.69, 12],
}

type OptionProps = { [key: string]: string };

export const FixedTypeOptions: OptionProps = {
  "NF": "Noise Fixed",
  "SF": "Signal Fixed",
}

export const DirectionOptions: OptionProps = {
  "L": "좌(L)",
  "R": "우(R)",
  "LR": "양방향(LR)",
  "LNRS": "좌 노이즈 우 스피치(LNRS)",
  "LSRN": "우 노이즈 좌 스피치(LSRN)"
}

export const ScoringOptions: OptionProps = {
  "digit": "Digit Scoring",
  "triplet": "Triplet Scoring"
}

export const SoundSetOptions: OptionProps = {
  "1": "List 1",
  "2": "List 2",
  "3": "List 3",
  "4": "List 4",
  "5": "List 5",
  "6": "List 6"
}

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
}

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
    memo: payload.memo,
    sound_set: payload.sound_set,
    test_date: payload.test_date,
    test_result: payload.test_result,
    reg_timestamp: new Date().getTime(),
  };
}

