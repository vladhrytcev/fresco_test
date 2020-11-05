import React, { useRef, useEffect } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import { toolsList } from "../../constants/toolsList";
import { layouts } from "../../constants/layouts";
import { editText } from "../../utils";

const Rectangle = ({
  stageRef,
  onChange,
  customGridLayerRef,
  selectActiveRectangle,
  changeTextInRectangle,
  shapeProps,
  setCurrentTool,
  tools,
}) => {
  const shapeRef = useRef();
  const transformerRef = useRef();
  const isSelected = tools.currentTool === toolsList.pointer;
  const isFinalSelected = isSelected && shapeProps.isSelectedRectangle;

  const references = {
    layer: customGridLayerRef.current,
    stage: stageRef.current,
  };

  const switchSelectedRectangle = (evt) => {
    evt.cancelBubble = true;
    if (!isSelected) return;
    selectActiveRectangle(evt.currentTarget.attrs.rectangleId);
  };

  const handleDragEnd = ({ target }) => {
    const rectX = Math.floor(target.x());
    const rectY = Math.floor(target.y());
    onChange({
      ...shapeProps,
      x: rectX,
      y: rectY,
    });
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    const rectX = Math.floor(node.x());
    const rectY = Math.floor(node.y());
    const rectWidth = Math.floor(node.width() * scaleX);
    const rectHeight = Math.floor(node.height() * scaleY);

    onChange({
      ...shapeProps,
      x: rectX,
      y: rectY,
      width: rectWidth,
      height: rectHeight,
    });
  };

  const handleChange = (id) => (text) =>
    changeTextInRectangle({ rectangleId: id, text });

  const handleDoubleClick = (references) => (event) => {
    setCurrentTool(toolsList.default);
    editText(
      references,
      handleChange(event.target.attrs.id),
      { width: shapeProps.width, height: shapeProps.height },
      event
    );
  };

  useEffect(() => {
    if (isFinalSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isFinalSelected]);

  return (
    <>
      <Group
        ref={shapeRef}
        {...shapeProps}
        draggable={isFinalSelected}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        onClick={switchSelectedRectangle}
      >
        <Rect
          id={shapeProps.rectangleId}
          width={shapeProps.width}
          height={shapeProps.height}
          stroke={shapeProps.stroke}
        />
        <Text
          id={shapeProps.rectangleId}
          text={shapeProps.text}
          width={shapeProps.width}
          height={shapeProps.height}
          fill={layouts.colorPlaceholder}
          padding={layouts.paddingPlaceholder}
          fontSize={layouts.fontSizePlaceholder}
          fontFamily={layouts.fontFamilyPlaceholder}
          onDblClick={handleDoubleClick(references)}
        />
      </Group>

      {isFinalSelected && <Transformer ref={transformerRef} />}
    </>
  );
};

export default Rectangle;
