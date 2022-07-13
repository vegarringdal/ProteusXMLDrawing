import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { Circle } from "./Circle";
import { DexpiCustomAttributes } from "./DexpiCustomAttributes";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Line } from "./Line";
import { NominalDiameter } from "./NominalDiameter";
import { PersistentID } from "./PersistentID";
import { PipingNetworkSegment } from "./PipingNetworkSegment";
import { PolyLine } from "./PolyLine";
import { Presentation } from "./Presentation";
import { PropertyBreak } from "./PropertyBreak";
import { Shape } from "./Shape";

/**
 * A PipingNetworkSystem contains the information for a physical PipingNetworkSystem
 * in the plant or a section thereof as contained within a module. The PipingNetworkSystem
 * contains all of the PlantItems that belong to it. A PipingNetworkSystem may have multiple
 * sources and multiple destinations.’
 *
 * A PipingNetworkSystem element inherits elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents.
 *
 */
export class PipingNetworkSystem {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    pipingNetworkSegment: unknown[];
    shape: Shape[];
    circle: Circle[];
    ellipse: Ellipse[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    extent: Extent[];
    genericAttributes: GenericAttributes[];
    propertyBreak: PropertyBreak[];
    association: Association[];
    persistentID: PersistentID[];
    presentation: Presentation[];
    nominalDiameter: NominalDiameter[];
    dexpiCustomAttributes: DexpiCustomAttributes[];

    constructor(element: Element) {
        this.element = element;

        this.pipingNetworkSegment = getElements(
            element,
            "PipingNetworkSegment",
            PipingNetworkSegment
        );

        this.extent = getElements(element, "Extent", Extent);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.propertyBreak = getElements(element, "PropertyBreak", PropertyBreak);
        this.association = getElements(element, "Association", Association);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.nominalDiameter = getElements(element, "NominalDiameter", NominalDiameter);
        this.dexpiCustomAttributes = getElements(element, "DexpiCustomAttributes", DexpiCustomAttributes);


        this.id = new StringAttribute(element, "ID");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");

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
    }
}
