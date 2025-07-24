import React from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div
        className="bg-white rounded-lg shadow-lg min-w-[320px] max-w-[90vw]"
        style={{ padding: "2.5rem 2rem 2rem 2rem", boxSizing: "border-box" }}
      >
        {title && <h2 className="text-xl font-bold mb-4 text-[#093A3E]">{title}</h2>}
        <p className="mb-6 text-gray-800">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              backgroundColor: "#e5e7eb",
              color: "#374151",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#d1d5db")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              backgroundColor: "#22c55e",
              color: "#fff",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#22c55e")}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
