# clojurescript-sandbox

This is my playground for playing with shadow-cljs, clojurescript nrepl,
reagent, reframe and other cool stuff.

## Install

Install `shadow-cljs` and npm deps for the project.

```
yarn global add shadow-cljs
npx shadow-cljs npm-deps
```

## Running

Start shadow-cljs watch process:

```
npx shadow-cljs watch app
```

Connecting vim-fireplace repl is kinda quirky for now, this instructions
are based on [this comment @ tpope/vim-fireplace #322](https://github.com/tpope/vim-fireplace/issues/322#issuecomment-417461929):

1. Connect to the nREPL server :Connect (nrepl port is set to `4444`)
1. Upgrade REPL to a CLJS REPL :Piggieback :app (converts the clojure repl to a clojurescript repl)
1. Open web page in a web browser (or any other trick which jits the clojurescript into the app)
1. At this point calls to Eval will work

### `Build failure: The required namespace "cljs.user" is not available.`

This is error that pops up after evaluating any code in vim-fireplace and it persistes
for the shadow-cljs seseion until restarted, rendering shadow-cljs+fireplace combo
unusable for time being, see: https://github.com/thheller/shadow-cljs/issues/667
