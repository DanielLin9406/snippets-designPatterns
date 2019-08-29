// Proxy
// Proxy allows us to mangage access to some target object or multiple target object

class Greetings {
  english() {
    return "Hello";
  }
  spanish() {
    return "Hola";
  }
}

class MoreGrettings {
  german() {
    return "Hallo";
  }
  french() {
    return "Bonjour";
  }
}

const greetings = new Grettings();
const moreGreetings = new MoreGrettings();

const allGrettings = new Proxy(moreGreetings, {
  get: function(target, property) {
    return target[property] || moreGreetings[property];
  }
});

allGrettings.german();
