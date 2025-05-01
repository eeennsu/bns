import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 URL을 가져와서 __dirname을 설정
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// schema 파일이 있는 디렉토리 경로
const schemasDir = path.join(__dirname, '../schemas');

// schema의 파일 경로를 정의한 string 배열 생성
const generateSchemaFiles = (): string[] => {
  const schemaFiles: string[] = [];

  try {
    fs.readdirSync(schemasDir).forEach(file => {
      // 파일이 .ts 확장자를 가지고 있으면
      if (file.endsWith('.ts')) {
        // 상대경로로 파일 경로를 추가
        schemaFiles.push(`'./src/db/schemas/${file}'`);
      }
    });
  } catch (error) {
    console.error('Error reading schema directory:', error);
    process.exit(1);
  }

  return schemaFiles;
};

const schemaFiles = generateSchemaFiles();

// 파일로 출력
const outputPath = path.join(__dirname, '../consts/schemaFiles.ts');
const outputContent = `
export const schemaFiles = [
  ${schemaFiles.join(',\n  ')}
];
`;

fs.writeFileSync(outputPath, outputContent, 'utf-8');
console.log(`Schema files have been written to ${outputPath}`);
