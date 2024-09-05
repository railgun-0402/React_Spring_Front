import React from "react";
import "./style.css";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h4>この施設を削除します。 </h4>
        <h4>本当によろしいですか？</h4>
        <h4 className="text-center">(y/n)</h4>
        <div className="dialog-buttons mt-5">
          <button className="text-center" onClick={onConfirm}>
            はい
          </button>
          <button onClick={onClose}>いいえ</button>
        </div>
      </div>
    </div>
  );
};
