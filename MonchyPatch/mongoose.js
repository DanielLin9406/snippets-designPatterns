const mongoose = require("mongoose");
const exec = mongoose.Query.prototype.exec;

// Define a new method and add into prototype
mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this; // Chainable
};

mongoose.Query.prototype.exec = async function() {
  // Define what you want here:

  // No cache, original 'exec' function
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  // Pass this and arguments as general
  const result = await exec.apply(this, arguments);
  return result;
};
