import { useState } from 'react';
import { useAppDispatch } from '@hook/index';

import { setTestResultOpen } from '@store/slices/navigateProvicer';

import { setRemoveResult } from '@store/slices/testResultProvider';

import { TestForm } from '@interfaces';
import { confirmCustom } from '@lib/common';

import { TrashIcon } from '@heroicons/react/24/outline';

import NoteIcon from '@assets/images/icons/icon_note.svg';

interface PropType {
  index: number;
  item: TestForm;
  selected: boolean;
}

function ExamineeCard({ item, index, selected }: PropType) {
  const [isFocused, setFocus] = useState(false);

  const dispatch = useAppDispatch();

  const deleteItem = () => {
    confirmCustom({
      message: '삭제하시겠습니까?',
      callback: () => {
        dispatch(setRemoveResult(index));
      },
    });
  };

  return (
    <div
      className="examinee-card"
      onMouseEnter={() => {
        setFocus(true);
      }}
      onMouseLeave={() => {
        setFocus(false);
      }}
      onClick={() =>
        dispatch(
          setTestResultOpen({
            index,
            data: item,
          })
        )
      }
    >
      <div className="examinee-card-data">
        <NoteIcon
          className={selected || isFocused ? 'snb-icon-active' : 'snb-icon'}
        />
        <div className="examinee-card-data-info">
          <p>
            {/* {item.fixed_type} */}
            {item.direction}({item.receiver}){' '}
          </p>
          <p>{item.test_datetime}</p>
        </div>
      </div>
      <div className="delete-btn-wrapper">
        <div
          className="cursor-pointer snb-column-child-btn snb-delete-btn"
          onClick={deleteItem}
        >
          삭제
        </div>
        {/* <button
          type="button"
          className="delete-btn bg-transparent"
          onClick={deleteItem}
        >
          <TrashIcon className="h-4 w-4 text-white mr-1" />
          <span>삭제</span>
        </button> */}
      </div>
    </div>
  );
}

export default ExamineeCard;
