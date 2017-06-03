// @flow

import type { Visitor } from '../Types/Visitor';

export default class StringVisitor implements Visitor  {
  serialize(value: any): string {
    return String(value);
  }
}
