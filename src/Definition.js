// @flow

export default class PropertyDefinition {
  isArray:RegExp;
  name: string;
  definition: Object;

  constructor(name: string, definition: Object) {
    this.definition = definition;
    this.definition.groups = this.definition.groups || ['default'];
    this.name = name;
    this.isArray = /^Array<(.*)>$/;
  }

  getName(): string {
    return this.name;
  }
  
  getType(): string {
    return this.definition.type;
  }
  
  getSerializedName(): string {
    return this.definition.serialized_name || this.name;
  }

  hasAnySerializationGroup(groups: Array<string>): boolean {
    return this.definition.groups.some(group => groups.includes(group));
  }

  isArrayType(): boolean {
    return this.isArray.exec(this.definition.type);
  }
}
