import { getDrawable } from "../utils/callDrawOnChildren";
import { getElements } from "../utils/getElement";
import { getFromShapeCatalogStore } from "../utils/shapeCatalogStore";
import { StringAttribute } from "../utils/StringAttribute";
import { Component } from "./Component";
import { Extent } from "./Extent";
import { Line } from "./Line";
import { PolyLine } from "./PolyLine";
import { Position } from "./Position";
import { Presentation } from "./Presentation";
import { Shape } from "./Shape";
import { Nozzle } from "./Nozzle";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { collectMissingParts } from "../utils/findMissing";
import { Text } from "./Text";
import { TrimmedCurve } from "./TrimmedCurve";
import { PersistentID } from "./PersistentID";
import { GenericAttributes } from "./GenericAttributes";
import { Association } from "./Association";
import { Scale } from "./Scale";
import { Description } from "./Description";
import { SignalLine } from "./SignalLine";
import { MaximumDesignPressure } from "./MaximumDesignPressure";
import { MaximumDesignTemperature } from "./MaximumDesignTemperature";
import { MinimumDesignPressure } from "./MinimumDesignPressure";
import { MinimumDesignTemperature } from "./MinimumDesignTemperature";
import { ConnectionPoints } from "./ConnectionPoints";
import { Label } from "./Label";
import { DexpiCustomAttributes } from "./DexpiCustomAttributes";

/**
 * A geometric primitive
 */
export class Equipment {
    isChild = true;
    element: Element;

    line: Line[];
    polyLine: PolyLine[];
    component: Component[];
    equipment: Equipment[];
    presentation: Presentation[];
    extent: Extent[];
    position: Position[];
    shape: Shape[];
    text: Text[];
    nozzle: Nozzle[];
    circle: Circle[];
    ellipse: Ellipse[];
    trimmedCurve: TrimmedCurve[];

    id: StringAttribute;
    componentClass: StringAttribute;
    componentName: StringAttribute;
    componentType: StringAttribute;
    persistentID: PersistentID[];
    genericAttributes: GenericAttributes[];
    association: Association[];
    scale: Scale[];
    description: Description[];
    maximumDesignPressure: MaximumDesignPressure[];
    minimumDesignPressure: MinimumDesignPressure[];
    maximumDesignTemperature: MaximumDesignTemperature[];
    minimumDesignTemperature: MinimumDesignTemperature[];
    connectionPoints: unknown[];
    label: Label[];
    dexpiCustomAttributes: DexpiCustomAttributes[];

    constructor(element: Element) {
        this.element = element;

        this.equipment = getElements(element, "Equipment", Equipment);
        this.nozzle = getElements(element, "Nozzle", Nozzle);
        this.component = getElements(element, "Component", Component);
        this.description = getElements(element, "Description", Description);
        this.presentation = getElements(element, "Presentation", Presentation);
        this.extent = getElements(element, "Extent", Extent);
        this.position = getElements(element, "Position", Position);
        this.circle = getElements(element, "Circle", Circle);
        this.ellipse = getElements(element, "Ellipse", Ellipse);
        this.line = getElements(element, "Line", Line);
        this.polyLine = getElements(element, "PolyLine", PolyLine);
        this.shape = getElements(element, "Shape", Shape);
        this.text = getElements(element, "Text", Text);
        this.trimmedCurve = getElements(element, "TrimmedCurve", TrimmedCurve);
        this.persistentID = getElements(element, "PersistentID", PersistentID);
        this.genericAttributes = getElements(element, "GenericAttributes", GenericAttributes);
        this.association = getElements(element, "Association", Association);
        this.scale = getElements(element, "Scale", Scale);
        this.maximumDesignPressure = getElements(element, "MaximumDesignPressure", MaximumDesignPressure);
        this.minimumDesignPressure = getElements(element, "MinimumDesignPressure", MinimumDesignPressure);
        this.maximumDesignTemperature = getElements(element, "MaximumDesignTemperature", MaximumDesignTemperature);
        this.minimumDesignTemperature = getElements(element, "MinimumDesignTemperature", MinimumDesignTemperature);
        this.connectionPoints = getElements(element, "ConnectionPoints", ConnectionPoints);
        this.label = getElements(element, "Label", Label);
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
