'use strict';
var path = require('path');
var CoffeePreprocessor = require('./lib/coffee-preprocessor');
var fs   = require('fs');

function CoffeescriptAddon(project) {
  this._project = project;
  this.name     = 'Ember CLI Coffeescript Addon';
}

CoffeescriptAddon.prototype.blueprintsPath = function() {
  return path.join(__dirname, 'blueprints');
};

CoffeescriptAddon.prototype.treeFor = function treeFor(name) {
  var treePath = path.join('node_modules/ember-cli-coffeescript', name);

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

CoffeescriptAddon.prototype.included = function(app) {
  this.app = app;

  var plugin = new CoffeePreprocessor(this.app.options.coffeeOptions);

  this.app.registry.add('js', plugin);
};

module.exports = CoffeescriptAddon;
