function ProjectsScrollBar() {
  return (
    <>
      {[0, 1, 2, 3, 4, 6, 7, 8, 9, 10].map((index) => (
        <button
          key={index}
          className="btn btn-sm border-0 rounded-md bg-custom-green-30 text-custom-green-dark font-medium hover:bg-custom-green-dark hover:text-white cursor-pointer"
        >
          <i className="bi bi-calendar2-week font-medium"></i>
          <span className="whitespace-nowrap">Project name {index}</span>
        </button>
      ))}
    </>
  );
}

export default ProjectsScrollBar;
