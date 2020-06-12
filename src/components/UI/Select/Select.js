import React from 'react';


import './Select.css';


// Selecet configs
import { selectConfig } from './selectConfig';
import { colorThemes } from '../Styles/colorThemes';

const Select = ({ selectName, className, handler }) => {

  return <select
    name={selectName}
    className={`${className} ${colorThemes[selectName][isMediaInCollection.watchStatus]}`}
    onChange={(e) => this.handler(e)}
    value={isMediaInCollection.watchStatus}>
    <option value="watching">Watching</option>
    <option value="completed">Completed</option>
    <option value="on_hold">On Hold</option>
    <option value="dropped">Dropped</option>
    <option value="plan_to_watch">Plan To Watch</option>
  </select>
}

export default Select;

<select
  name='watchStatus'
  className={'select_mediaStatus ' + colorThemes.watchStatus[isMediaInCollection.watchStatus]}
  onChange={(e) => this.handleStatusAndRating(e)}
  value={isMediaInCollection.watchStatus}>
  <option value="watching">Watching</option>
  <option value="completed">Completed</option>
  <option value="on_hold">On Hold</option>
  <option value="dropped">Dropped</option>
  <option value="plan_to_watch">Plan To Watch</option>
</select>
{/* User Rating given to media */ }
<select
  name='userRating'
  className={'user-score ' + colorThemes.userRating[isMediaInCollection.userRating]}
  value={isMediaInCollection.userRating}
  onChange={(e) => this.handleStatusAndRating(e)}>
  <option value="select">Select</option>
  <option value="10">(10) Masterpiece</option>
  <option value="9">(9) Great</option>
  <option value="8">(8) Very Good</option>
  <option value="7">(7) Good</option>
  <option value="6">(6) Fine</option>
  <option value="5">(5) Average</option>
  <option value="4">(4) Bad</option>
  <option value="3">(3) Very Bad</option>
  <option value="2">(2) Horrible</option>
  <option value="1">(1) Appalling</option>
</select>