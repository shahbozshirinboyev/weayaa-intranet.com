import React, { useState } from "react";

function AddLineSecond() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={handleOpenModal}>
        <i className="bi bi-plus"></i> New project
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
          
            <h2 className="text-lg font-semibold">Create New Project</h2>
            <p>Enter the details for your new project here.</p>
            <button onClick={handleCloseModal} className="mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLineSecond;





















