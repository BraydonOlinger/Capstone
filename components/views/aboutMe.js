import html from "html-literal";
import headshot from "../../HomePage/images/headshot.jpg";
import icp from "../../HomePage/images/ICP.png";
import googleIT from "../../HomePage/images/googleIT.png";

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
        schedules.
      </p>
    </div>
    <div class="links">
      <ul>
        <li>
          - Check out my
          <a href="https://braydon-olinger.my.canva.site/"
            >Digital Marketing Portfolio.</a
          >
        </li>
        <li>
          - Connect with me on
          <a href="https://www.linkedin.com/in/braydon-olinger-191775171/"
            >LinkedIn.</a
          >
        </li>
        <li>
          - Follow me on <a href="https://x.com/Olinbear">Twitter</a> (I won't
          call it X).
        </li>
        <li>
          - Keep up with my coding journey by following my
          <a href="https://github.com/BraydonOlinger">Github</a>
        </li>
      </ul>
    </div>
    <div class="certificates">
      <h3>Certificates</h3>
      <li>
        ICAgile Certified Professional
        <div class="icp" id="ICAgile">
          <img src="${icp}" style="width: 150px;" />
        </div>
      </li>
      <li>
        Google IT Fundamentals via Coursera
        <div class="Google" id="GoogleIT">
          <img src="${googleIT}" style="width: 300px;" />
        </div>
      </li>
    </div>
  </section>
`;
