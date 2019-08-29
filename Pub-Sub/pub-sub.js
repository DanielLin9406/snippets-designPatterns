function DataHub() {}
function DataManager() {
  this.events = {};
  this.uId = -1;
}
DataHub.prototype.notify = function(value, callback) {
  callback(value);
};

DataManager.prototype.publish = function(key, value) {
  if (!this.events[key]) {
    return false;
  }
  const subscribers = this.events[key];
  let count = subscribers ? subscribers.length : 0;
  while (count--) {
    const subscriber = subscribers[count];
    subscriber.handler(key, subscriber.taskId, value);
  }
};

DataManager.prototype.subscribe = function(key, handler) {
  if (!this.events[key]) {
    this.events[key] = [];
  }
  const taskId = (++this.uId).toString();
  this.events[key].push({
    taskId,
    handler
  });
};

function initPub() {
  const subjectHub = new DataHub();
  const publishData = {
    cardTitle: {
      height: "123px",
      className: "card-title"
    },
    cardText: {
      height: "123px",
      className: "card-text"
    },
    cardPromoText: {
      height: "123px",
      className: "card-promo-text"
    }
  };

  // Publish
  subjectHub.notify(publishData, function(value) {
    styleManager.publish(value["key"], value["height"]);
  });
}

function initSub() {
  const styleManager = new DataManager();

  const handler = function(key, taskId, value) {
    subArr.forEach(ele => {
      $(ele)
        .find("." + key)
        .height(value);
    });
  };

  // Subscribe
  styleManager.subscribe("card-title", handler);
  styleManager.subscribe("card-text", handler);
  styleManager.subscribe("card-promo-text", handler);
}

initSub();
initPub();
