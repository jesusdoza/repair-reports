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
      className="hero-overlay h-[500px] absolute top-0 sticky"
      onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close z-20"
          onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
