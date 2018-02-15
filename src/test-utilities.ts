import * as ts from 'typescript';
import * as setting from '../ts-tests/tsconfig.json';

const compileTs = (...fileNames: Array<string>): Array<string> => {
  const options = ts.convertCompilerOptionsFromJson(setting.compilerOptions, '.').options;
  const program = ts.createProgram(fileNames, options);

  const emitResult = program.emit();
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  const allMessages = allDiagnostics
    .map((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      if (diagnostic.file) {
        const { fileName } = diagnostic.file;
        const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

        return `${fileName}/${line + 1},${character + 1} : ${message}`;
      } else {
        return message;
      }
    });

  return allMessages;
}

export {
  compileTs,
};
