var React = require('react');
var _ = require('lodash');

var Stats = React.createClass({

  propTypes: {
    playerInstances: React.PropTypes.array.isRequired,
    playerStates: React.PropTypes.array.isRequired,
    winners: React.PropTypes.array.isRequired
  },

  render() {
    var {playerInstances, playerStates, winners} = this.props;
    var stats = _.map(playerInstances, (el, index) => ({
        wins: winners[index],
        rate: winners[index] ? Math.round(winners[index] / (winners.reduce((prev, cur) => prev + cur))) : 0
      })
    );

    return (
      <table className='stats'>
        <thead>
          <td>
            <b>Results:</b>
          </td>
        </thead>
        <tbody>
        {_.map(playerInstances, (el, index) => {
          var playerInfo = el.getInfo();
          var playerState = playerStates[index];

          return (
            <tr key={index} style={{
              textDecoration: playerState.isAlive ? 'none' : 'line-through',
              color: playerState.isAlive ? '#FFF' : '#A00'
            }}>
              <td>
                {playerInfo.name}
              </td>
              <td className='stats-results'>
                {stats[index].wins} ({stats[index].rate * 100} %)
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  }

});

module.exports = Stats;
