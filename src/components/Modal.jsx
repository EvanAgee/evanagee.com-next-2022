import React from "react";
import classNames from "classnames";
import { css } from "@emotion/css";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBreakpoints from "@/hooks/useBreakpoints";

function Modal({ isOpen, setIsOpen, children, title }) {
  const { mediaQueries } = useBreakpoints();
  let completeButtonRef = React.useRef(null);

  return (
    <Transition
      enter="transition duration-300 ease-out"
      enterFrom="transform scale-90 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-300 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-90 opacity-0"
      show={isOpen}
    >
      <Dialog
        initialFocus={completeButtonRef}
        onClose={() => setIsOpen(false)}
        className="fixed transition transition-all z-10 inset-0 overflow-y-auto backdrop-filter backdrop-blur-md flex flex-col items-center justify-center w-full"
      >
        <Dialog.Overlay
          className="fixed inset-0 bg-gray-900 bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
        <Transition.Child
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-90 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-90 opacity-0"
          className="w-full"
        >
          <div className={classNames("relative z-20 max-w-screen-lg mx-auto")}>
            {title && <Dialog.Title>{title}</Dialog.Title>}

            {children}

            <button
              ref={completeButtonRef}
              className={classNames(
                "fixed focus:outline-none z-25 bottom-[2rem] right-[2rem] lg:bottom-auto lg:top-[2rem]"
              )}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon
                className="text-white"
                size="2x"
                icon={["fal", "times"]}
              />
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default React.memo(Modal);
