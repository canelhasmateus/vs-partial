
async function navigateCursor (a: any) {

    let args = validateArguments(a);
    let editor = Editor.get();

    if (args === undefined || args === null) {
        return;
    }
    if (editor === undefined || editor === null) {
        return;
    }

    let ranges = editor.visibleRanges[ 0 ];
    let jumpSize = JumpSize.of(ranges, args.ratio);
    let direction = Direction.of(jumpSize);
    let selection = args.select;
    await vscode.commands.executeCommand("cursorMove", movement(direction, Math.abs(jumpSize), selection));

}

export const Command = {
    name: COMMAND_NAME,
    command: navigateCursor
}