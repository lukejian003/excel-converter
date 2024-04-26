const fs = require('fs');
const ExcelJS = require('exceljs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入输入文件的完整路径：', (inputFilePath) => {
  rl.question('请输入输出文件的文件名（不带后缀）：', (outputFileName) => {
    const outputFilePath = path.join(path.dirname(inputFilePath), `${outputFileName}.xlsx`);

    fs.readFile(inputFilePath, 'utf-8', (err, data) => {
      if (err) {
        console.error('无法读取输入文件:', err);
        rl.close();
        return;
      }

      const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');
      worksheet.addRow(['语言', '中文名', '其他名', '夸克链接']); // 表头

      let currentRecord = {
        language: '',
        chineseName: '',
        otherNames: '',
        link: ''
      };

      lines.forEach((line, index) => {
        if (line.startsWith('链接：')) {
          currentRecord.link = line.substring(3).trim();
          worksheet.addRow([currentRecord.language, currentRecord.chineseName, currentRecord.otherNames, currentRecord.link]);
          currentRecord = {
            language: '',
            chineseName: '',
            otherNames: '',
            link: ''
          };
        } else if (line.startsWith('我用夸克网盘分享了')) {
          const matches = line.match(/\[(.*?)\]/g);
          if (matches && matches.length) {
            if (matches[0]) {
              currentRecord.language = matches[0].replace(/\[|\]/g, '') || '';
            }
            if (matches[1]) {
              currentRecord.chineseName = matches[1].replace(/\[|\]/g, '') || '';
            }
            if (matches[2]) {
              currentRecord.otherNames = matches[2].replace(/\[|\]/g, '') || ''; // 如果没有其他名，则写入空值
            }
          }
        }
      });

      workbook.xlsx.writeFile(outputFilePath)
        .then(() => {
          console.log('Excel 文件已生成:', outputFilePath);
          rl.close();
        })
        .catch((error) => {
          console.error('无法写入 Excel 文件:', error);
          rl.close();
        });
    });
  });
});
