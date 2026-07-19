const fs = require('fs');

const skills = fs.readdirSync('skills/votekinetic-mobile-ui');
const existingScreens = fs.readdirSync('mobile/src/screens').filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', ''));

const snakeToPascal = (str) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') + 'Screen';
};

const missing = [];
for (const skill of skills) {
  let expectedName = snakeToPascal(skill.replace('_mobile', ''));
  if (!existingScreens.includes(expectedName) && !existingScreens.includes(expectedName.replace('Screen', ''))) {
    missing.push(expectedName);
  }
}

console.log('Missing Mobile Screens:', missing.length);
missing.forEach(m => console.log(`- ${m}`));
