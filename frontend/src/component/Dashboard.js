import React, { useState } from 'react';
import './modal.css'; // Import the CSS file

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(!isModalOpen); // Toggle the isModalOpen state
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => { console.log('Button clicked'); handleOpenModal('Modal Content Here'); }}>Open Modal</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;