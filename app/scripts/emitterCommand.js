function emitterCommand(commandName, commandParamArray) {
    this.commandName = commandName;

    if (commandParamArray) {
      for (var i=0; i<this.commandParamArray.length; i++) {
        commandParamArray[i].name = commandParamArray[i].toLowerCase();
      }
    }

    this.commandParameters = commandParamArray ? commandParamArray : [];
}

function emitterCommandParam(name, value) {
    this.name = name;
    this.value = value;
}

emitterCommand.prototype.addParam = function(key, value) {
  this.commandParameters.push(new emitterCommandParam(key.toLowerCase(), value));
  return this;
}

emitterCommand.prototype.getParam = function(key) {
  if (!key) {
    return null;
  }

  key = key.toLowerCase();

  for (var i=0; i<this.commandParameters.length; i++) {
    if (this.commandParameters[i].name === key) {
      return this.commandParameters[i].value;
    }
  }

  return null;
}

