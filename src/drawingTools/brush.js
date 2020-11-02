import Konva from "konva";

export const brush = (currentTool, tools, colorBrush, stage, layer) => {
  if (currentTool !== tools.brush) {
    stage.off("mousemove touchmove");
  } else {
    let isPaint = false;
    let lastLine;

    stage.on("mousedown touchstart", () => {
      isPaint = true;
      let pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: colorBrush,
        strokeWidth: 5,
        globalCompositeOperation: "source-over",
        points: [pos.x, pos.y],
      });
      layer.add(lastLine);
    });

    stage.on("mouseup touchend", () => {
      isPaint = false;
    });

    stage.on("mousemove touchmove", () => {
      if (!isPaint) return;
      const pos = stage.getPointerPosition();
      let newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      layer.batchDraw();
    });
  }
};
