import html from "html-literal";
import navItem from "./navItem.js";

export default state => html`
  <nav>
    <div class="logo">EsportSync</div>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile">
      ${state.map(item => navItem(item)).join("")}
    </ul>
  </nav>
`;
