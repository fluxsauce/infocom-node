# Infocom Game Information Server

A simple [Node.js](https://nodejs.org/) server that provides information about
Infocom games released between 1980 and 1989.

## Installation

Install [Node Version Manager](https://github.com/creationix/nvm) if it isn't
already available.

```bash
nvm install
# Show the installed version; should be the latest LTS.
node --version
```

Install dependencies.

```bash
npm install
```

## Development

### Linting

The IGIS uses [ESLint](http://eslint.org/) and [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
for linting the JavaScript in the project.

```bash
npm run eslint
```
