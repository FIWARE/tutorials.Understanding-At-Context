const SwaggerParser = require('@apidevtools/swagger-parser');
const YAML = SwaggerParser.YAML;
const path = require('path');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const common = {
  address:
    'https://jason-fox.github.io/swagger-datamodel-test/common.yaml#/address',
  description:
    'https://jason-fox.github.io/swagger-datamodel-test/common.yaml#/description',
  location:
    'https://jason-fox.github.io/swagger-datamodel-test/common.yaml#/location',
  name:
    'https://jason-fox.github.io/swagger-datamodel-test/common.yaml#/name'
};

function getModel(value, ngsi) {
  if (value.format === 'uri' || value.format === 'url') {
    ngsi.model = 'https://schema.org/URL';
  } else if (value.format === 'date-time') {
    ngsi.model = 'https://schema.org/DateTime';
  } else if (value.type === 'string') {
    ngsi.model = 'https://schema.org/Text';
  } else if (value.type === 'integer') {
    ngsi.model = 'https://schema.org/Integer';
  } else if (value.type === 'float') {
    ngsi.model = 'https://schema.org/Number';
  }
}

function schemaToYaml(obj) {
  const id = path.parse(path.parse(obj.$id).dir).name;
  const unordered = [];

  const obj2 = {
    required: obj.required,
    allOf: [
      {
        $ref:
          'https://jason-fox.github.io/swagger-datamodel-test/common.yaml#/Common'
      }
    ],
    type: obj.type,
    description: obj.description,

    properties: {}
  };

  obj.allOf.forEach(function(element) {
    let properties = element.properties;
    if (properties) {
      Object.keys(properties).forEach(key => {
        if (common[key]) {
          unordered[key] = { $ref: common[key] };
        } else {
          const value = properties[key];
          if (value.type) {
            const inner = {
              'x-ngsi': {
                type: 'Property'
              },
              type: value.type,
              description: value.description || ''
            };

            getModel(value, inner['x-ngsi']);

            if (value.format) {
              inner.format = value.format;
            } else if (value.type == 'integer') {
              inner.format = 'int32';
            }

            if (value.type == 'array') {
            	inner.items = value.items;
            }

            unordered[key] = inner;
          }
        }
      });
    }
  });

  delete unordered.id;
  delete unordered.type;
  delete unordered.dateCreated;
  delete unordered.dateModified;

  Object.keys(unordered)
    .sort()
    .forEach(function(key) {
      obj2.properties[key] = unordered[key];
    });

  const obj3 = {};
  obj3[id] = obj2;

  let yaml = YAML.stringify(obj3);
  return yaml;
}

exports.schemaToYaml = schemaToYaml;
