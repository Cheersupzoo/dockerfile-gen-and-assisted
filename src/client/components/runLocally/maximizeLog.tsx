import React, { Fragment, useEffect, useRef, useState } from "react";
import { FiMaximize } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { useGlobalState } from "../../context/globalState";

export const MaximizeLog = () => {
  const logsRef = useRef<HTMLDivElement>();
  const {
    runLocally: { logs },
  } = useGlobalState();

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (!logsRef?.current) return;
    logsRef.current.scrollTo(0, logsRef.current.scrollHeight);
    return () => {
      return;
    };
  }, [logs]);

  return (
    <>
      <div className="absolute right-2 bottom-1  flex ">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 p-1 text-base font-medium text-white hover:bg-black/30"
        >
          <FiMaximize />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <div
                      className="mx-2 mt-1 h-56 overflow-y-scroll bg-gray-600 text-gray-100"
                        ref={logsRef}
                    >
                      {logs.map((log) => (
                        <div key={log}>{log}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
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
};
