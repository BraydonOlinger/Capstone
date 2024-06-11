import html from "html-literal";
import navItem from "./navItem.js";

export default navItems => html`
  <nav>
    <div class="logo">EsportSync</div>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile">
      ${navItems.map(item => navItem(item)).join("")}
    </ul>
  </nav>
`;
