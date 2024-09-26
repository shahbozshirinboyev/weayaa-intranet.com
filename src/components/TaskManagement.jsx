import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { Board } from "../data/board";
import { onDragEnd } from "../helpers/onDragEnd";
import AddTaskModal from "../components/AddTaskModal";

function TaskManagement() {
  const [columns, setColumns] = useState(Board);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");

  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData) => {
    const newBoard = { ...columns };
    newBoard[selectedColumn].items.push(taskData);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className="w-full flex items-start justify-between px-5 bg-custom-green-10 rounded-[15px]">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="flex flex-col gap-2" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    <div
                      onClick={() => openModal(columnId)}
                      className="flex cursor-pointer items-center md:w-[290px] w-[250px] justify-center gap-1 py-[10px] opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                    >
                      <i className="bi bi-plus-circle-dotted"></i>
                      Add Task
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          // Task START
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full cursor-grab bg-[#fff] flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
                            >
                              {task.image && task.alt && (
                                <img
                                  src={task.image}
                                  alt={task.alt}
                                  className="w-full h-[170px] rounded-lg"
                                />
                              )}
                              <div className="flex items-center gap-2">
                                {task.tags.map((tag) => (
                                  <span
                                    key={tag.title}
                                    className="px-[10px] py-[2px] text-[13px] font-semibold rounded-md"
                                    style={{
                                      backgroundColor: tag.bg,
                                      color: tag.text,
                                    }}
                                  >
                                    {tag.title}
                                  </span>
                                ))}
                              </div>
                              <div className="w-full flex items-start flex-col gap-0">
                                <span className="text-[15.5px] font-medium text-[#555]">
                                  {task.title}
                                </span>
                                <span className="text-[13.5px] text-gray-500">
                                  {task.description}
                                </span>
                              </div>
                              <div className="w-full border border-dashed"></div>
                              <div className="w-full flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <i className="bi bi-clock"></i>
                                  <span className="text-[13px] text-gray-700">
                                    {task.deadline} mins
                                  </span>
                                </div>
                                <div
                                  className={`w-[60px] rounded-full h-[5px] ${
                                    task.priority === "high"
                                      ? "bg-red-500"
                                      : task.priority === "medium"
                                      ? "bg-orange-500"
                                      : "bg-blue-500"
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </>
                          // Task END
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddTaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
}

export default TaskManagement;
