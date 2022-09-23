import { GridConfig } from "@simple-html/grid";

export const validationGridConfig: GridConfig = {
    cellHeight: 20,
    panelHeight: 25,
    footerHeight: 40,
    readonly: true,
    selectionMode: "single",
    sortingSet: [{ attribute: "elementName", ascending: true }],
    groupingSet: [
        {
            title: "Element",
            attribute: "elementName"
        }
    ],
    groups: [
        {
            width: 200,
            rows: [
                {
                    header: "Element",
                    attribute: "elementName",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 200,
            rows: [
                {
                    header: "ID",
                    attribute: "id",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 200,
            rows: [
                {
                    header: "TagName",
                    attribute: "tagName",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        },
        {
            width: 300,
            rows: [
                {
                    header: "XPath",
                    attribute: "xpath",
                    filterable: {},
                    allowGrouping: true,
                    sortable: {}
                }
            ]
        }
    ]
};
