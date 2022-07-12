import { collectMissingParts } from "../utils/findMissing";
import { getElements } from "../utils/getElement";
import { StringAttribute } from "../utils/StringAttribute";
import { UnitsOfMeasure } from "./UnitsOfMeasure";

/**
 * The properties of a plant model This includes properties like its name,
 * modification date, editing system etc.
 * The PlantInformation element must be the first child element of a PlantModel element.
 */
export class PlantInformation {
    isChild = true;
    element: Element;

    // children
    unitsOfMeasure: UnitsOfMeasure[];

    // attributes
    schemaVersion: StringAttribute;
    originatingSystem: StringAttribute;
    modelName: StringAttribute;
    date: StringAttribute;
    projectName: StringAttribute;
    projectCode: StringAttribute;
    projectDescription: StringAttribute;
    companyName: StringAttribute;
    time: StringAttribute;
    is3D: StringAttribute;
    units: StringAttribute;
    discipline: StringAttribute;

    constructor(element: Element) {
        this.element = element;

        // children
        this.unitsOfMeasure = getElements(element, "UnitsOfMeasure", UnitsOfMeasure);

        // attributes
        this.schemaVersion = new StringAttribute(element, "SchemaVersion");
        this.originatingSystem = new StringAttribute(element, "OriginatingSystem");
        this.modelName = new StringAttribute(element, "ModelName");
        this.date = new StringAttribute(element, "Date");
        this.projectName = new StringAttribute(element, "ProjectName");
        this.projectCode = new StringAttribute(element, "ProjectCode");
        this.projectDescription = new StringAttribute(element, "ProjectDescription");
        this.companyName = new StringAttribute(element, "CompanyName");
        this.time = new StringAttribute(element, "Time");
        this.is3D = new StringAttribute(element, "Is3D");
        this.units = new StringAttribute(element, "Units");
        this.discipline = new StringAttribute(element, "Discipline");

        // helper to find missing part   // helper to find missing part
        collectMissingParts(this.element, this);
    }
}
