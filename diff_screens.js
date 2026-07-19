const fs = require('fs');

const skillsText = fs.readFileSync('mobile_skills.txt', 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
const existingScreens = fs.readdirSync('mobile/src/screens').filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', ''));

const snakeToPascal = (str) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') + 'Screen';
};

const missing = [];
for (const skill of skillsText) {
  let expectedName = snakeToPascal(skill.replace('_mobile', ''));
  if (!existingScreens.includes(expectedName) && !existingScreens.includes(expectedName.replace('Screen', ''))) {
    missing.push({ skill, expectedName });
  }
}

console.log('Missing Mobile Screens:', missing.length);
missing.forEach(m => console.log(`- ${m.skill} -> ${m.expectedName}`));
