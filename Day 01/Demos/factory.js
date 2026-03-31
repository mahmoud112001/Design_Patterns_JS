class Circle {
  draw() {
    console.log("I draw Circle");
  }
}
class Rectangle {
  draw() {
    console.log("I draw Rectangle");
  }
}
class Star {
  draw() {
    console.log("I draw Star");
  }
}
class Triangle {
  draw() {
    console.log("I draw Triangle");
  }
}





class ShapeFactory {
  constructor(shapeType) {
    this.type = shapeType;
  }

  createShape() {
    switch (this.type) {
      case "Circle":
        return new Circle();
      case "Star":
        return new Star();
      case "Rect":
        return new Rectangle();
      case "Triangle":
        return new Triangle();
    }
  }
}


let interface1=new ShapeFactory('Circle')
let shape=interface1.createShape()
shape.draw()

