"use strict";

const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 400;
const ctx = canvas.getContext("2d");

const range = document.querySelector("input");

const buttons = document.querySelector("div.control__button");
const modeButton = buttons.querySelector("button:first-child");
const saveButton = buttons.querySelector("button:last-child");
let mode = true;

const colors = document.querySelectorAll(".choose__color");

let painting = false;

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mousedown", startPainting);

  canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
  handleWidthChange();
  range.addEventListener("change", handleWidthChange);
}

if (buttons) {
  modeButton.addEventListener("click", handleModeClick);
  saveButton.addEventListener("click", handleSaveClick);
}

if (colors) {
  colors.forEach((e) => e.addEventListener("click", handleChooseColor));
}

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    // painting : on ==> draw line
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    //   painting : off ==> don't draw line
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function startPainting() {
  if (mode) {
    painting = true;
  } else {
    ctx.fillRect(0, 0, 800, 400);
  }
}

function stopPainting() {
  painting = false;
}

function handleWidthChange() {
  ctx.lineWidth = range.value;
}

function handleModeClick() {
  if (mode) {
    onPaint();
  } else {
    onFill();
  }
}

function onPaint() {
  mode = false;
  modeButton.innerText = "Paint";
}

function onFill() {
  mode = true;
  modeButton.innerText = "Fill";
}

function handleSaveClick() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "Your Picture";
  link.click();
}

function handleCM(event) {
  event.preventDefault();
  alert(`You can't use right button`);
}

function handleChooseColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
}
