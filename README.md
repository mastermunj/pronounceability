# Pronounceability

## Introduction

Library for calculating pronounceability score for a word. The higher the score, the more pronounceable the word.

## Installation

```sh
npm install pronounceability --save
```

## Usage

```ts
const { Pronounceable } = require('pronounceability');
```
OR
```ts
import { Pronounceable } from 'pronounceability';
```

## Calculate the score
```ts
const pronounceable = new Pronounceable();
pronounceable.score('Smart'); // 0.038513178036421514

pronounceable.score('Google'); // 0.011301759838274162

```

## Inspiration
[https://github.com/lukem512/pronounceable](https://github.com/lukem512/pronounceable)

## Trained using
[https://github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
