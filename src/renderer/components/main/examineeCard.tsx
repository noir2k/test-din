import { useAppDispatch } from '@hook/index';
import { setHistoryOpen } from '@store/slices/popupToggle';

import { ColumnType } from '@main/util';

import ico_document from '@assets/images/icons/icon_document.png';

const ExamineeCard = ({ ...props }) => {
  const item: ColumnType = props.item;
  const dispatch = useAppDispatch();

  return (
    <div
      className="examinee-card"
      onClick={() => {
        dispatch(setHistoryOpen({ chartItemData: props }));
      }}
    >
      <img src={ico_document} alt="document icon" />
      <div className="examinee-card-data">
        <p>{item.id.toString().padStart(2, '0')}</p>
        {/* <p>테스트 1</p> */}
        <p>{item.test_date}</p>
      </div>

      {/* <div className="examinee-name"></div>
      <div className="examination-date">{item.test_date}</div> */}
      <div className="delete-btn-wrapper">
        <button
          type="button"
          className="delete-btn bg-transparent"
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
};

export default ExamineeCard;
