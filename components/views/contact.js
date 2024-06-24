import html from "html-literal";

export default state => html`
  <section class="hero">
      <div class="contact-container">
        <h1>Contact Me!</h1>
      </div>
    </div>
    <div class="intro">
      <p>
        I'm always looking for new opportunities. If you'd like to get in touch,
        feel free to use the form below. I'll get back to you as soon as
        possible!
      </p>
    </div>
    <form id="contactForm" method="POST" action="sendmail.php">
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit">Submit</button>
</form>
<script src="script.js"></script>
  </section>
`;
