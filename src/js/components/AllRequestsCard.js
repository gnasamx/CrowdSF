import React from 'react'

class AllRequestCard extends React.Component {
  render() {
    this.props.totalRequestArr.map(i => {
      i.map(j => console.log(j))
    })

    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Purpose</th>
              <th scope="col">Amount(eth)</th>
              <th scope="col">Address</th>
              <th scope="col">Complete</th>
              <th scope="col">Approval Count</th>
              {this.props.allContributersArr.includes(
                web3.eth.accounts.toString()
              ) && <th scope="col">Approve Request</th>}
              {this.props.creator === web3.eth.accounts.toString() && (
                <th scope="col">Finalize Request</th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.props.totalRequestArr.map((outer, index) => (
              <tr className={outer[3] ? 'table-success': ''} key={index}>
                {outer.map((inner, index) => (
                  <td key={index}>{inner.toString()}</td>
                ))}
                {this.props.allContributersArr.includes(
                  web3.eth.accounts.toString()
                ) && (
                  <td>
                    <button
                      onClick={this.props.handleApprove.bind(this, index)}
                      className="btn btn-outline-info btn-block "
                    >
                      {outer[3] === true ? 'Completed' : 'Approve'}
                    </button>
                  </td>
                )}
                {this.props.creator === web3.eth.accounts.toString() && (
                  <td>
                    <button
                      onClick={this.props.handleFinalize.bind(this, index)}
                      className="btn btn-outline-secondary btn-block "
                    >
                      {outer[3] === true ? 'Completed' : 'Finalize'}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AllRequestCard
