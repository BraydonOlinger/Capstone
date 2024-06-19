import html from "html-literal";
import headshot from "../../HomePage/images/headshot.jpg";

export default () => html`
  <section class="hero">
    <div class="hero-containter">
      <div class="column-left">
        <h1>Braydon Olinger</h1>
      </div>
    </div>
    <div>
      <h5 class="bio">Web Developer from St. Louis, Missouri</h5>
    </div>
    <div class="images" id="headshot">
      <img src="${headshot}" />
    </div>
    <div class="blurb">
      <p>
        Hey! My name is Braydon Olinger and I am a Web Developer currently based
        in St. Louis, Missouri. I have an extensive background working in
        esports, mainly in the social media & marketing spaces.
      </p>
    </div>
    <div class="blurb2">
      <p>
        I created EsportSync as a way for teams and (and fans alike) to
        centralize their favorite esports title or team's match & tournament
        schedules!
      </p>
    </div>
    <div class = "links">
      <ul>
        <li>- Check out my Digital Marketing Portfolio <a href="https://braydon-olinger.my.canva.site/">HERE.</a></li>
        <li>- Connect with me on <a href="https://www.linkedin.com/in/braydon-olinger-191775171/">LinkedIn.</a></li>
        <li>- Follow me on <a href="https://x.com/Olinbear">Twitter</a> (I'm not calling it X.)</li>
      </ul>
  </section>
`;
