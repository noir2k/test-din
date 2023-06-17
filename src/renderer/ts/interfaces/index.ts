export interface ChartDataProps {
  date: string
  value: number
}

export interface UserInfo {
	user_name?: string,
	gender?: string,
	birth?: string,
	patient?: Number
}

export const ColumnName = {
  id: 'id',
	user_name: 'user_name',
	gender: 'gender',
	birth: 'birth',
	patient: 'patient',
	direction: 'direction',
	volume_level: 'volume_level',
	scoring: 'scoring',
	memo: 'memo',
	sound_set: 'sound_set',
	test_date: 'test_date',
	test_result: 'test_result',
	reg_timestamp: 'reg_timestamp',
}
