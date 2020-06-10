[![FIWARE Banner](https://fiware.github.io/tutorials.Understanding-At-Context/img/fiware.png)](https://www.fiware.org/developers)

[![FIWARE Core Context Management](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/core.svg)](https://github.com/FIWARE/catalogue/blob/master/core/README.md)
[![License: MIT](https://img.shields.io/github/license/fiware/tutorials.Understanding-At-Context.svg)](https://opensource.org/licenses/MIT)
[![Support badge](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/fiware.svg)](https://stackoverflow.com/questions/tagged/fiware)
[![NGSI LD](https://img.shields.io/badge/NGSI-LD-d6604d.svg)](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.01.01_60/gs_CIM009v010101p.pdf)
[![JSON LD](https://img.shields.io/badge/JSON--LD-1.1-f06f38.svg)](https://w3c.github.io/json-ld-syntax/) <br/>
[![Documentation](https://img.shields.io/readthedocs/ngsi-ld-tutorials.svg)](https://ngsi-ld-tutorials.rtfd.io)

This tutorial introduces basics of common Linked Data concepts and Data Models for **NGSI-LD** developers. The aim is to
design and create a simple interoperable Smart Agricultural Solution from scratch and explain how to apply these
concepts to your own smart solutions.

Unlike the previous [tutorials series](http://fiware-tutorials.rtfd.io/), this series will take an **NGSI-LD** first
approach and therefore starts with reiterating the fundamentals of Linked Data and its application to the **NGSI-LD**
interface.

The tutorial is mainly concerned with online and command-line tooling, although some commands will also use cUrl and are
available as Postman documentation

## Contents

<details>
<summary><strong>Details</strong></summary>

-   [Adding Linked Data concepts to FIWARE Data Entities.](#adding-linked-data-concepts-to-fiware-data-entities)
    -   [What is Linked Data?](#what-is-linked-data)
        -   [:arrow_forward: Video: What is Linked Data?](#arrow_forward-video-what-is-linked-data)
        -   [:arrow_forward: Video: What is JSON-LD?](#arrow_forward-video-what-is-json-ld)
    -   [What is NGSI-LD?](#what-is-ngsi-ld)
        -   [NGSI v2 Data Model](#ngsi-v2-data-model)
        -   [NGSI LD Data Model](#ngsi-ld-data-model)
-   [Prerequisites](#prerequisites)
    -   [Docker](#docker)
    -   [Cygwin](#cygwin)
-   [Architecture](#architecture)
-   [Start Up](#start-up)
-   [Creating a "Powered by FIWARE" app based on Linked Data](#creating-a-powered-by-fiware-app-based-on-linked-data)
    -   [Checking the service health](#checking-the-service-health)
    -   [Creating Context Data](#creating-context-data)
        -   [Core Context](#core-context)
        -   [FIWARE Data Models](#fiware-data-models)
        -   [Defining Properties within the NGSI-LD entity definition](#defining-properties-within-the-ngsi-ld-entity-definition)
        -   [Defining Properties-of-Properties within the NGSI-LD entity definition](#defining-properties-of-properties-within-the-ngsi-ld-entity-definition)
    -   [Querying Context Data](#querying-context-data)
        -   [Obtain entity data by FQN Type](#obtain-entity-data-by-fqn-type)
        -   [Obtain entity data by ID](#obtain-entity-data-by-id)
        -   [Obtain entity data by type](#obtain-entity-data-by-type)
        -   [Filter context data by comparing the values of an attribute](#filter-context-data-by-comparing-the-values-of-an-attribute)
        -   [Filter context data by comparing the values of an attribute in an Array](#filter-context-data-by-comparing-the-values-of-an-attribute-in-an-array)
        -   [Filter context data by comparing the values of a sub-attribute](#filter-context-data-by-comparing-the-values-of-a-sub-attribute)
        -   [Filter context data by querying metadata](#filter-context-data-by-querying-metadata)
        -   [Filter context data by comparing the values of a geo:json attribute](#filter-context-data-by-comparing-the-values-of-a-geojson-attribute)

</details>

# Understanding `@context`

Creating an interoperable system of readable links for computers requires the use of a well defined data format
([JSON-LD](http://json-ld.org/)) and assignation of unique IDs
([URLs or URNs](https://stackoverflow.com/questions/4913343/what-is-the-difference-between-uri-url-and-urn)) for both
data entities and the relationships between entities so that semantic meaning can be programmatically retrieved from the
data itself. Futhermore the use and creation of thesse unique IDs should, as far as possible, be passed around so as not
get in the way of the processing the data objects themselves.

An attempt to solve this interoperablity problem has been made within the JSON domain, and this has been done by adding
an `@context` element to existing JSON data structures. This has led to the creation of the **JSON-LD** standard.

The main takeaway from **JSON-LD**, is that a remote context file and the **JSON-LD** `@context` definition can be used
to assign unique long URNs for every defined attribute. Developers are then free to use their own regular short
attribute names within their own applications, but though the application of Expansion and Compaction operations

To promote interoperability, the **NGSI-LD** API is defined using the concepts of **JSON-LD** and therefore a thorough
knowledge of **JSON-LD** `@context` is fundamental to the use **NGSI-LD**.

## What is JSON-LD?

JSON-LD is an extension of JSON , it is a standard way of avoiding ambiguity when expressing linked data in JSON so that
the data is structured in a format which is parsable by machines. It is a method of ensuring that all data attributes
can be easily compared when coming from a multitude of separate data sources, which could have a different idea as to
what each attribute means. For example, when two data entities have a `name` attribute how can the computer be certain
that is refers to a _"Name of a thing"_ in the same sense (rather than a **Username** or a **Surname** or something).
URLs and data models are used to remove ambiguity by allowing attributes to have a both short form (such as `name`) and
a fully specified long form (such `http://schema.org/name`) which means it is easy to discover which attribute have a
common meaning within a data structure.

JSON-LD introduces the concept of the `@context` element which provides additional information allowing the computer to
interpret the rest of the data with more clarity and depth.

Furthermore the JSON-LD specification enables you to define a unique `@type` associating a well-defined
[data model](https://fiware-datamodels.readthedocs.io/en/latest/guidelines/index.html) to the data itself.

### :arrow_forward: Video: What is Linked Data?

[![](https://fiware.github.io/tutorials.NGSI-LD/img/video-logo.png)](https://www.youtube.com/watch?v=4x_xzT5eF5Q "Introduction")

Click on the image above to watch an introductory video on linked data concepts

### :arrow_forward: Video: What is JSON-LD?

[![](https://fiware.github.io/tutorials.NGSI-LD/img/video-logo.png)](https://www.youtube.com/watch?v=vioCbTo3C-4 "JSON-LD")

Click on the image above to watch a video describing the basic concepts behind JSON-LD.

# Creating NGSI-LD Data Models

Within the FIWARE platform, every entity represents the state of a physical or conceptural object. Each entity provides
the digital twin of an object which exists in the real world.

Although the each data entity within your context will vary according to your use case, the common structure within each
data entity should be standardized order to promote reuse. The Fundamentals for FIWARE Data Model design do not change.
Typically each entiy will consist of an **id**, a **type**, a series of **Property** atttributes representing context
data which changes over time and a series of **Relationship** atttributes which represent connections between existing
entities.

It is perhaps best to illustrate this using an example. The Underlying Data Models can be created using many different
tools, however this example will use Swagger [schema](https://swagger.io/docs/specification/data-models/) objects
defined using the [Open API 3](https://swagger.io/docs/specification/about/) Standard. The examples are valid Swagger
specifications, but in reality, we are not interested in defining in paths and operations, as these are already defined
using the
[NGSI-LD API](https://swagger.lab.fiware.org/?url=https://fiware.github.io/tutorials.NGSI-LD/swagger/ngsi-ld.yaml)

## The Scenario

Consider the following Smart Agricultural Scenario:

> _Imagine a farmer owns a barn. The barn contains two IoT devices - a temperature sensor and a filling level sensor
> indicating how much hay is currently stored in the barn_

This example can be split down into the following Entities:

-   **Building**: The barn
-   **Person**: The farmer
-   **IoT Devices**:
    -   Temperature Senor
    -   Filling Level Sensor

## Baseline Data Models

When architecting your Smart System, it is unnecessary to start from scratch, so the first step is to check to see if
there are any existing NGSI-LD data models which are capable of describing your system. As it happens, there are
existing [Smart Data Models](https://www.fiware.org/developers/smart-data-models/) for both **Building** and **Device**,
so it is possible to check if these will fulfill our needs:

![](https://fiware.github.io/tutorials.Understanding-At-Context/img/swagger.png)

-   The **Building** Data Model can be inspected
    [here](https://swagger.lab.fiware.org/?url=https://fiware.github.io/tutorials.NGSI-LD/swagger/building.yaml)
-   The **Device** Data Model can be inspected
    [here](https://swagger.lab.fiware.org/?url=https://fiware.github.io/tutorials.NGSI-LD/swagger/device.yaml)

Many common concepts such as **Person** or **Product** have been formalized by [Schema.org](https://schema.org/), which
is a collaborative community activity for promoting schemas for structured data on the Internet. The schema.org
[Person](https://schema.org/Person) can be described using a JSON-LD schema, and may be co-opted as an NGSI-LD data
model.

-   The **Person** Data Model can be inspected
    [here](https://swagger.lab.fiware.org/?url=https://fiware.github.io/tutorials.NGSI-LD/swagger/person.yaml)

It should be noted that definitions of the models examined so far are very general and will need further modifications
to be of use in a working system, however using these models as the basis of interoperability will ensure that the
resulting `@context` file will be understandable to the widest number of systems.

## Amending Models

The base data models are useful as a starting point but some enumerated values or attributes will be redundant other
required fields will be missing. The base models will therefore need to be modified to create proper digital twins
specific to the scenario we are modelling

### Removing Redundant Items

Many attributes within data models are optional, and not all options will be valid for our scenario. Take for example,
the `category` attribute within the **Building** model - this offers over 60 types of building useful in multiple
domains such as Smart Cities and Smart Agriculture, it is therefore safe to exclude certain options from our own
`@context` file since they are unlikely to be used. For example a **Building** categorised as `cathedral` is unlikely to
be found on a farm.

It is logical to remove bloat before committing to using a particular model as it will help reduce the size of payloads
used.

### Extending

Looking at the **Building** model, it is obvious that we will need a **Building** entity of `category="barn"`, however
the base **Building** model does not offer additional attributes such as `temperature` or `fillingLevel` - these would
need to be added to the base **Building** so that the context broker is able to hold the _context_ - i.e. the current
state of the building.

Many types of device reading (i.e. context data attributes) have been predefined within the
[SAREF ontology](https://ontology.tno.nl/saref/) - so it is reasonable to use the URIs defining these attributes as a
basis of extending our model.

-   `temperature` (`https://w3id.org/saref#temperature`)
-   `fillingLevel` (`https://w3id.org/saref#fillingLevel`)

Many measurement attributes are defined within the [SAREF](https://ontology.tno.nl/saref/) ontology, but other
ontologies could equally be used. For example, the
[iotschema.org schema](https://github.com/iot-schema-collab/iotschema/blob/master/capability.jsonld) contains equivalent
term URIs like `http://iotschema.org/temperature` which could also be used here, the additional data can be added to the
`@graph` to show the equivalence of the two using Simple Knowledge Organization System terms
[SKOS](https://www.w3.org/2009/08/skos-reference/skos.html#).

### Adding metadata

The key goal in designing NGSI-LD data models (as opposed to a generic hierarchy of ontologies), is that wherever
posssible, every _Property_ attribute of a model represents the context data for a digital twin of something tangible in
the real world.

This formulation discourages deep nested hierarchies. A **Building** has a **temperature**, a **Building** has a
**fillingLevel** - anything else is defined as a _Relationship_ - a **Building** has an **owner** which links the
**Building** entity to a separate **Person** entity.

However just holding the values of properties is insufficient. Saying that `temperature=6` is meaningless unless you
also obtain certain meta data, such as _When was the reading taken?_ _Which device made the reading?_ _What units is it
measured in?_ _How accurate is the device?_ and so on.

Therefore supplementary metadata items will be necessary to ensure that the context data is understandable. This will
mean we will need things such as:

-   The Units of measurement
-   Which sensor provided the measurement
-   When was the measurement taken
-   and so on.

```json
{
    "temperature" : 30,
    "unitCode" : "CEL",
    "providedBy": "urn:ngsi-ld:TemperatureSensor:001",
    "observedAt" :"2016-03-15T11:00:00.000"
},
{
    "fillingLevel" : 0.5,
    "unitCode" : "CEL",
    "providedBy": "urn:ngsi-ld:FillingSensor:001",
    "observedAt" :"2016-03-15T11:00:00.000"
}
```

Each one of these attributes has a name, and therefore requires a definition within the `@context`. Fortunately most of
these are predefined in the core NGSI-LD specification:

-   `unitCode` is specified from a common list such as the UN/CEFACT
    [List of measurement codes](https://www.unece.org/fileadmin/DAM/cefact/recommendations/rec20/rec20_rev3_Annex3e.pdf)
-   `observedAt` is a DateTime a well-defined temporal property expressed in UTC, using the ISO 8601 format.
-   `providedBy` is an example recommendation within the NGSI-LD specification.

### Subclassing

As well as extending models by adding new attributes, it is also posssible to extend models by subclassing. Looking at
the **Device** model, it can be seen that whereas common definitions useful to all IoT device such as `batteryLevel` are
defined in the model, there are no additional attributes within the model explaining which readings are being made.

It would be possible to continue to use the **Device** model and to add both `temperature` and `fillingLevel`, but it is
highly unlikely that a filling sensor would also provide temperatures and vice-versa. In this case, it is therefore
preferred to create a new subclass so that temperature sensors can be considered a different type of entity to filling
sensors.

## Putting this into action

### Initial Baseline data models

The following models are defined within the Smart Data Models domain.

```yaml
components:
    schemas:
        # This is the base definition of a building
        Building:
            $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/building.yaml#/Building"
        # This is all of the defined building categories within
        # within the Smart Cities and Smart AgriFood domain
        BuildingCategory:
            $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/building.yaml#/Categories"

        # This is a base definition of an IoT Device
        Device:
            $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/device.yaml#/Device"
        # This is the full list of IoT Device Categories
        DeviceCategory:
            $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/Categories"
        # This is a full list of context attributes measurable by devices
        ControlledProperties:
            $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/ControlledProperties"

        # This is an NGSI-LD defintion of a person.
        # Since the schema.org Person ig JSON-LD,
        # additional type and id attreibutes are require
        Person:
            allOf:
                - $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/ngsi-ld.yaml#/Common"
                - $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/schema.org.yaml#/Person"
```

![](https://fiware.github.io/tutorials.Understanding-At-Context/img/baseline.png)

The baseline Data Model can be inspected
[here](https://swagger.lab.fiware.org/?url=https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/baseline.yaml)
[Source](https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/updated.yaml)

### Updated Data models

1. **Building** must be updated to accommodate `temperature` and `fillingLevel`. Both of these properties have been
   defined within SAREF terms.

```yaml
Building:
    allOf:
        - $ref: "https://fiware.github.io/tutorials.NGSI-LD/models/building.yaml#/Building"

    properties:
        temperature:
            $ref: https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/temperature
        fillingLevel:
            $ref: https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/fillingLevel
```

2.  The list of defined building categories can be reduced to items found within the Agricultural domain (e.g. `barn`,
    `cowshed`, `farm`, `farm_auxiliary`, `greenhouse`, `riding_hall`, `shed`, `stable`, `sty`, `water_tower`)

3.  The base Device can be removed and replaced with two new models which extend it - `TemperatureSensor` and
    `FillingLevelSensor`. Once again these add additional SAREF terms to the base `Device` class.

```yaml
TemperatureSensor:
    type: object
    required:
        - temperature
    allOf:
        - $ref: https://fiware.github.io/tutorials.NGSI-LD/models/device.yaml#/Device
    properties:
        temperature:
            $ref: https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/temperature
```

```yaml
FillingLevelSensor:
    type: object
    required:
        - FillingLevelSensor
    allOf:
        - $ref: https://fiware.github.io/tutorials.NGSI-LD/models/device.yaml#/Device
    properties:
        fillingLevel:
            $ref: https://fiware.github.io/tutorials.NGSI-LD/models/saref-terms.yaml#/fillingLevel
```

4. The list of controlled attributes can be reduced to those measured by Agricultural devices (e.g `airPollution`,
   `atmosphericPressure`, `depth`, `eatingActivity`, `fillingLevel`, `humidity`, `location`, `milking`, `motion`,
   `movementActivity`, `occupancy`, `precipitation`, `pressure`, `soilMoisture`, `solarRadiation`, `temperature`,
   `waterConsumption`, `weatherConditions`, `weight`, `windDirection`, `windSpeed`)

5. The other definitions remain unchanged.

![](https://fiware.github.io/tutorials.Understanding-At-Context/img/updated.png)

The updated Data Models for an Agricultural Smart System can be inspected
[here](https://swagger.lab.fiware.org/?url=https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/updated.yaml)
[Source](https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/updated.yaml)

## Generating Context Files

Every working linked data system relies on `@context` files to supply the relevant information about the data. Creating
such files by hand is a tedious and error prone procedure, so it makes sense to automate the process. The required
structure will depend on the operations involved.

This tutorial will take the Agricultural Smart System data model file `updated.yaml` and autogenerate alternatives for
use by other agents.

> A deeper understanding can be obtained byrun this tutorial with a more advanced example, the equivalent
> [Data Models](https://swagger.lab.fiware.org/?url=https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/updated.yaml)
> from the [Supermarket Scenario](https://fiware.github.io/tutorials.Step-by-Step/schema/en/) have also been added to
> this tutorial. The raw `supermarket.yaml` file is available
> [here](https://raw.githubusercontent.com/FIWARE/tutorials.Understanding-At-Context/master/updated.yaml)

# Start Up

In order to initialize the generator tool run:

```console
./services create
```

### Validating a Swagger Data Models

It is necessary to check that the model is valid before processing, this can be done by viewing it online or by using a
simple validator tool.

```console
./services validate [file]
```

#### Terminal - Result:

```text
The API is valid
```

The underlying file(s) are a valid [Swagger definition](https://swagger.io/docs/specification/about/) which ensures that
the tool can be used to extract attributes and enumerations as necessary.

### Generating an NGSI-LD `@context` file

The NGSI-LD `@context` needs to hold defined URIs for the following:

-   The defined entity `types` within the system
-   The names of all the attributes from within the defined Data Models
-   The names of all the metadata attribute from within the Data Models
-   The enumerated values of any constants used within the Data Models.

An NGSI-LD

```console
./services ngsi [file]
```

#### Terminal - Result:

```text
datamodels.context-ngsi.jsonld created
```

Opening the generated file, the following structure can be found:

```jsonld
{
    "@context": {
        "type": "@type",
        "id": "@id",
        "ngsi-ld": "https://uri.etsi.org/ngsi-ld/",
        "fiware": "https://uri.fiware.org/ns/data-models#",
        "schema": "https://schema.org/",
 ...etc
        "Building": "fiware:Building",
        "FillingLevelSensor": "fiware:FillingLevelSensor",
        "Person": "fiware:Person",
        "TemperatureSensor": "fiware:TemperatureSensor",
 ... etc
        "actuator": "https://w3id.org/saref#actuator",
        "additionalName": "schema:additionalName",
        "address": "schema:address",
        "airPollution": "https://w3id.org/saref#airPollution",
        "atmosphericPressure": "https://w3id.org/saref#atmosphericPressure",
        "barn": "https://wiki.openstreetmap.org/wiki/Tag:building%3Dbarn",
        "batteryLevel": "fiware:batteryLevel",
        "category": "fiware:category",
        "configuration": "fiware:configuration",
        "conservatory": "https://wiki.openstreetmap.org/wiki/Tag:building%3Dconservatory",
        "containedInPlace": "fiware:containedInPlace",
        "controlledAsset": "fiware:controlledAsset",
        "controlledProperty": "fiware:controlledProperty",
        "cowshed": "https://wiki.openstreetmap.org/wiki/Tag:building%3Dcowshed",
...etc
    }
}
```

The resultant `@context` file is a valid [JSON-LD](https://w3c.github.io/json-ld-syntax/) Context file usable by NGSI-LD
applications. The file is structured into three parts:

-   A list of standard terms and abbreviations - this avoids the necessity of repeating URIs and reduced the overall
    size of the file
-   A series of defined entity types (e.g. `Building`). These usually start with a capital letter.
-   A list of attributes (e.g. `address`) and enumerations (e.g. `barn`)

Effectively this NGSI-LD `@context` can be combined with a copy of the NGSI-LD core context
[https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld](https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld)
to mechanically define the following:

If a computer encounters an entity of `type=Building` this really refers to a
`https://uri.fiware.org/ns/data-models#Building`

From the definition of a **Building** we know it has a mandatory `category` and `address`.

If a computer encounters an `address` attribute, this really refers to a `https://schema.org/address` (which in turn has
well defined subattrributes)

If a computer encounters a `category=barn` then it should be possible to accertain that this `category` can be
identified as a `https://wiki.openstreetmap.org/wiki/Tag:building%3Dbarn`. Note that `category` itself is also well
defined.

NGSI-LD `@context`s are used for all NGSI-LD CRUD operations, and are required when sending or receiving NGSI-LD data in
the default _normalized_ format. The _normalized_ format includes a structure of attributes each with its own `type` and
`value`

For example this is a `Building` in _normalized_ NGSI-LD format:

```jsonld
{
    "id": "urn:ngsi-ld:Building:001",
    "type": "Building",
    "category": {
        "type": "Property",
        "value": "barn"
    },
    "address": {
        "type": "Property",
        "value": {
            "streetAddress": "Großer Stern",
            "addressRegion": "Berlin",
            "addressLocality": "Tiergarten",
            "postalCode": "10557"
        }
    },
    "location": {
        "type": "GeoProperty",
        "value": {
             "type": "Point",
             "coordinates": [13.35, 2.5144]
        }
    },
    "name": {
        "type": "Property",
        "value": "Siegessäule Barn"
    },
    "@context": [
        "https://example.com/data-models.context-ngsild.jsonld",
        "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld"
    ]
}
```

The core context file defines the base structure of the NGSI-LD API payload (things like `type`, `value` and GeoJSON
`Point`) whereas the _generated_ NGSI-LD context for the application itself defines the entities (`Building`) and
`attributes` without defining a payloaf structure.

### Generating a JSON-LD `@context` file

```console
./services jsonld [file]
```

## License

[MIT](LICENSE) © 2019-2020 FIWARE Foundation e.V.
