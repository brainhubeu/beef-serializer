// @flow

import Configuration from './Configuration';
import DefaultSerializerContext from './DefaultContext';
import Navigator from './Navigator/Navigator';
import Definition from './Definition';
import type { Context } from './Types/Context';
import type { Format } from './Types/Format';

export default class Serializer {
  configurations: {[string]: Configuration};
  context: Context;
  navigator: Navigator;

  constructor(navigator: Navigator, context: Context = new DefaultSerializerContext()) {
    this.context = context;
    this.navigator = navigator;
    this.configurations = {};
  }

  addConfiguration(configuration: Configuration) {
    this.configurations[configuration.getName()] = configuration;
  }

  addConfigurations(configurations: Array<Configuration>) {
    configurations.forEach(configuration => this.addConfiguration(configuration));
  }
  
  serialize(data: any, groups: Array<string> = [], format: Format = 'json'): any {
    const configuration = this._getConfiguration(data);

    if (configuration) {
      return this._serializeObject(data, configuration, groups, format);
    }

    return this._serializeValue(data);
  }

  _serializeValue(data: any): any {
    const visitor = this.navigator.getVisitor(typeof data);

    if (visitor) {
      return visitor.serialize(data);
    }
    
    return {};
  }

  _serializeObject(data: any, configuration: Configuration, groups: Array<string> = [], format: Format = 'json'): Object {
    return Object.assign(
      {},
      this._serializeProperties(data, configuration, groups, format),
      this._serializeVirtualProperties(data, configuration, groups, format)
    );
  }

  _serializeProperties(data: any, configuration: Configuration, groups: Array<string> = [], format: Format = 'json') : Object {
    const result = {};
    
    configuration.getProperties().forEach(property => {
      const value = data[property.getName()];

      result[property.getSerializedName()] = this._getSerializedValue(value, property, groups, format);
    });
    
    return result;
  }

  _serializeVirtualProperties(data: any, configuration: Configuration, groups: Array<string> = [], format: Format = 'json'): Object {
    const result = {};

    configuration.getVirtialProperties().forEach(virtualProperty => {
      const value = data[virtualProperty.getName()].apply(data);

      result[virtualProperty.getSerializedName()] = this._getSerializedValue(value, virtualProperty, groups, format);
    });

    return result;
  }

  _getSerializedValue(value: any, property: Definition, groups: Array<string>, format: Format = 'json'): any {
    if (property.hasAnySerializationGroup(groups)) {
      const visitor = this.navigator.getVisitor(property.getType());

      if (property.isArrayType()) {
        return value.map(
          value => this.serialize(value, groups, format)
        );
      } else if (!visitor) {
        return this.serialize(value, groups, format)
      } else {
        return visitor.serialize(value);
      }
    }
  }
  
  _getConfiguration(data: any): ?Configuration {
    if (typeof data === 'object' && this.configurations[data.constructor.name]) {
      return this.configurations[data.constructor.name];
    }
  }
}
