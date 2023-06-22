export interface ChartDataProps {
  date: string
  value: number
}

export interface UserInfo {
	user_name?: string,
	gender?: string,
	birthday?: string,
	patient_no?: number
}

export interface ColumnType {
  id: number;
  user_name: string;
  gender: string;
  birthday: string;
  patient_no: string;
  direction: string;
  volume_level: number;
  scoring: string;
  memo: string;
  sound_set: number;
  test_date: string;
  test_result: number;
  reg_timestamp: number;
}

export interface TestForm {
  user_name?: string;
  gender?: string;
  birthday?: Date;
  patient_no?: string;
  direction?: string;
  volume_level?: number;
  scoring?: string;
  memo?: string;
  sound_set?: number;
  test_date?: string;
  test_result?: number;
}

export type ConfigSchemaType = {
  soundInterval?: number;
};

export const ColumnName = {
  id: 'id',
	user_name: 'user_name',
	gender: 'gender',
	birthday: 'birthday',
	patient_no: 'patient_no',
	direction: 'direction',
	volume_level: 'volume_level',
	scoring: 'scoring',
	memo: 'memo',
	sound_set: 'sound_set',
	test_date: 'test_date',
	test_result: 'test_result',
	reg_timestamp: 'reg_timestamp',
}

type OptionProps = { [key: string]: string };

export const DirectionOptions: OptionProps = {
  "L": "좌",
  "R": "우",
  "LR": "양방향",
  "LNRS": "좌 노이즈 우 스피치",
  "LSRN": "우 노이즈 좌 스피치"
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
