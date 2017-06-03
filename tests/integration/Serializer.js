import Serializer from '../../src/Serializer';
import { expect } from '../../tests/chai';
import Bag from '../fakes/Bag';
import Nested from '../fakes/Nested';
import SerializerConfiguration from '../../src/Configuration';
import NavigatorFactory from '../../src/Navigator/NavigatorFactory';

describe('Serializer', () => {
  describe('properties', () => {
    it('serializes string property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          name: {
            type: 'string',
          }
        }
      });

      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('name', 'Marcin');

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        name: 'Marcin',
      });
    });

    it('serializes number property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          age: {
            type: 'number',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);


      const bag = new Bag();
      bag.add('age', 30);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        age: 30,
      });
    });

    it('serializes boolean property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          locked: {
            type: 'boolean',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('locked', false);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        locked: false,
      });
    });

    it('serializes nested object property', () => {
      const metadatas = [
        new SerializerConfiguration('Bag', {
          properties: {
            nested: {
              type: 'Nested',
            }
          }
        }),
        new SerializerConfiguration('Nested', {
          properties: {
            property: {
              type: 'string',
            }
          }
        }),
      ];
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfigurations(metadatas);

      const bag = new Bag();
      const nested = new Nested();
      nested.add('property', 'value');
      bag.add('nested', nested);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        nested: {
          property: 'value',
        }
      });
    });

    it('serializes array of strings property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          collection: {
            type: 'Array<string>',
          }
        }
      });

      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', ['hello', 'world']);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: ['hello', 'world'],
      });
    });

    it('serializes array of numbers property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          collection: {
            type: 'Array<number>',
          }
        }
      });

      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', [1, 4]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [1, 4],
      }).and.not.be.instanceOf(Bag);
    });

    it('serializes array of booleans property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {
          collection: {
            type: 'Array<boolean>',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', [true, false]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [true, false],
      }).and.not.be.instanceOf(Bag);
    });

    it('serializes array of nested objects property', () => {
      const metadatas = [
        new SerializerConfiguration('Bag', {
          properties: {
            collection: {
              type: 'Array<Nested>',
            }
          }
        }),
        new SerializerConfiguration('Nested', {
          properties: {
            property: {
              type: 'string',
            }
          }
        }),
      ];
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfigurations(metadatas);

      const bag = new Bag();
      const nested1 = new Nested();
      const nested2 = new Nested();
      nested1.add('property', 'value1');
      nested2.add('property', 'value2');
      bag.add('collection', [nested1, nested2]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [
          {property: 'value1'},
          {property: 'value2'},
        ]
      });
    });

    it('does not serialize unconfigured properties', () => {
      const metadata = new SerializerConfiguration('Bag', {
        properties: {}
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('name', 'Marcin');

      expect(serializer.serialize(bag, ['default'])).to.be.like({});
    });

    it('serializes non existent properties', () => {
    const metadata = new SerializerConfiguration('Bag', {
        properties: {
          name: {
            type: 'string',
          }
        }
      }
    );
    const serializer = new Serializer(NavigatorFactory());
    serializer.addConfiguration(metadata);

    const bag = new Bag();

    expect(serializer.serialize(bag, ['default'])).to.be.like({
      name: "undefined",
    });
  })
  });

  describe('virtual properties', () => {
    it('serializes string virtual property', () => {
    const metadata = new SerializerConfiguration('Bag', {
      virtual_properties: {
        getValue: {
          serialized_name: 'name',
          type: 'string',
        }
      }
    });

    const serializer = new Serializer(NavigatorFactory());
    serializer.addConfiguration(metadata);

    const bag = new Bag();
    bag.add('name', 'Marcin');

    expect(serializer.serialize(bag, ['default'])).to.be.like({
      name: 'Marcin',
    });
  });

    it('serializes number virtual property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {
          getValue: {
            serialized_name: 'age',
            type: 'number',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);


      const bag = new Bag();
      bag.add('age', 30);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        age: 30,
      });
    });

    it('serializes boolean virtual property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {
          getValue: {
            serialized_name: 'locked',
            type: 'boolean',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('locked', false);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        locked: false,
      });
    });

    it('serializes nested object virtual property', () => {
      const metadatas = [
        new SerializerConfiguration('Bag', {
          virtual_properties: {
            getValue: {
              serialized_name: 'nested',
              type: 'Nested',
            }
          }
        }),
        new SerializerConfiguration('Nested', {
          virtual_properties: {
            getValue: {
              serialized_name: 'property',
              type: 'string',
            }
          }
        }),
      ];
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfigurations(metadatas);

      const bag = new Bag();
      const nested = new Nested();
      nested.add('property', 'value');
      bag.add('nested', nested);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        nested: {
          property: 'value',
        }
      });
    });

    it('serializes array of strings virtual property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {
          getValue: {
            serialized_name: 'collection',
            type: 'Array<string>',
          }
        }
      });

      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', ['hello', 'world']);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: ['hello', 'world'],
      });
    });

    it('serializes array of numbers virtual property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {
          getValue: {
            serialized_name: 'collection',
            type: 'Array<number>',
          }
        }
      });

      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', [1, 4]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [1, 4],
      }).and.not.be.instanceOf(Bag);
    });

    it('serializes array of booleans virtual property', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {
          getValue: {
            serialized_name: 'collection',
            type: 'Array<boolean>',
          }
        }
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('collection', [true, false]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [true, false],
      }).and.not.be.instanceOf(Bag);
    });

    it('serializes array of nested objects virtual property', () => {
      const metadatas = [
        new SerializerConfiguration('Bag', {
          virtual_properties: {
            getValue: {
              serialized_name: 'collection',
              type: 'Array<Nested>',
            }
          }
        }),
        new SerializerConfiguration('Nested', {
          virtual_properties: {
            getValue: {
              serialized_name: 'property',
              type: 'string',
            }
          }
        }),
      ];
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfigurations(metadatas);

      const bag = new Bag();
      const nested1 = new Nested();
      const nested2 = new Nested();
      nested1.add('property', 'value1');
      nested2.add('property', 'value2');
      bag.add('collection', [nested1, nested2]);

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        collection: [
          { property: 'value1' },
          { property: 'value2' },
        ]
      });
    });

    it('does not serialize unconfigured virtual properties', () => {
      const metadata = new SerializerConfiguration('Bag', {
        virtual_properties: {}
      });
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();
      bag.add('name', 'Marcin');

      expect(serializer.serialize(bag, ['default'])).to.be.like({});
    });

    it('serializes non existent virtual properties', () => {
      const metadata = new SerializerConfiguration('Bag', {
          virtual_properties: {
            getValue: {
              serialized_name: 'name',
              type: 'string',
            }
          }
        }
      );
      const serializer = new Serializer(NavigatorFactory());
      serializer.addConfiguration(metadata);

      const bag = new Bag();

      expect(serializer.serialize(bag, ['default'])).to.be.like({
        name: "undefined",
      });
    });
  });
});
