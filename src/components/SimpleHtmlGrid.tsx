import { GridInterface } from "@simple-html/grid";
import "@simple-html/grid";
import "@simple-html/grid/dist/grid.css";
import React from "react";

/**TODO refactor into functiion component */

/**
 * This is just a grid container, so I can use the vanilla grid in react
 * this also added some features like doubleclick on grid row (TODO: edit to look for URL in header)
 */
export class SimpleHtmlGrid extends React.Component {
    myRef: any;
    declare props: any;
    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    shouldComponentUpdate() {
        // we dont want this to automatically update
        return true;
    }

    componentDidMount() {
        this.myRef.current.resizeInit = true; // just to override internals of grid, else we will get double the events
        this.myRef.current.interface = this.props.interface as GridInterface;
        this.myRef.current.connectedCallback();

        this.myRef.current.addEventListener("dblclick", function (e: Event) {
            // this is just a simle hack for me to add rowclick event
            // not perfect, but good enough
            if (e.type === "dblclick") {
                if ((e.target as HTMLElement).className === "simple-html-grid-row-input") {
                    const node: any = (e.target as HTMLElement).parentNode;
                    if (node && node.cell) {
                        const attributeValue = node.connector.displayedDataset[node.rowNo][node.cell.attribute];
                        if (typeof attributeValue === "string") {
                            // default
                            if (attributeValue.indexOf("http") === 0) {
                                window.open(attributeValue, attributeValue);
                            }
                        }
                    }
                }
            }
        });
    }

    render() {
        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <simple-html-grid
                ref={this.myRef}
                style={{
                    width: this.props.style?.width,
                    height: this.props.style?.height
                }}
                class={this.props.className}
            />
        );
    }
}