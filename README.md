![Project Webpack Version](https://img.shields.io/badge/webpack-2.6.1-blue.svg)

## Features

- [x] Webpack 2
- [x] CSS Modules and Postcss Support
- [x] Extract CSS in production build
- [x] Flow support
- [x] Express Dev Server with react-hot-middleware
- [x] Hot Module Replacement (HMR)
- [x] Hot Reload React Components
- [x] Vendor Chunk Splitting with CommonsChunkPlugin
- [x] Dynamic import components
- [x] Avoid using NODE_ENV as environment variable
- [ ] Jest test framework
- [ ] HMR work with dynamic import modules
- [ ] DLL vendor chunks
- [ ] React Router v4

## Why another webpack boilerplate project?

The goal of this project is to share examples of techniques I discovered during my research in order to set up webpack with supporting features that I need for my projects.

During the research, I found many feature-rich, well-written boilerplates [add references] but they tend to be quite complex for beginners to learn and progress their learnings from. This project is not intended to be used as a boilerplate, and I strongly suggest to read and understand how it works rather than to copy and paste the configurations to your projects.

I am not an expert in webpack. There is a lot about webpack that I don't understand but I hope this can help others find solutions of the same problems that I had.

I also hope that this could be a place for me to collaborate and exchange knowledge with other engineers in regards to webpack setup for React apps.

## Philosophy

**Easy to understand**

It is the design decision to write out webpack configs and minimize logics involved in preparing the configs for different environments. We have a one-to-one relationship between types of builds and webpack config files.

The decision was made in order to keep the complexity low. When someone new to this project reads the configs, they do not need to understand special logics (e.g. conditionals, merges) to prepare the resulting configs.

It is a trade-off because, by doing so, we sacrifice DRY-ness, which could prevent such scenarios as the setup between environments are slightly (and subtlely) out-of-sync.

DRY-ness helps with maintainability and is important when the configs changes often and/or by different developers. As the goal of this project is sharing knowledge, I decided to keep it easy to understand. In fact, as we have only a few devs working on each app at my work, we are migrating our configs toward this more explicit but verbose approach rather than the DRY-er but smarter setup that we had.
