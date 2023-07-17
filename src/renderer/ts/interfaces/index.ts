export interface ChartDataProps {
  date: string;
  value: number;
}

export interface UserInfo {
  user_name?: string;
  gender?: string;
  birthday?: string;
  patient_no?: string;
  tester_name?: string;
  sessionId?: string;
}

export interface TestForm {
  id?: number;
  user_name: string;
  gender: string;
  birthday: string;
  patient_no: string;
  tester_name: string;
  sessionId: string;
  receiver: string;
  fixed_type: string;
  direction: string;
  volume_level: number;
  scoring: string;
  memo: string;
  sound_set: number;
  test_datetime: string;
  test_result: number;
  test_estimate: string;
  reg_timestamp?: string;
}

export type ConfigSchemaType = {
  soundInterval?: number;
};
