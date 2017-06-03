export default class Bag {
  add(name, value) {
    this[name] = value;
    this.first = this.first || name;
  }

  getValue() {
    return this[this.first];
  }
}
