export const editText = (event) => {
  const textNode = event.target;
  const layer = event.target.parent;
  const stage = event.target.parent.parent;

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
  textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
  textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + "px";
  textarea.style.fontSize = textNode.fontSize() + "px";
  textarea.style.border = "none";
  textarea.style.padding = "0px";
  textarea.style.margin = "0px";
  textarea.style.overflow = "hidden";
  textarea.style.background = "none";
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

  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + 3 + "px";
  textarea.focus();

  function removeTextarea() {
    textarea.parentNode && textarea.parentNode.removeChild(textarea);
    window.removeEventListener("click", handleOutsideClick);
    textNode.show();
    layer.draw();
  }

  function setTextareaWidth(newWidth) {
    if (!newWidth) {
      newWidth = textNode.placeholder.length * textNode.fontSize();
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
    textarea.style.width = newWidth + "px";
  }

  textarea.addEventListener("keydown", function (e) {
    const key = e.key;

    if (key === "Enter" && !e.shiftKey) {
      textNode.text(textarea.value);
      removeTextarea();
    }
    if (key === "Escape" || key === "Esc") {
      removeTextarea();
    }
  });

  textarea.addEventListener("keydown", function (e) {
    let scale = textNode.getAbsoluteScale().x;
    setTextareaWidth(textNode.width() * scale);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + textNode.fontSize() + "px";
  });

  stage.addEventListener("click", function (e) {
    textNode.text(textarea.value);
    removeTextarea();
  });

  function handleOutsideClick(e) {
    if (e.target !== textarea) {
      textNode.text(textarea.value);
      removeTextarea();
    }
  }
};
