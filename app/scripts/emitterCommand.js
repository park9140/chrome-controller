function emitterCommand(commandName, commandParamArray) {
    this.commandName = commandName;
    this.commandParameters = commandParamArray ? commandParamArray : [];
}

function emitterCommandParam(name, value) {
    this.name = name;
    this.value = value;
}

emitterCommand.prototype.addParam = function(key, value) {
  this.commandParameters.push(new emitterCommandParam(key, value));
  return this;
}

