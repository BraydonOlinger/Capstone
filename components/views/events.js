import html from "html-literal";

export default state => html`
  <section class="hero">
    <div class="hero-container">
      <div class="column-left">
        <h1>Event List</h1>
      </div>
    </div>
    <div class="event-container">
      <label for="date">Date:</label>
      <input
        type="date"
        name="date"
        id="date"
        placeholder="Enter Date"
        required
      />
    </div>
    <div>
      <label for="description">Description:</label>
      <input
        type="text"
        name="description"
        id="description"
        placeholder="Enter Description"
        required
      />
    </div>
    <input type="submit" value="Submit Event" />
    <div id="eventTable">
      <h2>View Events<h2>
      <table id="events">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
      ${state.appointments
        .map(
          appointments =>
            html`
              <tr>
                <td>${appointments.id}</td>
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
