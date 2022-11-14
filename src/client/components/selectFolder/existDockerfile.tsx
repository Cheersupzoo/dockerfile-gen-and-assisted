import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useGlobalState } from "../../context/globalState";

export default function ExistDockerfile({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { recreateDockerfile, testDockerfile } = useGlobalState().selectFolder;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    It's seem that Dockerfile is already exist in your project
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-sm text-gray-500">
                      Do you wish to
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 ">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-l-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-900 outline-none hover:bg-orange-200"
                      onClick={recreateDockerfile}
                    >
                      Recreate Dockerfile
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-r-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 outline-none hover:bg-blue-200"
                      onClick={testDockerfile}
                    >
                      Test out your Dockerfile
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-400  px-4 py-2 text-sm font-medium text-gray-500  hover:bg-gray-200 "
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
