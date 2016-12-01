electron-cli
==============================================================================

[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-cli.svg
[npm-badge-url]: https://www.npmjs.com/package/electron-cli

An [electron](http://electron.atom.io/) command line utility.

[Repo](https://github.com/Ikana/electron-cli)

Features
------------------------------------------------------------------------------

* [done] Create new project
* [done] Get useful electron info such as(version numbers of Chromium, Node.js , and electron-cli)
* [done] Run the electron app on the current directory either with the locally installed electron or the global one
* [done] Pack the application for distribution
* [wip] Build native node modules

Installation
------------------------------------------------------------------------------

```
npm install -g electron-cli
```

Usage
------------------------------------------------------------------------------

After installation the `electron` CLI tool will be available to you. It is the
entrypoint for all the functionality marked as done above.

### Create a new project

```
electron-cli init my-new-app
```

This will create a new folder `my-new-app`, initialize a Git project in it and
adds the basic electron quick start project.

### Get Info of current installed electron

```
electron-cli stats
```
This will print the versions of the current installed electron instance

### Start electron application

```
electron-cli start --global
```
This will run the electron application on the current directory if you provide the
global flag it will run the application with the globally installed electron instance.

### Pack electron application

```
electron-cli pack
```

This will pack the application on the current directory with `electron-packager`
