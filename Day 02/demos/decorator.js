class Button {
  constructor(lable, onclick) {
    this.lable = lable;
    this.onclick = onclick;
  }
  render() {
    const btn = document.createElement("button");
    btn.textContent = this.lable;
    btn.onclick = this.onclick;
    return btn;
  }
}
// deocrator
class ElevatedButton {
  constructor(buttonComponent, level = 4) {
    this.buttonComponent = buttonComponent;
    this.level = level;
  }
  render() {
    const btn = this.buttonComponent.render();
    btn.style.boxShadow = `${this.level}px ${this.level}px ${this.level}px blue`;
  }
}

// let btn1 = new Button("Click Me", () => {
//   console.log("hello!");
// });

let shadowbtn = new ElevatedButton(
  new Button("Submit", () => {
    console.log("form submitted");
  })
);

shadowbtn.render()
