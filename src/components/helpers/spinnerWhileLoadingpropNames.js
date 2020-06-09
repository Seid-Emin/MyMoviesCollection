import { get, some } from 'lodash'
import LoadingSpinner from '../UI/Spinner/Spinner' // or wherever your spinner component is
import { isLoaded } from 'react-redux-firebase/lib/helpers'
import { compose, branch, renderComponent } from 'recompose'

// HOC that shows a component while condition is true
export function renderWhile(condition, component) {
  return branch(condition, renderComponent(component))
}

// HOC that shows loading spinner component while list of propNames are loading
export function spinnerWhileLoading(propNames) {
  return renderWhile(
    props => some(propNames, name => !isLoaded(get(props, name))),
    LoadingSpinner
  )
}