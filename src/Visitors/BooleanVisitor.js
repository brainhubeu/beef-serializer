// @flow

import type { Visitor } from '../Types/Visitor';

export default class BooleanVisitor implements Visitor {
  serialize(value: any): boolean {
    return Boolean(value);
  }
}
