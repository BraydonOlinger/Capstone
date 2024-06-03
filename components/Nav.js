import html from "html-literal";
import navItem from "./navItem.js";

export default () => html`
  <nav>
    <div class="logo">EsportSync</div>
    <i class="fas fa-bars"></i>
    <ul class="">
      ${navItem.map(item => navItem(item)).join("")}
    </ul>
    <div class="nav-items">
      <a href="/">Home</a>
      <a href="/">About</a>
      <a href="/">Contact</a>
    </div>
  </nav>
`;
