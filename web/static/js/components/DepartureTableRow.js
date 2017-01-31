import React, { PropTypes } from 'react'
import moment from 'moment'

function DepartureTableRow(props) {
  return (
    <tbody>
      <tr className={props.index % 2 === 0 ? props.tableRowClass : null}>
        <td>{moment(+props.ScheduledTime*1000).format('LT')}</td>
        <td>{props.Destination}</td>
        <td>{props.Trip}</td>
        <td>{props.Track ? props.Track : 'TBD' }</td>
        <td>{props.Status}</td>
      </tr>
    </tbody>
  )
}

DepartureTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  tableRowClass: PropTypes.string.isRequired,
  Trip: PropTypes.string.isRequired,
  Track: PropTypes.string.isRequired,
  Status: PropTypes.string.isRequired,
  ScheduledTime: PropTypes.string.isRequired,
  Destination: PropTypes.string.isRequired
}

export default DepartureTableRow






