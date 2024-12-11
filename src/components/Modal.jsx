import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const Modal = forwardRef(function Modal({children, buttonCaption, onReset}, ref) {

    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        }
    }))

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" onClose={onReset}>
            {children}
            <form method="dialog" onSubmit={onReset}>
                <button>{buttonCaption}</button>
            </form>
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Modal;