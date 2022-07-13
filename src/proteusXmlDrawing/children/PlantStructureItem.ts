import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { GenericAttributes } from "./GenericAttributes";
import { PersistentID } from "./PersistentID";

export class PlantStructureItem {
    isChild = true;
    element: Element;
    genericAttributes: GenericAttributes[];
    association: Association[];
    id: StringAttribute;
    parentID: StringAttribute;
    depth: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentClassURI: StringAttribute;
    persistentID: PersistentID[];

    constructor(element: Element) {
        this.element = element;
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.persistentID = getElements(element, "PersistentID", PersistentID);

        this.id = new StringAttribute(element, "ID");
        this.parentID = new StringAttribute(element, "ParentID");
        this.depth = new StringAttribute(element, "Depth");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentClassURI = new StringAttribute(element, "ComponentClassURI");

        collectMissingParts(this.element, this);
    }

    /**
     * draw element/children if any primitives
     * @param unit
     * @param pageOriginX
     * @param pageOriginY
     */
    public draw(unit: number, pageOriginX: number, pageOriginY: number, offsetX = 0, offsetY = 0) {
        const drawables = getDrawable(this);
        drawables.forEach((drawable) => {
            drawable.draw(unit, pageOriginX, pageOriginY, offsetX, offsetY);
        });

        if (this.componentName.value) {
            const shapeCatalogItem = getFromShapeCatalogStore(this.componentName.value);
            if (shapeCatalogItem && shapeCatalogItem !== this) {
                /* const x = this.position[0].location[0].x.value;
                const y = this.position[0].location[0].y.value; */
                //console.log("Drawing shape", this.componentName.value);
                if (typeof (shapeCatalogItem as any).draw === "function") {
                    (shapeCatalogItem as any).draw(
                        unit,
                        pageOriginX,
                        pageOriginY,
                        0 + offsetX,
                        0 + offsetY
                    );
                }
            }
        }
    }
}
