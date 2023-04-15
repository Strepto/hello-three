import "./style.css";
import { startThree } from "./threeapp";

const appDiv = document.querySelector<HTMLDivElement>("#app")!;
appDiv.innerHTML = `
    <canvas style="width:100%;height:100%;display:block;" id="three-canvas"></canvas>
`;

appDiv.style.width = "100%";
appDiv.style.height = "100%";
startThree(document.querySelector<HTMLCanvasElement>("#three-canvas")!);
