export interface ChartDataProps {
  date: string
  value: number
}

export interface UserInfo {
	user_name?: string,
	gender?: string,
	birthday?: string,
	patient_no?: Number
}

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
