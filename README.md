# Why another webpack boilerplate project?

The goal for this project is to share examples of techniques I discovered
during my research in order to set up webpack with supporting features that
I need for my projects.

During the research, I found many feature-rich, well-written boilerplates [add references].
The issue was that many of them are opinionated and are quite hard for
beginners to learn and progress their learnings from.

I am not an expert and there are a lot about webpack that I don't understand
but I hope this could shed some ideas to someone stuck with the same problems
that I did. This project is not intended to be used as a boilerplate, and
I strongly suggest to read and understand how it works rather than copy and
paste to your projects.

# Philosophy

## KISS webpack configs

It is the design decision to write out webpack configs and minimize logics
involve in preparing the configs for different environments. We have one-to-one
relationship between types of builds and webpack config files.

The decision was made in order to keep the complexity low. When someone new
to this project reads the configs, they do not need to understand
special logics (e.g. conditionals, merges) to prepare the resulting configs.

It is a trade-off because, by doing so, we sacrifice DRY-ness, which could
prevent such scenarios as the setup between environments are slightly
(and subtlely) out-of-sync.

DRY-ness helps with maintainability and is important when the configs changes
often and/or by different developers. As the goal of this project is sharing
knowledge, I decide to keep it easy to understand. In fact, as we have only
a few devs work on each app at my work, we are migrating our configs toward
this more explicit but verbose approach rather than the DRY-er but smarter
setup that we had.
