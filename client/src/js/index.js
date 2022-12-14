import { initdb, postDb, deleteDb, editDb } from "./database";
import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "./header";
import "../css/style.css";
import Logo from "../images/logo.png";
import { Tooltip, Toast, Popover } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

window.addEventListener("load", function () {
  initdb();
  fetchCard();
  document.getElementById("logo").src = Logo;
});

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
