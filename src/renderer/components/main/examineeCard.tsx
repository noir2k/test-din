import { useAppDispatch } from '@hook/index';

import { setTestResultOpen } from '@store/slices/navigateProvicer';

import {
  setRemoveResult,
} from '@store/slices/testResultProvider';

import { ColumnType } from '@interfaces';
import { columnToForm } from '@lib/common';

import {
  TrashIcon,
} from '@heroicons/react/24/outline';

import { confirmCustom } from '@lib/common';

import ico_document from '@assets/images/icons/icon_document.png';

const ExamineeCard = ({ ...props }) => {
  const item: ColumnType = props.item;
  const index = props.index;

  const dispatch = useAppDispatch();

  const deleteItem = () => {
    confirmCustom({
      message:'삭제하시겠습니까?',
      callback: () => {
        dispatch(setRemoveResult(index));
      }
    });
  }

  return (
    <div
      className="examinee-card"
      onClick={() => dispatch(setTestResultOpen({
        index: index,
        data: columnToForm(item)
      }))}
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
          onClick={deleteItem}
        >
          <TrashIcon className='h-4 w-4 text-white mr-1' />
          <span>삭제</span>
        </button>
      </div>
    </div>
  );
};

export default ExamineeCard;
