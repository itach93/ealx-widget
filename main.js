//

import { CLOSE_ICON, MESSAGE_ICON, styles } from "./assets.js";

class OrderWidget {
  constructor(position = "bottom-right") {
    this.position = this.getPosition(position);
    this.open = false;
    this.initialize();
    this.injectStyles();
  }

  position = "";
  open = false;
  widgetContainer = null;

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  // Get the position of hte widget based on the position of input text id of the main page
  getPositionDynamically() {
    const input = document.getElementById("name");
    const inputPosition = input.getBoundingClientRect();
    const { top, left, right, bottom } = inputPosition;
    const { innerHeight, innerWidth } = window;
    const position = {};
    if (top < innerHeight / 2) {
      position["top"] = `${bottom + 10}px`;
    } else {
      position["bottom"] = `${innerHeight - top + 10}px`;
    }
    if (left < innerWidth / 2) {
      position["left"] = `${left}px`;
    } else {
      position["right"] = `${innerWidth - right}px`;
    }
    return position;
  }

  async initialize() {
    /**
     * Create and append a div element to the document body
     */
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    /**
     * Create a button element and give it a class of button__container
     */
    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    /**
     * Create a span element for the widget icon, give it a class of 'widget__icon', update it's innerHTML property to an icon which would serve as the widget icon.
     */
    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    /**
     * Create a span element for the close icon, give it a class of 'widget__icon' and 'widget__hidden' which would be removed whenever the widget is closed, update it's innerHTML property to an icon which would serve as the widget icon during that state.
     */
    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    /**
     * Append both icons created to the button element and add a `click` event listener on the button to toggle the widget open and close.
     */
    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    /**
     * Create a container for the widget and add the following classes:- "widget__hidden", "widget__container"
     */
    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    /**
     * Invoke the `createWidget()` method
     */
    this.createWidgetContent();

    /**
     * Append the widget's content and the button to the container
     */
    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
        <header class="widget__header">
            <h3>Order Quality</h3>
        </header>

        <form onsubmit="handleSubmit(event)">
            <div class="form__field">
                <label for="name">Order number</label>
                <input
                type="text"
                id="orderNumber"
                name="name"
                placeholder="12345678"
                />
            </div>

            <div class="radio-group radio-group">
              <input type="radio" id="option1" name="options" value="option1">
              <label class="radio-label" for="option1">Poor</label>
              <input type="radio" id="option2" name="options" value="option2">
              <label class="radio-label" for="option2">Good</label>
              <input type="radio" id="option3" name="options" value="option3">
              <label class="radio-label" for="option3">Excellent</label>
            </div>

            <button>Submit</button>
        </form>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("orderNumber").value;
    const textName = document.getElementById("textInput").value;
    console.log("Text Name:", textName);
    const selectedOption = document.querySelector(
      'input[name="options"]:checked'
    ).value;
    console.log("Name:", name);
    console.log("Selected Option:", selectedOption);
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");

    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }
}

function initializeWidget() {
  return new OrderWidget();
}

initializeWidget();
