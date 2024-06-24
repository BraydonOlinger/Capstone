import html from "html-literal";

export default state => html`
  <section class="hero">
    <div class="event-containers">
    <div id="eventTable">
      <h2>View Events</h2>
      <table id="events">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
        </tr>
        ${state.appointments
          .map(
            appointments => html`
              <tr>
                <td>${appointments.title}</td>
                <td>${appointments.start.toLocaleString()}</td>
                <td>${appointments.end.toLocaleString()}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  </section>
`;
