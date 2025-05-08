import React from 'react';

interface AlertProps {
    message: string;
    onClose?: () => void;
}

const alertStyle: React.CSSProperties = {
    position: 'fixed',
    top: 20,
    right: 20,
    backgroundColor: '#ff4d4f',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    minWidth: 300,
};

const closeButtonStyle: React.CSSProperties = {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: 20,
    cursor: 'pointer',   
};

const EquipmentErrorAlert: React.FC<AlertProps> = ({ message, onClose }) => (
    <div style={alertStyle}>
        <span>⚠️ {message}</span>
        {onClose && (
            <button style={closeButtonStyle} onClick={onClose} aria-label="Закрыть">
                ×
            </button>
        )}
    </div>
);

export default EquipmentErrorAlert;