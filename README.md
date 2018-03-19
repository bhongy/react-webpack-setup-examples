![Project Webpack Version](https://img.shields.io/badge/webpack-4.1.1-blue.svg)

## Features

- [x] Webpack 4
- [x] CSS Modules and Postcss Support
- [x] Extract CSS in production build
- [x] Output to folders by file types (css, js, images)
- [ ] Express Dev Server with react-hot-middleware
- [ ] Hot Module Replacement (HMR)
- [ ] Hot Reload React Components
- [x] Vendor/Common Chunk Splitting with `optimization.splitChunks`
- [x] Dynamic import components
- [ ] HMR work with dynamic import modules
- [x] Avoid using NODE_ENV as environment variable
- [x] Flow support
- [x] Jest test framework
- [ ] DLL vendor chunks
- [ ] React Router v4
- [ ] Write build layer (Webpack) in Typescript

## Webpack 4 Update

Check out `config/webpack.js` for the Webpack 4 configuration with CSS extraction and optimization.

Designed to work with 3 build types:
- `yarn start`: dev-server using development build and watch mode
- `yarn build:dev`: debug build - this generally is deployed for integration tests
- `yarn build:prod`: production build (optimized, minified)

## Why another webpack boilerplate project?

The goal of this project is to share examples of techniques I discovered during my research in order to set up webpack with supporting features that I need for my projects.

During the research, I found many feature-rich, well-written boilerplates [add references] but they tend to be quite complex for beginners to learn and progress their learnings from. This project is not intended to be used as a boilerplate, and I strongly suggest to read and understand how it works rather than to copy and paste the configurations to your projects.

I am not an expert in webpack. There is a lot about webpack that I don't understand but I hope this can help others find solutions of the same problems that I had.

I also hope that this could be a place for me to collaborate and exchange knowledge with other engineers in regards to webpack setup for React apps.
