import Navigo from "navigo";
import { camelCase } from "lodash";
import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store/index.js";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.home) {
  document.querySelector("#root").innerHTML = `
      ${Header(state)}
      ${Nav(store.nav)}
      ${Main(state)}
      ${Footer()}
    `;
  router.updatePageLinks();

  afterRender(state);
}

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });
}

router
  .on({
    "/": () => render(store.home),
    ":view": ({ data, params }) => {
      // data?.view checks if view exists, then ternary runs
      const view = data.view ? camelCase(data.view) : "home";
      if (view in store) {
        // store[view]
        render(store[view]);
      } else {
        console.log(`View ${view} not defined`);
        render(store.viewNotFound);
      }
    }
  })
  .notFound(() => render(store.viewNotFound))
  .resolve();
