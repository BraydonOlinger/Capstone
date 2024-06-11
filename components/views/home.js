import html from "html-literal";
import esportSyncLogo from "../../HomePage/images/esportSyncLogo.png";

export default state => html`<section class="hero">
<div class="hero-containter">
  <div class="column-left" id="logo">
    <img src="${esportSyncLogo}" class="small-image" />
  </div>
</div>

<footer>The weather i</div>n ${state.weather.city} is ${state.weather.description}.
    Temperature is ${state.weather.temp}F, and it feels like
    ${state.weather.feelsLike}F</footer>
</section>`;
