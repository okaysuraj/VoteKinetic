const fs = require('fs');
const path = require('path');

const webSkillsText = fs.readFileSync('web_skills.txt', 'utf8').split('\n').map(l => l.trim()).filter(Boolean);

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(file);
  });
  return filelist;
}

const existingWebScreens = walkSync('frontend/src/pages').filter(f => f.endsWith('.tsx')).map(f => f.replace('.tsx', ''));

const snakeToPascal = (str) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
};

const missingWeb = [];
for (const skill of webSkillsText) {
  let expectedName = snakeToPascal(skill.replace('_desktop', ''));
  if (!existingWebScreens.includes(expectedName) && !existingWebScreens.includes(expectedName.replace('Screen', ''))) {
    missingWeb.push(expectedName);
  }
}

console.log('Missing Web Screens:', missingWeb.length);
missingWeb.forEach(m => console.log(`- ${m}`));
