"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const getWordAtPosition = (editor) => {
    const wordRange = editor.document.getWordRangeAtPosition(editor.selection.start);
    if (!wordRange)
        return;
    return editor.document.getText(wordRange);
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vanjs-importtag" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('vanjs-importtag.import', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const word = getWordAtPosition(editor);
        if (!word) {
            vscode.window.showErrorMessage("No symbol at the current point");
            return;
        }
        const doc = editor.document;
        const regex1 = /{(\s*)([\w\s,]*\w)?(\s*)}\s*=\s*van.tags/, regex2 = /tags:\s*{(\s*)([\w\s,]*\w)?(\s*)}/;
        const tmpl1 = "{$TAGS} = van.tags", tmpl2 = "tags: {$TAGS}";
        let matches = null;
        for (let i = 0; !matches && i < doc.lineCount; ++i) {
            const { text } = doc.lineAt(i);
            matches = text.match(regex1);
            let tmpl;
            if (matches) {
                tmpl = tmpl1;
            }
            else {
                matches = text.match(regex2);
                if (matches)
                    tmpl = tmpl2;
            }
            if (!matches)
                continue;
            const [prefix, suffix] = matches[2] ? [matches[1], matches[3]] : [" ", " "];
            const start = matches.index, end = matches.index + matches[0].length;
            const tags = matches[2] ? matches[2].split(/\s*,\s*/) : [];
            editor.edit(editorBuilder => editorBuilder.replace(new vscode.Range(new vscode.Position(i, start), new vscode.Position(i, end)), tmpl.replace("$TAGS", prefix + [...new Set([...tags, word])].sort().join(", ") + suffix)));
        }
        if (!matches)
            vscode.window.showErrorMessage("No tag import line found.");
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map