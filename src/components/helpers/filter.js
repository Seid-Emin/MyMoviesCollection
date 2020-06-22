let updatedContainer;

export const filterSellection = (container, statusKey, statusValue, mediaKey, mediaType) => {
  // Set initial container
  updatedContainer = container;

  // If status Nav clicked
  // Check for the clicked status and perform filter
  // to update the collection
  if (statusValue !== 'all_media') {
    updatedContainer = filterByType('match', updatedContainer, statusKey, statusValue);
  }

  // If mediaType changed
  // Check for the changed value and perform filter
  // to update the collection
  if (mediaType !== 'all') {
    updatedContainer = filterByType('match', updatedContainer, mediaKey, mediaType);
  }

  return updatedContainer
}

// Conditional filter
export const filterByType = (type = 'exclude', container, key, value) => {
  if (type === 'match') {
    return updatedContainer = container.filter(item => item[key] === value);
  } else {
    return updatedContainer = container.filter(item => item[key] !== value);
  }

}
