function runGenerator(paraForFirstOne, generator) {
  var gen = generator(paraForFirstOne);
  function go(result) {
    if (result.done) return;
    if (typeof result.value.then === "function") {
      result.value.then(r => {
        go(gen.next(r));
      });
    } else {
      go(gen.next(result.value));
    }
  }
  go(gen.next());
}

function beforeAddToCart(event) {
  return {
    event: "event",
    form: "form",
    addToCartBtn: "addToCartBtn"
  };
}

function addToCart() {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      resolve({
        event: "event",
        form: "form",
        addToCartBtn: "addToCartBtn"
      });
    });
  });
}

function fireEvents() {
  return {
    event: "event",
    form: "form",
    addToCartBtn: "addToCartBtn"
  };
}

function afterAddToCart() {}

// Build Generator
function* _eventGenerator(event) {
  const paraObjForNext1 = yield beforeAddToCart(event);
  const paraObjForNext2 = yield addToCart(paraObjForNext1);
  const paraObjForNext3 = yield fireEvents(paraObjForNext2);
  const paraObjForNext4 = yield afterAddToCart(paraObjForNext3);
}

runGenerator(event, _eventGenerator);
