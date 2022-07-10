import paper from "paper";

export function getPaper() {
    return paper;
}

export function initPaper(canvasId: string) {
    paper.setup(canvasId);
}
