#OLCS Static
###Synopsis
This repo contains the styleguides, prototypes and static assets for both the OLCS internal application and external service.

To view the compiled end result, visit [http://olcs.github.io/olcs-static/](http://olcs.github.io/olcs-static/).

### Change History 
Updated for the OLCS Private Beta. For a detailed change log, see the file named [CHANGELOG.md](./CHANGELOG.md). 

### Known Issues 
There are no known issues with the OLCS Static HTML.

### Contributors 
If you would like to send a bug report or contact us regarding any code-related queries please create an issue within the GitHub project. Valid reports and queries will receive responses within 60 days.

### License 
Copyright (c) 2016 HM Government (Driver and Vehicle Standards Agency) 
Free software published under an MIT License - please see the file named [LICENSE.txt](./LICENSE.txt). 

### Acknowledgements 
The following people created OLCS Static 
* Edmund Reed
* Sam Quayle
* Nick Payne

### Requirements

* [Sass](http://sass-lang.com/) >= 3.3.x (`gem install sass`)
* [Node.js](https://nodejs.org/en/) v0.10.x (Use [Node Version Manager](https://github.com/creationix/nvm) to run old versions)
* [Grunt](http://gruntjs.com/) (`npm install -g grunt-cli`)

### Installation

##### Clone the repo:

```
git clone https://github.com/OLCS/olcs-static.git
```

##### Install node modules:

```
npm install
```

##### Compile assets:

```
grunt compile:dev
```

If running this task complains about libsass bindings (i.e. "The `libsass` binding was not found"), it likely means you are running an unsupported Node version for this app. To rectify, install [Node Version Manager](https://github.com/creationix/nvm/) and run:

```
nvm install 0.10.33
```

This will install the correct Node version supported by this app. Now you can run `nvm use` inside your project to switch to this version (v0.10.33).

### Usage

To view the compiled assets as well as continuously compile the assets as files are changed, you can run `grunt serve` to compile the assets and styleguides, run the `watch` task, and set up a local server.

Access the compiled styleguides: 

* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/selfserve/)
* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/internal/)

### Developing

#### JavaScript

All JavaScript files are located within the `assets/_js` directory. This directory is further split up into the following directories:

* [components](./tree/develop/assets/_js/components) (custom JS components)
* [init](./tree/develop/assets/_js/init) (initialise custom JS components)
* [vendor](./tree/develop/assets/_js/vendor) (third party JS)

#### Sass/CSS

All custom CSS is compiled from source *Scss* files which can be found in the `assets/_styles` directory. This directory is further split up into the following directories:

* [components](./tree/develop/assets/_styles/components) (custom Sass components)
* [core](./tree/develop/assets/_styles/core) (core Sass components)
* [vendor](./tree/develop/assets/_styles/vendor) (thid party styles)
* [views](./tree/develop/assets/_styles/views) (styles for specific views)

Desired partials are then imported into the appropriate theme to be processed. 

* [internal](./blob/develop/assets/_styles/themes/internal.scss)
* [selfserve](./blob/develop/assets/_styles/themes/selfserve.scss)

### Grunt Tasks

OLCS uses Grunt as the front end build tool, with all configuration being contained within `Gruntfile.js`. There are several pre-defined tasks which can be executed:

##### $ grunt compile

This is a basic task to compile the front end assets. Depending on the `env` argument, which can either be `dev` (default) or `prod`, the compiled assets either will or won't be minified. You can pass the `env` argument when running this task like so:

```
$ grunt compile --env=prod
```

##### $ grunt compile:dev

This runs the `compile` task for a development environment (identical to running `grunt compile --env=dev`).

##### $ grunt compile:prod

This runs the `compile` task for a production environment (identical to running `grunt compile --env=prod`).

##### $ grunt lint

Run JavaScript and Scss code linting tasks.

##### $ grunt serve

Use this task to setup an environment for continuous development, automatically compiling assets on the fly. 

##### $ grunt test

Run JavaSript unit tests.

##### $ grunt test:single

Run a single JavaScript unit test for a specific component: `$ grunt test:single --target=componentName`

### Linting/Unit Testing

*Coming soon*
