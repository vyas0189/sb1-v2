export const searchNodes = (nodes, searchTerm) => {
    if (!searchTerm) return nodes;
    
    const search = searchTerm.toLowerCase();
    
    return nodes.map(node => {
      // Check if current node matches
      const matches = node.name.toLowerCase().includes(search);
      
      // If node has children, search them too
      let matchingChildren = node.children 
        ? searchNodes(node.children, searchTerm)
        : [];
      
      // Keep this node if it matches or has matching children
      if (matches || matchingChildren.length > 0) {
        return {
          ...node,
          children: matchingChildren
        };
      }
      
      return null;
    }).filter(Boolean);
  };