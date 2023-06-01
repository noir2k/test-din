import { ColumnType } from '@main/util';

type DataProps = {
  props : ColumnType
}

const ExamineeCard = ({props}: DataProps) => {
  const { id,	direction, scoring, memo, sound_set, test_date, test_result, reg_timestamp } = props;

  return (
    <div className="examinee-card flex items-center justify-center justify-between text-cyan-900 p-5 border-b border-slate-300">
      <div className="examinee-name">
        {id.toString()}
      </div>
      <div className="examination-date">
        {test_date}
      </div>
      <div className="btn-delete">
        <button
          type="button"
          className="bg-transparent"
          onClick={() => {
            alert('버튼 클릭 시 출력되는 메시지 박스입니다.');
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ExamineeCard;
