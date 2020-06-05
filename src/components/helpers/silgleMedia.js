export const singleMedia = (props, e) => {
  e.preventDefault();
  const { result, filteredMediaType, fetchSelected, selectedMediaType, showSelected } = props;
  let media = result.media_type ? result.media_type : filteredMediaType;

  fetchSelected(result.id, media);
  selectedMediaType(media);
  showSelected();
}