import { useEffect, useRef } from "react";

export default ({ children, mouseMove, mouseUp, mouseDown }) => {
  const layout = useRef();

  useEffect(() => {
    const div = layout.current;
    const moveHandler = (event) => {
      if (mouseMove) mouseMove(event, div);
    };
    const upHandler = (event) => {
      if (mouseUp) mouseUp(event, div);
    };
    const downHandler = (event) => {
      if (mouseDown) mouseDown(event, div);
    };
    const layoutOutHandler = (event) => {
      if (event.target.className !== "divider") {
        // if (mouseUp) mouseUp(event, div);
      }
    };
    div.addEventListener("mousemove", moveHandler);
    div.addEventListener("mouseup", upHandler);
    div.addEventListener("mousedown", downHandler);
    div.addEventListener("mouseout", layoutOutHandler, true);
    return () => {
      div.removeEventListener("mousemove", moveHandler);
      div.removeEventListener("mouseup", upHandler);
      div.removeEventListener("mousedown", downHandler);
      div.removeEventListener("mouseout", layoutOutHandler);
    };
  }, []);

  return (
    <div className="layout" ref={layout}>
      {children}
    </div>
  );
};
