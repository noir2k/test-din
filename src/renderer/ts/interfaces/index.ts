export interface ChartDataProps {
  date: string;
  value: number;
}

export interface UserInfo {
  user_name?: string;
  gender?: string;
  birthday?: string;
  patient_no?: string;
  sessionId?: string;
}

export interface ColumnType {
  id: number;
  user_name: string;
  gender: string;
  birthday: string;
  patient_no: string;
  tester_name: string;
  receiver: string;
  fixed_type: string;
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
  birthday?: string;
  patient_no?: string;
  tester_name?: string;
  receiver?: string;
  fixed_type?: string;
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
