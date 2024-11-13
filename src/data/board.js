import { v4 as uuidv4 } from "uuid";

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
        image: "./images/task1.jpg",
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
        image: "./images/task2.jpg",
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
        image: "./images/task3.jpg",
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
        image: "./images/task4.jpg",
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
