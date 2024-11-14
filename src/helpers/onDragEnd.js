// eslint-disable-next-line @typescript-eslint/no-explicit-any
import toast from "react-hot-toast";
import http from "../services/http";
export const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;
  // result.draggableId o'zgarishni olgan task ID si

  const changeStatus = () => {
    // console.log(result.destination.droppableId);
    let status = "";
    if (result.destination.droppableId === "to_do") {
      status = "todo";
    } else if (result.destination.droppableId === "in_progress") {
      status = "in_progress";
    } else if (result.destination.droppableId === "review") {
      status = "verification";
    } else if (result.destination.droppableId === "complete") {
      status = "completed";
    }

    console.log(result.draggableId);
    console.log(status);
	console.log(result)

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    toast.promise(
      http.patch(
        `projects/tasks/${result.draggableId}/`,
        {
          status: status,
        },
        { headers }
      ),
      {
        loading: "Change status ...",
        success: (response) => {
          console.log(response);
          // return <b>Add :)</b>;
        },
        error: (error) => {
          console.log(error.response);

          // return <b>Error :(</b>;
        },
      }
    );
  };
  changeStatus();

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
