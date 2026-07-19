const fs = require('fs');
const path = require('path');
const appTsx = fs.readFileSync('mobile/App.tsx', 'utf8');
const imports = appTsx.match(/import \{ .* \} from '\.\/src\/screens\/.*';/g);
imports.forEach(imp => {
  const match = imp.match(/import \{ (.*) \} from '\.\/src\/screens\/(.*)'/);
  if (match) {
    const screenName = match[1].trim();
    const fileName = match[2].trim() + '.tsx';
    const filePath = path.join('mobile/src/screens', fileName);
    if (!fs.existsSync(filePath)) {
      const content = `import React from 'react';\nimport { View, Text } from 'react-native';\n\nexport const ${screenName} = (props: any) => {\n  return (\n    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>\n      <Text>${screenName}</Text>\n    </View>\n  );\n};\n`;
      fs.writeFileSync(filePath, content);
      console.log('Stubbed', fileName);
    }
  }
});
