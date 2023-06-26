import { useAppDispatch } from '@hook/index';
import { setTestResultOpen } from '@store/slices/navigateProvicer';

import { ColumnType } from '@interfaces';

import ico_document from '@assets/images/icons/icon_document.png';

const ExamineeCard = ({ ...props }) => {
  const item: ColumnType = props.item;
  const dispatch = useAppDispatch();

  return (
    <div
      className="examinee-card"
      onClick={() => {
        dispatch(setTestResultOpen(item));
      }}
    >
      <img src={ico_document} alt="document icon" />
      <div className="examinee-card-data">
        <p>{item.fixed_type}{item.direction}({item.scoring}) </p>
        <p>{item.test_date}</p>
      </div>
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
