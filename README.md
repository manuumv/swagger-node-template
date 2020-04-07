# Swagger

## Config
This is the config for initialize the swagger server with the ui and load the swagger.json generated

## Structure
The current version is openapi 3.0.2.

The doc is splitted in different yaml files that generate a json.

```
├── controllers
|   ├── index.ts
├── docs
|   ├── index.yaml
|   └── components
|   |   └── index.yaml
|   |   └── schemas
|   └── info
|   |   └── index.yaml
|   └── paths
|       └── index.yaml
```

every index file has references `$ref: ./**/index.yaml`

components:
```yaml
  # Reusable schemas (data models)
  schemas:
    ...
  # Reusable path, query, header and cookie parameters
  parameters:
    ...
  # Security scheme definitions (see Authentication)
  securitySchemes:
    ...
  # Reusable request bodies
  requestBodies:
    ...
  # Reusable responses, such as 401 Unauthorized or 400 Bad Request
  responses:
    ...
  # Reusable response headers
  headers:
    ...
  # Reusable examples
  examples:
    ...
  # Reusable links
  links:
    ...
  # Reusable callbacks
  callbacks:
    ...
```

info
```yaml
  # You application title. Required.
  title: Sample Pet Store App

  # API version. You can use semantic versioning like 1.0.0,
  # or an arbitrary string like 0.99-beta. Required.
  version: 1.0.0

  # API description. Arbitrary text in CommonMark or HTML.
  description: This is a sample server for a pet store.

  # Link to the page that describes the terms of service.
  # Must be in the URL format.
  termsOfService: http://example.com/terms/

  # Contact information: name, email, URL.
  contact:
    name: API Support
    email: support@example.com
    url: http://example.com/support

  # Name of the license and a URL to the license description.
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html

  # Link to the external documentation (if any).
  # Code or documentation generation tools can use description as the text of the link.
  externalDocs:
    description: Find out more
    url: http://example.com
```

paths:

```yaml
paths:
 # Endpoint
  /healthStatus:
    summary: status server
    description: status server
    get:
      ...
    put:
      ...
    delete:
      ...
```


## References

To make our doc more readable we split it in different files and reference them, for example:

We have this structure:
```
├── controllers
|   ├── index.ts
├── docs
|   ├── index.yaml
|   └── components
|   |   └── index.yaml
|   |   └── schemas
|   |     └── index.yaml
|   |     └── HealthStatus.yaml
|   └── info
|   |   └── index.yaml
|   └── paths
|       └── index.yaml
|       └── healthStatus
|         └── get.yaml
```

We define our reusable data models:

docs/components/schemas/index.yaml:
```yaml
HealthStatus:
  $ref: ./HealthStatus.yaml
```

docs/components/schemas/HealthStatus.yaml:
```yaml
type: object
properties:
  status:
    type: string
    description: server status
    example: up
required:
  - status
```

docs/paths/index.yaml:
```yaml
/status/:
  get:
    $ref: ./healthStatus/get.yaml
```

docs/paths/healtStatus/get.yaml
```yaml
description: Returns the health status
summary: Get the health status
operationId: getHealthStatus
responses:
  200:
    description: OK
    content:
          application/json:
            schema:
              $ref: '#/components/schemas/HealthStatus'
  500:
    description: Internal server error
tags:
  - HealthStatus

```

## Mock responses

To mock the responses when we try it out is very important that **operationId** is equal to the **function name** defined in controllers.

We have this structure:
```
├── controllers
|   ├── health
|   |   └── index.ts
|   |   └── healthStatus.ts
|   ├── index.ts
├── docs
|   ├── index.yaml
|   └── components
|   |   └── index.yaml
|   |   └── schemas
|   |     └── index.yaml
|   |     └── HealthStatus.yaml
|   └── info
|   |   └── index.yaml
|   └── paths
|       └── index.yaml
|       └── healtStatus
|         └── get.yaml
```

> **IMPORTANT**: Export each function in the index file because we will do a barrel import from /controllers to generate the mock callbacks.

paths/healthStatus/get.yaml:
```yaml
description: Returns the health status
summary: Get the health status
operationId: getHealthStatus
responses:
  200:
    description: OK
    content:
          application/json:
            schema:
              $ref: '#/components/schemas/HealthStatus'
  500:
    description: Internal server error
tags:
  - HealthStatus
```

controllers/health/healthStatus.ts
```ts
export const getHealthStatus = (_: Request, res: Response) => {
  res.status(200).json({ status: 'up' });
};

```

