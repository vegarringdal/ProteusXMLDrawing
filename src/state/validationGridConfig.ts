import { GridConfig } from "@simple-html/grid";

export const validationGridConfig: GridConfig = {
    cellHeight: 20,
    panelHeight: 25,
    footerHeight: 40,
    readonly: true,
    selectionMode: "single",
    sortingSet: [{ attribute: "node", ascending: true }],
    /* groupingSet: [
        {
            title: "Element",
            attribute: "elementName"
        }
    ], */
    groups: [
        {
            width: 200,
            rows: [
                {
                    header: "Node",
                    attribute: "node",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 110,
            rows: [
                {
                    header: "Line",
                    attribute: "line",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 1450,
            rows: [
                {
                    header: "Error message",
                    attribute: "message",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        }
    ]
};
