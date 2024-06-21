import html from "html-literal";

export default state => {
  console.log(state);
  console.log(state.appointment);
  return html`
  <section class="hero">
    <div class="event-container">
      <h3>${state.appointment?.title}</h3>
      <div>
        <em>Start: </em><span>${state.appointment?.start?.toLocaleString()}</span>
      </div>
      <div><em>End: </em><span>${state.appointment?.end?.toLocaleString()}</span></div>
      <button id="delete-appointment" data-id="${state.appointment?.id}">
        Delete Event
      </button>
    </div>
  </section>
`;
}
