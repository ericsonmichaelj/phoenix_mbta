import React from 'react'
import { Socket } from 'phoenix'
import DepartureTrainTable from './DepartureTrainTable'

const socket = new Socket('/socket', { params: { token: '' } })

class TrainDepartures extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      departures: []
    }
  }

  componentWillMount() {
    socket.connect()
    const channel = socket.channel('departures:main', {})
    channel.join().receive('ok', resp =>
      this.setState({ departures: resp.data })
    )
    channel.on('update_departure', (resp) => {
      this.setState({ departures: resp.data })
    })
  }
  componentWillUnmount() {
    socket.disconnect()
  }

  render() {
    const northStation = []
    const southStation = []
    this.state.departures.forEach((item) => {
      if (item.Origin === 'North Station') {
        northStation.push(item)
      } else if (item.Origin === 'South Station') {
        southStation.push(item)
      }
    })
    return (
      <div>
        <h1>Train Departures</h1>
        <div className='departure-container'>
          <div className='row'>
            <div className='col-md-6'>
              <h3>North Station Departures</h3>
              <DepartureTrainTable
                departures={northStation}
                tableRowClass='info'
              />
            </div>
            <div className='col-md-6'>
              <h3>South Station Departures</h3>
              <DepartureTrainTable
                departures={southStation}
                tableRowClass='success'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TrainDepartures
