import { header, nav, main, footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { camelCase, capitalize } from "lodash";

import axios from "axios";

const router = new Navigo("/");
var calendar;

function render(state) {
  document.querySelector("#root").innerHTML = `
    ${header(state)}
    ${nav(store.nav)}
    ${main(state)}
    ${footer()}
  `;

  router.updatePageLinks();

  afterRender(state);
}

function handleEventDragResize(info) {
  const event = info.event;

  if (confirm("Are you sure about this change?")) {
    const requestData = {
      title: event.title,
      start: event.start.toJSON(),
      end: event.end.toJSON(),
      url: event.url
    };

    axios
      .put(`${process.env.API_URL}/appointments/${event.id}`, requestData)
      .then(response => {
        console.log(
          `Event '${response.data.title}' (${response.data._id}) has been updated.`
        );
      })
      .catch(error => {
        info.revert();
        console.log("It puked", error);
      });
  } else {
    info.revert();
  }
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );

  if (state.view === "Schedule") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;

      const requestData = {
        title: inputList.title.value,
        allDay: inputList.allDay.checked,
        start: new Date(inputList.start.value).toJSON(),
        end: new Date(inputList.end.value).toJSON()
      };

      axios
        .post(`${process.env.API_URL}/appointments`, requestData)
        .then(response => {
          store.Calendar.appointments.push(response.data);
          router.navigate("/home");
        })
        .catch(error => {
          console.log("It puked", error);
        });
    });
  }

  if (state.view === "home") {
    const calendarEl = document.getElementById("calendar");
    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List"
      },
      height: "100%",
      dayMaxEventRows: true,
      navLinks: true,
      editable: true,
      selectable: true,
      eventClick: function(info) {
        // change the border color just for fun
        info.el.style.borderColor = "red";
      },
      eventDrop: function(info) {
        handleEventDragResize(info);
      },
      eventResize: function(info) {
        handleEventDragResize(info);
      },
      select: info => {
        const title = prompt("Please enter a title");

        if (title) {
          const requestData = {
            title: title,
            start: info.start.toJSON(),
            end: info.end.toJSON(),
            allDay: info.view.type === "dayGridMonth"
          };

          axios
            .post(`${process.env.API_URL}/appointments`, requestData)
            .then(response => {
              response.data.url = `/appointments/${response.data._id}`;
              store.Appointments.appointments.push(response.data);
              console.log(
                `Event '${response.data.title}' (${response.data._id}) has been created.`
              );
              calendar.addEvent(response.data);
              calendar.unselect();
            })
            .catch(error => {
              console.log("It puked", error);
            });
        } else {
          calendar.unselect();
        }
      },
      events: state.appointments || []
    });
    calendar.render();
  }

  if (state.view === "Appointments") {
    const deleteButton = document.getElementById("delete-appointment");
    deleteButton.addEventListener("click", event => {
      deleteButton.disabled = true;

      if (confirm("Are you sure you want to delete this appointment")) {
        axios
          .delete(
            `${process.env.API_URL}/appointments/${event.target.dataset.id}`
          )
          .then(response => {
            // Push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
            console.log(
              `Event '${response.data.title}' (${response.data._id}) has been deleted.`
            );
            router.navigate("/home");
          })
          .catch(error => {
            console.log("It puked", error);
          });
      } else {
        deleteButton.disabled = false;
      }
    });
  }
}

//  ADD ROUTER HOOKS HERE ...
router.hooks({
  before: (done, params) => {
    let view = "home";
    let id = "";

    if (params && params.data) {
      view = params.data.view ? capitalize(params.data.view) : "home";
      id = params.data.id ? params.data.id : "";
    }

    switch (view) {
      case "home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=st.%20louis&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=imperial`
          )
          .then(response => {
            store.home.weather = {};
            store.home.weather.city = response.data.name;
            store.home.weather.temp = response.data.main.temp;
            store.home.weather.feelsLike = response.data.main.feels_like;
            store.home.weather.description = response.data.weather[0].main;
            done();
          })
          .catch(err => console.log(err));
        break;
      case "Calendar":
        axios
          .get(`${process.env.API_URL}/appointments`)
          .then(response => {
            const events = response.data.map(event => {
              return {
                id: event._id,
                title: event.title || event.customer,
                start: new Date(event.start),
                end: new Date(event.end),
                url: `/appointments/${event._id}`,
                allDay: event.allDay || false
              };
            });
            store.Calendar.appointments = events;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
          });
        break;
      case "Appointments":
        axios
          .get(`${process.env.API_URL}/appointments/${id}`)
          .then(response => {
            store.Appointments.event = {
              id: response.data._id,
              title: response.data.title || response.data.customer,
              start: new Date(response.data.start),
              end: new Date(response.data.end),
              url: `/appointment/${response.data._id}`
            };
            done();
          })
          .catch(error => {
            console.log("It puked", error);
          });
        break;
      default:
        done();
    }
  }
});

router
  .on({
    "/": () => render(store.home),
    ":view/:id": params => {
      let view = camelCase(params.data.view);
      render(store[view]);
    },
    ":view": params => {
      let view = camelCase(params.data.view);
      render(store[view]);
    }
  })
  .resolve();
