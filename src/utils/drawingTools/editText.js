export const editText = (references, handleChange, sizeParent, event) => {
  const textNode = event.target;
  const layer = references.layer;
  const stage = references.stage;

  textNode.hide();
  layer.draw();

  const textPosition = textNode.absolutePosition();
  const stageBox = stage.container().getBoundingClientRect();

  const areaPosition = {
    x: stageBox.left + textPosition.x,
    y: stageBox.top + textPosition.y,
  };

  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);

  textarea.value = textNode.text();
  textarea.style.position = "absolute";
  textarea.style.top = areaPosition.y + "px";
  textarea.style.left = areaPosition.x + "px";
  textarea.style.width = sizeParent.width + "px";
  textarea.style.height = sizeParent.height + "px";
  textarea.style.fontSize = textNode.fontSize() + "px";
  textarea.style.border = "none";
  textarea.style.padding = "5px";
  textarea.style.margin = "0px";
  textarea.style.overflow = "hidden";
  textarea.style.background = "#cfd8dc";
  textarea.style.outline = "none";
  textarea.style.resize = "none";
  textarea.style.lineHeight = textNode.lineHeight();
  textarea.style.fontFamily = textNode.fontFamily();
  textarea.style.transformOrigin = "left top";
  textarea.style.textAlign = textNode.align();
  textarea.style.color = textNode.fill();

  const rotation = textNode.rotation();
  let transform = "";
  if (rotation) {
    transform += "rotateZ(" + rotation + "deg)";
  }

  let px = 0;

  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  if (isFirefox) {
    px += 2 + Math.round(textNode.fontSize() / 20);
  }
  transform += "translateY(-" + px + "px)";

  textarea.style.transform = transform;

  textarea.style.height = sizeParent.height + "px";
  textarea.focus();

  function removeTextarea() {
    textarea.parentNode && textarea.parentNode.removeChild(textarea);
    window.removeEventListener("click", handleOutsideClick);
    textNode.show();
    layer.draw();
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      newWidth = textNode.placeholder
        ? textNode.placeholder.length * textNode.fontSize()
        : sizeParent.width;
    }
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    if (isSafari || isFirefox) {
      newWidth = Math.ceil(newWidth);
    }

    const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
    if (isEdge) {
      newWidth += 1;
    }
    textarea.style.width = sizeParent.width + "px";
  }

  textarea.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Enter" && !event.shiftKey) {
      handleChange(textarea.value);
      textNode.text(textarea.value);
      removeTextarea();
    }
    if (key === "Escape" || key === "Esc") {
      removeTextarea();
    }
  });

  textarea.addEventListener("keydown", function () {
    let scale = textNode.getAbsoluteScale().x;
    setTextareaWidth(textNode.width() * scale);
    textarea.style.height = sizeParent.height + "px";
  });

  function handleOutsideClick(event) {
    if (event.target !== textarea) {
      handleChange(textarea.value);
      textNode.text(textarea.value);
      removeTextarea();
    }
  }
};
