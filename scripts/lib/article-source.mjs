import ts from "typescript";

// Follow the array's wrappers/receiver, never arrays in method arguments or callbacks.
const unwrapArray = (expression) => {
  while (expression) {
    if (ts.isArrayLiteralExpression(expression)) return expression;
    if (ts.isParenthesizedExpression(expression) || ts.isSatisfiesExpression(expression)
      || ts.isAsExpression(expression) || ts.isTypeAssertionExpression(expression)
      || ts.isNonNullExpression(expression)) {
      expression = expression.expression;
    } else if (ts.isCallExpression(expression)
      && (ts.isPropertyAccessExpression(expression.expression) || ts.isElementAccessExpression(expression.expression))) {
      expression = expression.expression.expression;
    } else {
      return undefined;
    }
  }
  return undefined;
};

export const addArticleEntries = (source, { importLines, fa, en }) => {
  const file = ts.createSourceFile("articles.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (file.parseDiagnostics.length) {
    throw new Error("ساختار TypeScript فایل articles.ts معتبر نیست؛ هیچ تغییری انجام نشد.");
  }
  const edits = [];
  for (const [name, code] of [["articles", fa], ["articlesEn", en]]) {
    const declarations = file.statements
      .filter((statement) => ts.isVariableStatement(statement)
        && statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword))
      .flatMap((statement) => [...statement.declarationList.declarations])
      .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name);
    const array = declarations.length === 1 ? unwrapArray(declarations[0].initializer) : undefined;
    if (!array) {
      throw new Error(`آرایهٔ قابل ویرایش «${name}» در articles.ts پیدا نشد؛ هیچ تغییری انجام نشد.`);
    }
    const last = array.elements.at(-1);
    // Insert the comma before trailing comments, keeping every existing source byte.
    if (last && !array.elements.hasTrailingComma) edits.push({ at: last.end, text: "," });
    edits.push({ at: array.end - 1, text: `\n${code}\n` });
  }

  const lastImport = file.statements.filter(ts.isImportDeclaration).at(-1);
  const importPosition = lastImport
    ? (ts.getTrailingCommentRanges(source, lastImport.end)?.at(-1)?.end ?? lastImport.end)
    : (file.statements[0]?.getStart(file) ?? source.length);
  edits.push({ at: importPosition, text: `\n${importLines}\n` });
  // Positions refer to the original source; edit backwards without printing/reformatting it.
  return edits.sort((a, b) => b.at - a.at)
    .reduce((next, edit) => next.slice(0, edit.at) + edit.text + next.slice(edit.at), source);
};
