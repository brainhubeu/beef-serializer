// @flow

import Definition from './Definition';

export default class Configuration {
  name: string;
  values: Object;
  
  constructor(name: string, values: Object) {
    this.name = name;
    this.values = values;
  }

  getName(): string {
    return this.name;
  }

  getProperties(): Array<Definition> {
    return this._getDefinition('properties');
  }

  getVirtialProperties(): Array<Definition> {
    return this._getDefinition('virtual_properties');
  }

  _getDefinition(key: string): Array<Definition> {
    return Object.keys(this.values[key] || {}).map(name => {
      const value = this.values[key][name];
      
      if (value instanceof Definition) {
        return value;
      }

      return new Definition(name, value);
    });
  }
}
