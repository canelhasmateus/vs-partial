import * as vscode from 'vscode';

type Direction = 'up' | 'down';

namespace Jump {

    export function size (range: vscode.Range, ratio: number): number {

        const hi = range?.start.line;
        const lo = range?.end.line;

        if (hi === undefined || lo === undefined) {
            return 0;
        }

        return Math.round((hi - lo) * ratio);
    }

    export function direction (ratio: number): Direction {
        if (ratio > 0) {
            return "up";
        }
        return "down";
    }

}


class PageArguments {
    public ratio: number;
    public select: boolean;

    static of (arg: any): PageArguments {


        const ratio = Maybe.of(arg)
            .map(el => el.ratio)
            .map(parseFloat)
            .expect("Navigate Cursor should receive a 'ratio' numeric argument.")

        const select = Maybe.of(arg)
            .map(el => el.select)
            .map(parseBool)
            .orElse(false)


        return {
            ratio: ratio,
            select: select
        };

    }
}

class PageCommand {
    public to: Direction;
    public by: String;
    public value: Number;
    public select: Boolean;

    static of (args: PageArgs, visibleRange: vscode.Range): PageCommand {
        return {
            value: Jump.size(visibleRange, args.ratio),
            to: Jump.direction(args.ratio),
            by: 'wrappedLine',
            select: args.select
        }
    }



}

async function navigatePage (a: any) {
    try {
        const args = PageArgument.of(a);
        const ranges = Maybe.of(vscode.window.activeTextEditor)
            .map(editor => editor.visibleRanges[ 0 ])
            .expect("No visible text editor ranges were found.");

    }
    catch (e) {
        vscode.window.showErrorMessage(e.message);
    }

    const command = PageCommand.of(args, ranges)
    await vscode.commands.executeCommand("cursorMove", command);

}

export const VSCodeCommand = {
    name: "partial.navigatePage",
    fn: navigatePage
}