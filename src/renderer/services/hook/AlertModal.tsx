/**
 * TODO: REMOVE
 * yarn remove @headlessui/react
 * */

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { useAppSelector, useAppDispatch } from '@hook/index';
import { RootState } from '@store/index';

import { setShow, resetAlertModal } from '@store/slices/alertModalProvider';

const AlertModal = () => {
  const alertModal = useAppSelector((state: RootState) => state.alertModal);
  const dispatch = useAppDispatch();

  const onCLose = () => {
    dispatch(setShow(false));
  };

  const afterLeave = () => {
    const { callback } = alertModal;
    if (typeof callback === 'function') {
      callback();
    }
    dispatch(resetAlertModal());
  };

  return (
    <Transition
      appear
      show={alertModal.isShow}
      as={Fragment}
      afterLeave={afterLeave}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onCLose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="modal-dim fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="modal-position inline-block w-full max-w-md p-6 my-8 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {alertModal.title && alertModal.title !== '' && (
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {alertModal.title}
                </Dialog.Title>
              )}
              <div className="mt-2">
                <p
                  className="text-sm text-gray-500 border-t pt-2"
                  style={{ whiteSpace: 'pre' }}
                >
                  {alertModal.message}
                </p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                  onClick={onCLose}
                >
                  닫기
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AlertModal;
