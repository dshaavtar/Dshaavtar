import { cq as useRegistryContext, r as reactExports, cr as getOrderedFlowsForExecution, cs as subscribeRegistryChanges } from "./index-D4mmtgjo.js";
function useRegistryFlows() {
  return useRegistryContext();
}
function useOrderedFlows() {
  const [ordered, setOrdered] = reactExports.useState(
    () => getOrderedFlowsForExecution()
  );
  reactExports.useEffect(() => {
    const unsub = subscribeRegistryChanges(() => {
      setOrdered([...getOrderedFlowsForExecution()]);
    });
    return unsub;
  }, []);
  return ordered;
}
export {
  useOrderedFlows as a,
  useRegistryFlows as u
};
