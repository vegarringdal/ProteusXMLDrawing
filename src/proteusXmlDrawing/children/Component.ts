import { getDrawable } from "../utils/callDrawOnChildren";
import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Association } from "./Association";
import { BsplineCurve } from "./BsplineCurve";
import { Circle } from "./Circle";
import { CompositeCurve } from "./CompositeCurve";
import { ConnectionPoints } from "./ConnectionPoints";
import { Description } from "./Description";
import { Ellipse } from "./Ellipse";
import { Extent } from "./Extent";
import { GenericAttributes } from "./GenericAttributes";
import { Identifier } from "./Identifier";
import { Line } from "./Line";
import { Material } from "./Material";
import { MaterialDescription } from "./MaterialDescription";
import { ModelNumber } from "./ModelNumber";
import { PConnectionPoints } from "./PConnectionPoints";
import { PersistentID } from "./PersistentID";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Scale } from "./Scale";
import { Shape } from "./Shape";
import { Surface } from "./Surface";
import { TrimmedCurve } from "./TrimmedCurve";
import { Weight } from "./Weight";

/**
 * Used to group geometric and text primitives within a Drawing element.
 * This inherits all elements and attributes from the base type ‘PlantItem’.
 * See ‘PlantItem’ for the definitions of the inherited contents..
 *
 */
export class Component {
    element: Element;
    isChild = true;

    line: Line[];
    polyLine: PolyLine[];
    component: Component[];
    presentation: Presentation[];
    extent: Extent[];
    persistentID: PersistentID[];
    position: Position[];
    scale: Scale[];
    surface: Surface[];
    circle: Circle[];
    compositeCurve: CompositeCurve[];
    ellipse: Ellipse[];
    shape: Shape[];
    trimmedCurve: TrimmedCurve[];
    bsplineCurve: BsplineCurve[];
    connectionPoints: ConnectionPoints[];
    pConnectionPoints: PConnectionPoints[];
    identifier: Identifier[];
    description: Description[];
    weight: Weight[];
    material: Material[];
    materialDescription: MaterialDescription[];
    modelNumber: ModelNumber[];
    genericAttributes: GenericAttributes[];
    association: Association[];
    history: History[];

    id: StringAttribute;
    tagName: StringAttribute;
    specification: StringAttribute;
    stockNumber: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    revision: StringAttribute;
    status: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        this.component = getElements(element, "Component", Component);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.position = getElements(element, "Position", Position);
        this.scale = getElements(element, "Scale", Scale);
        this.surface = getElements(element, "Surface", Surface);
        this.circle = getElements(element, "Circle", Circle);
        this.compositeCurve = getElements(element, "CompositeCurve", CompositeCurve);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.bsplineCurve = getElements(element, "BsplineCurve", BsplineCurve);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);
        this.pConnectionPoints = getElements(element, "PConnectionPoints", PConnectionPoints);
        this.identifier = getElements(element, "Identifier", Identifier);
        this.description = getElements(element, "Description", Description);
        this.weight = getElements(element, "Weight", Weight);
        this.material = getElements(element, "Material", Material);
        this.materialDescription = getElements(element, "MaterialDescription", MaterialDescription);
        this.modelNumber = getElements(element, "ModelNumber", ModelNumber);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.history = getElements(element, "History", History);

        this.id = new StringAttribute(element, "ID");
        this.tagName = new StringAttribute(element, "TagName");
        this.specification = new StringAttribute(element, "Specification");
        this.stockNumber = new StringAttribute(element, "StockNumber");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");

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
                const x = this.position[0].location[0].x.value;
                const y = this.position[0].location[0].y.value;
                //console.log("Drawing shape", this.componentName.value);
                if (typeof (shapeCatalogItem as any).draw === "function") {
                    (shapeCatalogItem as any).draw(
                        unit,
                        pageOriginX,
                        pageOriginY,
                        x + offsetX,
                        y + offsetY
                    );
                }
            }
        }
    }
}
