import React, { PropTypes } from 'react'
import DepartureTableRow from './DepartureTableRow'

function DepartureTrainTable(props) {
  return (
    <table className='table table-hover departure-table'>
      <thead>
        <tr>
          <th>Time</th>
          <th>Destination</th>
          <th>Train#</th>
          <th>Track#</th>
          <th>Status</th>
        </tr>
      </thead>
      {props.departures.map((item, index) =>
        <DepartureTableRow
          {...item}
          index={index}
          tableRowClass={props.tableRowClass}
          key={index}
        />
      )}
    </table>
  )
}

DepartureTrainTable.propTypes = {
  tableRowClass: PropTypes.string.isRequired,
  departures: PropTypes.arrayOf(
    PropTypes.shape({
      Trip: PropTypes.string,
      Track: PropTypes.string,
      TimeStamp: PropTypes.string,
      Status: PropTypes.string,
      ScheduledTime: PropTypes.string,
      Origin: PropTypes.string,
      Lateness: PropTypes.string,
      Destination: PropTypes.string
    })
  ).isRequired
}

export default DepartureTrainTable
