import { getDrawable } from "../utils/callDrawOnChildren";
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
    public readonly element: Element;
    public readonly isChild = true;

    // children
    public readonly line: Line[];
    public readonly polyLine: PolyLine[];
    public readonly component: Component[];
    public readonly presentation: Presentation[];
    public readonly extent: Extent[];
    public readonly persistentID: PersistentID[];
    public readonly position: Position[];
    public readonly scale: Scale[];
    public readonly surface: Surface[];
    public readonly circle: Circle[];
    public readonly compositeCurve: CompositeCurve[];
    public readonly ellipse: Ellipse[];
    public readonly shape: Shape[];
    public readonly trimmedCurve: TrimmedCurve[];
    public readonly bsplineCurve: BsplineCurve[];
    public readonly connectionPoints: ConnectionPoints[];
    public readonly pConnectionPoints: PConnectionPoints[];
    public readonly identifier: Identifier[];
    public readonly description: Description[];
    public readonly weight: Weight[];
    public readonly material: Material[];
    public readonly materialDescription: MaterialDescription[];
    public readonly modelNumber: ModelNumber[];
    public readonly genericAttributes: GenericAttributes[];
    public readonly association: Association[];
    public readonly history: History[];

    // attributes
    public readonly id: StringAttribute;
    public readonly tagName: StringAttribute;
    public readonly specification: StringAttribute;
    public readonly stockNumber: StringAttribute;
    public readonly componentClass: StringAttribute;
    public readonly componentName: StringAttribute;
    public readonly componentType: StringAttribute;
    public readonly revision: StringAttribute;
    public readonly status: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.component = getElements(element, "Component", Component);

        // children plantItem
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
        // todo
        // Supplier
        // Manufacturer
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.history = getElements(element, "History", History);

        // attributes plantItem
        this.id = new StringAttribute(element, "ID");
        this.tagName = new StringAttribute(element, "TagName");
        this.specification = new StringAttribute(element, "Specification");
        this.stockNumber = new StringAttribute(element, "StockNumber");
        this.componentClass = new StringAttribute(element, "ComponentClass");
        this.componentName = new StringAttribute(element, "ComponentName");
        this.componentType = new StringAttribute(element, "ComponentType");
        this.revision = new StringAttribute(element, "Revision");
        this.status = new StringAttribute(element, "Status");
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
            if (shapeCatalogItem) {
                console.log("need to draw this item with offset ?");
            }
        }
    }
}
