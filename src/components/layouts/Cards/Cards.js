import React from 'react'
import { connect } from 'react-redux';

import Card from './Card/Card'

const Cards = ({ results }) => {
  console.log(results);

  let cards = results.map(card => {
    return <Card key={card.id} result={card} />
  })

  return (
    <React.Fragment>
      {cards}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    results: state.search.searchResult
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     searchText: (search) => dispatch(actions.search(search)),
//     fetchMultiSearch: (query) => dispatch(actions.fetchMultiSearch(query))
//   }
// }

export default connect(mapStateToProps)(Cards)
