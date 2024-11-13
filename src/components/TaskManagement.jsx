import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { Board } from "../data/board";
import { onDragEnd } from "../helpers/onDragEnd";
import AddTaskModal from "../components/AddTaskModal";
import Avatar from "./Avatar";
import Days from "./Days";
import Line from "./Line";

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
      <Line />

      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {/* <div className="flex items-start px-4 bg-custom-green-10 rounded-[15px]  space-x-4 border border-red-700">  */}
        <div className="grid grid-cols-4 px-4 bg-custom-green-10 rounded-[15px] gap-4">
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className="flex flex-col gap-2" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="grid grid-col gap-3 items-center py-4 w-full" //w-[250px] md:w-[300px] lg:w-[320px] xl:w-[350px] 2xl:w-[400px]
                  >
                    <div className="flex justify-between p-2 py-[10px] w-full bg-white rounded-lg shadow-sm text-custom-green-dark  text-[15px] font-extrabold">
                      {column.name}
                      <div className="bg-custom-green-30 w-5 text-center  text-custom-green-dark rounded ">
                        3
                      </div>
                    </div>

                    {index === 0 && (
                      <div
                        onClick={() => openModal(columnId)}
                        //w-[250px] md:w-[300px] lg:w-[320px] xl:w-[350px] 2xl:w-[400px]
                        className="flex cursor-pointer items-center justify-center gap-1 py-[10px] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
                      >
                        <i className="bi bi-plus-circle-dotted"></i>
                        Add Task
                      </div>
                    )}

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
                              <Days />

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
                              <div className="w-full border border-dashed"></div>

                              <div className="w-full">
                                <Avatar />
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
