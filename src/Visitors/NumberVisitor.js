// @flow

import type { Visitor } from '../Types/Visitor';

export default class NumberVisitor implements Visitor  {
  serialize(value: any): number {
    return Number(value);
  }
}
