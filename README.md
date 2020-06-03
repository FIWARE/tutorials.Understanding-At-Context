[![FIWARE Banner](https://fiware.github.io/tutorials.Understanding-At-Context/img/fiware.png)](https://www.fiware.org/developers)

[![FIWARE Core Context Management](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/core.svg)](https://github.com/FIWARE/catalogue/blob/master/core/README.md)
[![License: MIT](https://img.shields.io/github/license/fiware/tutorials.Understanding-At-Context.svg)](https://opensource.org/licenses/MIT)
[![Support badge](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/fiware.svg)](https://stackoverflow.com/questions/tagged/fiware)
[![NGSI LD](https://img.shields.io/badge/NGSI-LD-d6604d.svg)](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.01.01_60/gs_CIM009v010101p.pdf)
[![JSON LD](https://img.shields.io/badge/JSON--LD-1.1-f06f38.svg)](https://w3c.github.io/json-ld-syntax/) <br/>
[![Documentation](https://img.shields.io/readthedocs/ngsi-ld-tutorials.svg)](https://ngsi-ld-tutorials.rtfd.io)

This tutorial introduces basics of common Linked Data concepts and Data Models for **NGSI-LD** developers. The aim is to design and create a simple interoperable Smart Agricultural Solution from scratch and explain how to apply these concepts to your own smart solutions.

Unlike the previous [tutorials series](http://fiware-tutorials.rtfd.io/), this series will take an **NGSI-LD** first approach and therefore starts with reiterating the fundamentals of Linked Data and its application to the **NGSI-LD** interface.

The tutorial is mainly concerned with online and command-line tooling, although some commands will also use cUrl and are available as Postman documentation


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
data itself. Futhermore the use and creation of thesse unique IDs should, as far as possible, be passed around so as not get in the way of the processing the data objects themselves.

An attempt to solve this interoperablity problem has been made within the JSON domain, and this has been done by adding an `@context` element to existing JSON data structures. This has led to the creation of the **JSON-LD** standard.

The main takeaway from **JSON-LD**, is that a remote context file and the **JSON-LD** `@context` definition can
be used to assign unique long URNs for every defined attribute. Developers are then  free to use their own regular short attribute names within their own applications, but though the application of Expansion and Compaction operations

To promote interoperability, the **NGSI-LD** API is defined using the concepts of **JSON-LD** and therefore a thorough knowledge of  **JSON-LD** `@context`  is fundamental to the use **NGSI-LD**.




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

Within the FIWARE platform, every entity represents the state of a physical or conceptural object. Each entity provides the digital twin of an object which exists in the real world.

Although the each data entity within your context will vary according to your use case, the common structure within each data entity should be standardized order to promote reuse. The Fundamentals for FIWARE Data Model design do not change. Typically each entiy will consist of an **id**, a **type**, a series of **Property** atttributes representing context data which changes over time and a series of  **Relationship** atttributes which represent connections between existing entities.

It is perhaps best to illustrate this using an example. The Underlying Data Models can be created using many different tools, however this example will use Swagger [schema](https://swagger.io/docs/specification/data-models/) objects defined using the [Open API 3](https://swagger.io/docs/specification/about/) Standard. The examples are valid Swagger specifications, but in reality, we are not interested in defining in paths and operations, as these are already defined using the [NGSI-LD API](https://swagger.lab.fiware.org/?url=https://fiware.github.io/tutorials.NGSI-LD/swagger/ngsi-ld.yaml)

Consider the following Smart Agricultural Scenario:

> _Imagine a farmer owns a barn. The barn contains two IoT devices - a temperature sensor and a filling level sensor indicating how much hay is currently stored in the barn_
>

This example can be split down into the following Entities:

-  **Building**: The barn
-  **Person**:  The farmer
-  **IoT Devices**:
    - Temperature Senor
    - Filling Level Sensor







## License

[MIT](LICENSE) © 2019-2020 FIWARE Foundation e.V.
