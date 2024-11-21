export const buildSelectedTree = (nodes, selected) => {
  return nodes
    .map(node => {
      const isNodeSelected = selected.has(node.id);
      const selectedChildren = node.children 
        ? buildSelectedTree(node.children, selected)
        : undefined;

      if (isNodeSelected || (selectedChildren && selectedChildren.length > 0)) {
        return {
          ...node,
          children: selectedChildren
        };
      }
      return null;
    })
    .filter(node => node !== null);
};