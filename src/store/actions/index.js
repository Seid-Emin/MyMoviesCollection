export {
  signIn,
  signOut,
  signUp,
  clearError
} from './authActions';


export {
  addMediaToFirestoreCollection,
  getCollectionFromFirestore,
  deleteMediaFromFirestore,
  filterStatusAndType,
  updateMediaStatus,
  changeCollectionView,
  clearCollections
} from './collectionActions';

export {
  search,
  fetchMultiSearch,
  clearSearchingState,
  fetchFilteredMedia,
  fetchFilteredMediaSuccess,
  fetchFilteredMediaFail,
  currentlyViewing,
  preloadFilteredMedia
} from './searchAction';

export {
  fetchSelected,
  selectedMediaType,
  setSelected,
  removeSelectedId,
  clearSelectedMedia,
  preloadSelected,
  showModal,
  hideModal
} from './selectedAction';


export { toggleSideMenu } from './sideMenuActions';