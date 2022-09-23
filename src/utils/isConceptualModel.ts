/**
 * dexpi 1.3/proteus 4.1
 *
 * There is no direct implementation of ConceptualModel in Proteus Schema. A ConceptualModel is a container for
 * the conceptual information in a DexpiModel (as opposed to graphical representation in a Diagram), but there is
 * no such distinction in Proteus Schema.
 * If and only if the top-level <PlantModel> element in an XML document contains at least one of these elements,
 * • <ActuatingSystem>
 * • <Drawing>
 * • <Equipment>
 * • <InstrumentationLoopFunction>
 * • <MetaData>
 * • <PipingNetworkSystem>
 * • <PlantStructureItem>
 * • <ProcessInstrumentationFunction>
 * • <ProcessSignalGeneratingSystem>
 * then the DexpiModel corresponding to the <PlantModel> contains a ConceptualModel.
 */
export function isConceptualModel(path: string) {
    if (path === "//PlantModel/ActuatingSystem") {
        return true;
    }
    if (path === "//PlantModel/InstrumentationLoopFunction") {
        return true;
    }
    if (path === "//PlantModel/MetaData") {
        return true;
    }
    if (path === "//PlantModel/PipingNetworkSystem") {
        return true;
    }
    if (path === "//PlantModel/PlantStructureItem") {
        return true;
    }
    if (path === "//PlantModel/ProcessInstrumentationFunction") {
        return true;
    }
    if (path === "//PlantModel/ProcessSignalGeneratingSystem") {
        return true;
    }
    if (path === "//PlantModel/Equipment") {
        return true;
    }
}
