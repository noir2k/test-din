import { useAppDispatch } from '@hook/index';
import { setHistoryOpen } from '@store/slices/popupToggle';

import { ColumnType } from '@main/util';

const ExamineeCard = ({...props}) => {
  const item: ColumnType = props.item;
  const dispatch = useAppDispatch();

  return (
    <div
      className="examinee-card cursor-pointer flex items-center justify-center justify-between text-cyan-900 p-5 border-b border-slate-300"
      onClick={() => { dispatch(setHistoryOpen({chartItemData: props}));}}
    >
      <div className="examinee-name">
        {item.id.toString()}
      </div>
      <div className="examination-date">
        {item.test_date}
      </div>
      <div className="btn-delete">
        <button
          type="button"
          className="bg-transparent"
          onClick={() => {
            if (confirm('삭제하시겠습니까?')) {
              window.electron.ipcRenderer.sendMessage('delete-data', [item.id]);
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
