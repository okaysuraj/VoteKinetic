const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/Suraj/Code/VoteKinetic/mobile/src/screens';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    if (content.includes('\\`')) {
      content = content.replace(/\\`/g, '`');
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed backticks in', file);
    }
  }
}
