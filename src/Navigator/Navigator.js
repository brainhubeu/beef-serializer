// @flow
import type { Visitor } from '../Types/Visitor';

export default class Navigator {
  visitors: Object;
  
  constructor() {
    this.visitors = {};
  }

  addVisitor(type: string, visitor: Visitor) {
    this.visitors[type] = visitor;
  }

  getVisitor(type: string): Visitor {
    return this.visitors[type];
  }
}
