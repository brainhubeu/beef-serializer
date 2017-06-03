import Navigator from './Navigator';
import StringVisitor from '../Visitors/StringVisitor';
import NumberVisitor from '../Visitors/NumberVisitor';
import BooleanVisitor from '../Visitors/BooleanVisitor';

export default (): Navigator => {
  const navigator = new Navigator();
  
  navigator.addVisitor('string', new StringVisitor());
  navigator.addVisitor('number', new NumberVisitor());
  navigator.addVisitor('boolean', new BooleanVisitor());
  
  return navigator;
};
