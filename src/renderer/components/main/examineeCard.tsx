import { useAppDispatch } from '@hook/index';
import { setHistoryOpen } from '@store/slices/popupToggle';

import { ColumnType } from '@main/util';

type DataProps = {
  props : ColumnType
}

const ExamineeCard = ({props}: DataProps) => {
  const { id,	direction, scoring, memo, sound_set, test_date, test_result, reg_timestamp } = props;
  const dispatch = useAppDispatch();

  return (
    <div
    className="examinee-card cursor-pointer flex items-center justify-center justify-between text-cyan-900 p-5 border-b border-slate-300"
    onClick={() => { dispatch(setHistoryOpen()); }}
    >
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
            if (confirm('삭제하시겠습니까?')) {
              window.electron.ipcRenderer.sendMessage('delete-data', [id]);
            }
          }}
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default ExamineeCard;
