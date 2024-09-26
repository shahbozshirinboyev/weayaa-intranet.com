import { v4 as uuidv4 } from "uuid";

import taskImage1 from "./images/task1.jpg";
import taskImage2 from "./images/task2.jpg";
import taskImage3 from "./images/task3.jpg";
import taskImage4 from "./images/task4.jpg";

export const Board = {
  to_do: {
    name: "To Do",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage1,
        alt: "task image",
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
    ],
  },
  in_progress: {
    name: "In Progress",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage2,
        alt: "task image",
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
    ],
  },
  review: {
    name: "Review",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage3,
        alt: "task image",
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
    ],
  },
  complete: {
    name: "Complete",
    items: [
      {
        id: uuidv4(),
        title: "Admin Panel Front-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "medium",
        deadline: 50,
        image: taskImage4,
        alt: "task image",
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
      {
        id: uuidv4(),
        title: "Admin Panel Back-end",
        description: "Lorem ipsum dolor sit amet ..",
        priority: "low",
        deadline: 50,
        tags: [
          { title: "Back", bg: "#ccffcc", text: "#008000" },
          { title: "Front", bg: "#fee2e2", text: "#dc2626" },
        ],
      },
    ],
  },
};
