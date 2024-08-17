import { ReactNode } from "react";
type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
};

export default function Modal({
  children = (
    <>
      <p>no moda content</p>
    </>
  ),
  isOpen = true,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="hero-overlay h-screen absolute top-0 z-50"
      onClick={onClose}>
      <div
        className="modal-content hero-overlay"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close "
          onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
