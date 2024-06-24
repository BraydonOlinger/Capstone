import html from "html-literal";

export default item => {
  return html`
    <p>
      <a href="${item.url}" title="${item.text}" data-navigo>${item.text}</a>
    </p>
  `;
};
