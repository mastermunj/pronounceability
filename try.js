const { Pronounceable } = require('./dist/index');
// const words = require('an-array-of-english-words');
// const fs = require('fs');

const pronounceable = new Pronounceable();
// const tuples = pronounceable.trainTuples(words);
// fs.writeFileSync('./src/data/tuples.json', JSON.stringify(tuples));

// const triples = pronounceable.trainTriples(words);
// fs.writeFileSync('./src/data/triples.json', JSON.stringify(triples));

// console.log(pronounceable.trainTuples(words));

async function test() {
  // const words = ['peonies', 'sshh'];
  // const words = ['hello', 'electraluxe', 'electrastic', 'ElectraBlast', 'GraphConsulting', 'PathfinderGroup'];
  const words = [
    'Smart',
    'smart',
    'SmarX',
    'Churro',
    'TechTok',
    'Gadgopia',
    'Namergize',
    'Google',
    'Amazon',
    'Flipkart',
    'ElectraNyx',
    'ElectraLuxe',
    'ElectraOptic',
    'ElectraScepter',
    'ElementalElectronics',
    'ServiceConsultService',
    'ServiceConsultSolutions',
    'SolutionSolveServeServeServe',
    'SolutionProServeSolutionServe',
    'ServeSupportSolutionServeServe',
    'in',
  ];
  for (const word of words) {
    console.log({ word, score: pronounceable.score(word) });
  }
}

test();
