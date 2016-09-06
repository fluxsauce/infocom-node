# Infocom Game Information Server

A simple [Node.js](https://nodejs.org/) server that provides information about
Infocom games released between 1980 and 1989.

## Usage

* http://localhost:8080/difficulties - list all available genres.
* http://localhost:8080/difficulties/4 - return metadata about Introductory.
* http://localhost:8080/genres - list all available genres.
* http://localhost:8080/genres/9 - return metadata about Horror.
* http://localhost:8080/games - list all available games.
* http://localhost:8080/games?limit=5 - list first 5 available games.
* http://localhost:8080/games/26 - return metadata about Planetfall.
* http://localhost:8080/games/fail - return an error.

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

To run the server in debugging mode:

```bash
DEBUG=* ./node_modules/.bin/nodemon .
```

### Linting

The IGIS uses [ESLint](http://eslint.org/) and [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
for linting the JavaScript in the project.

```bash
npm run eslint
```

## Data

Game metadata was scraped from [infocom-if.org](http://www.infocom-if.org/)
using [import.io](https://www.import.io/). All games, game titles and cover
artworks, mentioned and shown, parts of game descriptions and photographs and
the Infocom logo are &copy; and &trade; by Infocom, Inc. and subsequently &copy;
and &trade; by Activision, Inc.
