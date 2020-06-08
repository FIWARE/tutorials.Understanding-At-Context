function getModel(ngsi) {
  if (Array.isArray(ngsi.model)) {
    const str = [];
    ngsi.model.forEach(value => {
      str.push(getURL(value));
    });

    return str.join(' or ');
  }
  return getURL(ngsi.model);
}

function getURL(url) {
  const str = url || '/';
  const split = str.split('/');
  let name = split[split.length - 1];

  name = name.indexOf('#') ? name.substring(name.indexOf('#') + 1) : name;

  return url ? '[' + name + '](' + url + ')' : '';
}

function getRequired(required, key, readOnly) {
  if (readOnly) {
    return '   -  Read-Only. Automatically generated.';
  }

  if (!required) {
    return '   -  Optional';
  }
  return '   -  ' + (required.includes(key) ? 'Required' : 'Optional');
}

function addText(text, api) {
  Object.keys(api.components.schemas).forEach(obj => {
    const schema = api.components.schemas[obj];
    const hasProps = schema.properties || schema.allOf;

    if (hasProps) {
      text.push('# ' + obj + '\n');
      text.push(schema.description);

      if (schema.allOf) {
        schema.allOf.forEach(key => {
          addEntry(key, text);
        });
      }
      if (schema.properties) {
        addEntry(schema, text);
      }

      text.push('\n\n');
    }
  });
}

function addExamples(text, api) {
  let hasExamples = false;
  Object.keys(api.paths).forEach(path => {
    const example = api.paths[path];
    if (example.get && example.get.responses['200'].content) {
      hasExamples = true;
    }
  });

  if (hasExamples) {
    text.push('## Examples');

    Object.keys(api.paths).forEach(path => {
      let example = api.paths[path];

      if (example.get) {
        example = example.get.responses['200'];
        text.push('\n### ' + example.description + '\n');

        if (example.content['application/ld+json']) {
          text.push(
            addExample(example.content['application/ld+json'].examples)
          );
        }
        if (example.content['application/json']) {
          text.push(addExample(example.content['application/json'].examples));
        }
      }
    });
  }
}

function addExample(examples) {
  if (!examples) {
    return '';
  }
  const text = [];
  Object.keys(examples).forEach(key => {
    const value = examples[key];
    text.push('\n#### ' + value.summary + '\n');

    text.push('```json');
    text.push(JSON.stringify(value.value, null, 4));
    text.push('```');
  });

  return text.join('\n');
}

function addEntry(schema, text) {
  Object.keys(schema.properties).forEach(key => {
    const value = schema.properties[key];
    let description = value.description || '';

    if (value.enum) {
      description = addEnums(description, value.enum);
    }

    const ngsi = value['x-ngsi'] || {};
    const type = ngsi.type || 'Property';
    text.push('-  `' + key + '`: ' + description.trim());
    text.push('   -  Attribute type: **' + type + '**. ' + getModel(ngsi));
    text.push(getRequired(schema.required, key, value.readOnly));

    if (value.externalDocs && value.externalDocs.url) {
      text.push('   -  Normative References: ' + value.externalDocs.url);
    }
    if (ngsi.properties) {
      const metaData = ngsi.properties;
      text.push('   -  Meta Data: ');
      Object.keys(metaData).forEach(key => {
        const value = metaData[key] || {};

        const ngsi = value['x-ngsi'] || {};
        const type = ngsi.type || 'Property';
        const desc = value.description ? value.description.trim() : '';

        text.push('       -  `' + key + '`: ' + desc);
        text.push(
          '           -  Attribute type: **' + type + '**. ' + getModel(ngsi)
        );
      });
    }
  });
}

function addEnums(description, enums) {
  const texts = [];
  enums.forEach(key => {
    if (typeof key === 'string' || key instanceof String) {
      texts.push(key);
    } else {
      texts.push(Object.keys(key)[0]);
    }
  });

  return description.trim() + '. One of : `' + texts.join('`, `') + '`.';
}

exports.addText = addText;
exports.addExamples = addExamples;
