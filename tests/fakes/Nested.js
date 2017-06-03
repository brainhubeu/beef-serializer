export default class Nested {
  add(name, value) {
    this[name] = value;
    this.first = this.first || name;
  }

  getValue() {
    return this[this.first];
  }
}
