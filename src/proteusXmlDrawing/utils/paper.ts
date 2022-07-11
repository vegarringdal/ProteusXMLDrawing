import paper from "paper";

export function getPaper() {
    return paper;
}

export function initPaper(canvasId: string) {
    paper.setup(canvasId);
    const element = document.getElementById(canvasId);

    // next part is from here:
    // ref:https://codepen.io/hichem147/pen/dExxNK<- thank you...

    // Create a simple drawing tool:
    var tool = new paper.Tool();

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function () {};

    tool.onMouseDrag = function (event: any) {
        var pan_offset = event.point.subtract(event.downPoint);
        paper.view.center = paper.view.center.subtract(pan_offset);
    };

    tool.onMouseUp = function () {};

    element?.addEventListener("mousewheel", function (event: any) {
        const paper = getPaper();
        var newZoom = paper.view.zoom;
        var oldZoom = paper.view.zoom;

        if (event.deltaY < 0) {
            newZoom = paper.view.zoom * 1.05;
        } else {
            newZoom = paper.view.zoom * 0.95;
        }

        var beta = oldZoom / newZoom;

        var mousePosition = new paper.Point(event.offsetX, event.offsetY);

        var viewPosition = paper.view.viewToProject(mousePosition);

        var mpos = viewPosition;
        var ctr = paper.view.center;

        var pc = mpos.subtract(ctr);
        var offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);

        paper.view.zoom = newZoom;
        paper.view.center = paper.view.center.add(offset);

        event.preventDefault();
        paper.view.update();
    });
}
