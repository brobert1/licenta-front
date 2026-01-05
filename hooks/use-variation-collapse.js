import { useState } from 'react';

const useVariationCollapse = (tree) => {
  const [variationsCollapsed, setVariationsCollapsed] = useState(false);
  const [expandedVariations, setExpandedVariations] = useState(new Set());

  const filterMainlineOnly = (treeData) => {
    if (!treeData || !Array.isArray(treeData)) return treeData;

    const result = [];

    treeData.forEach((block, blockIndex) => {
      if (block && block.length > 0) {
        if (block[0].depth === 1) {
          // Always include mainline
          result.push(block);
        } else {
          // For variations, add a plus button if collapsed and not individually expanded
          const variationId = `variation-${blockIndex}`;
          if (!expandedVariations.has(variationId)) {
            // Create a plus button placeholder
            const plusButton = {
              id: `plus-${variationId}`,
              isPlusButton: true,
              variationId: variationId,
              originalBlock: block,
              depth: block[0].depth,
            };
            result.push([plusButton]);
          } else {
            // Show the expanded variation
            result.push(block);
          }
        }
      }
    });

    return result;
  };

  const getFilteredTree = () => {
    return variationsCollapsed ? filterMainlineOnly(tree) : tree;
  };

  const handleExpandVariation = (variationId) => {
    setExpandedVariations((prev) => new Set([...prev, variationId]));
  };

  const handleCollapseVariations = () => {
    setVariationsCollapsed(true);
    setExpandedVariations(new Set()); // Reset individual expansions
  };

  const handleExpandAllVariations = () => {
    setVariationsCollapsed(false);
    setExpandedVariations(new Set()); // Reset individual expansions
  };

  const handleVariationAction = (action) => {
    if (action === 'collapse') {
      handleCollapseVariations();
    } else if (action === 'expand') {
      handleExpandAllVariations();
    }
  };

  return {
    variationsCollapsed,
    getFilteredTree,
    handleExpandVariation,
    handleVariationAction,
  };
};

export default useVariationCollapse;
