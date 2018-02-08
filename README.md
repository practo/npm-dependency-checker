# NPM Dependency Checker
A package that does analysis on dependecies to figure out,
- **Unused Dependencies**: Declared in the package.json file, but not used in any file.
- **Unused Dev Dependencies**: Declared in the package.json file, but not used in any file.
- **Missing Dependencies**: Used somewhere in the code, but not declared in package.json file.

### Install:
```
npm i --g npm-dependency-checker
```

### Usage

Run this command
```
ndc <application_root_path>
```

The `application_root_path` is a mandatory argument. It should be the same path where `package.json` is. ndc supports relative paths as well, e.g., `ndc .` to run ndc in current folder.

### Configuration
This package is based on another pacakge [depcheck](https://www.npmjs.com/package/depcheck), and supports all configuration that depcheck supports. The json configuration needs to be present in a file named `.ndcrc` in the application root.

```
my-awesome-application
|-- ...
|-- .ndcrc
|-- package.json
```

### Integration with Travis
Modify the `travis.yml` file accordingly,
```
travis.yml

before_install:
  - ...
  - npm install --progress=false -g npm-dependency-checker

install:
  - ...
  - ndc .
```
