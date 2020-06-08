const SwaggerParser = require('@apidevtools/swagger-parser');
const YAML = SwaggerParser.YAML;
const $RefParser = require('@apidevtools/json-schema-ref-parser');

const Markdown = require('./markdown.js');
const JSONLD = require('./jsonld.js');
const Schema = require('./schema.js');

let api;

const context = {
  type: '@type',
  id: '@id'
};

async function validate(file) {
  try {
    await SwaggerParser.validate(file);
    console.log('Yay! The API is valid.');
  } catch (err) {
    console.error('Onoes! The API is invalid. ' + err.message);
  }
}

async function dereferenceYaml(file) {
  try {
    api = await SwaggerParser.dereference(file);
  } catch (err) {
    console.error(
      'Cannot dereference file. The file is invalid. ' + err.message
    );
  }
}

async function markdown(input, lang) {
  const text = [];

  await dereferenceYaml(input);

  Markdown.addText(text, api);
  Markdown.addExamples(text, api);
  console.log(text.join('\n'));
}

async function ngsi(input, lang) {
  JSONLD.addCommonContextURLs(context);
  await dereferenceYaml(input);

  console.log(JSON.stringify(JSONLD.getContext(api, context, false), null, 4));
}

async function jsonld(input, lang) {
  JSONLD.addCommonContextURLs(context);
  JSONLD.addCommonGraphURLs(context);

  await dereferenceYaml(input);

  console.log(
    JSON.stringify(
      JSONLD.addGraph(api, JSONLD.getContext(api, context, true)),
      null,
      4
    )
  );
}

exports.validate = validate;
exports.markdown = markdown;
exports.jsonld = jsonld;
exports.ngsi = ngsi;
