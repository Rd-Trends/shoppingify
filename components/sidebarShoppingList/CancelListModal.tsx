import { Dialog, Transition } from "@headlessui/react";
import { Quicksand } from "@next/font/google";
import { Fragment, useState } from "react";
import { MdClose } from "react-icons/md";

import Button from "../Button";

interface props {
  isModalOpen: boolean;
  closeModal(): void;
  cancelShoppingList(): void;
}

const quickSand = Quicksand({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

export default function CancelShoopingListModal({
  isModalOpen,
  closeModal,
  cancelShoppingList,
}: props) {
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`${quickSand.className} relative z-10`}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-10" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md relative transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="outline-none border-none bg-transparent text-[#828282] absolute top-2 right-6"
                  onClick={closeModal}
                >
                  <MdClose size={20} />
                </button>
                <Dialog.Title
                  as="h3"
                  className="text-lg md:text-xl font-medium text-gray-900 w-11/12 max-w-xs"
                >
                  Are you sure that you want to cancel this list?
                </Dialog.Title>

                <div className="mt-4 flex items-center justify-end space-x-4">
                  <button
                    className=" font-medium hover:font-bold"
                    onClick={closeModal}
                  >
                    cancel
                  </button>
                  <Button
                    className="rounded-xl"
                    color="danger"
                    onClick={() => {
                      cancelShoppingList();
                      closeModal();
                    }}
                  >
                    yes
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
