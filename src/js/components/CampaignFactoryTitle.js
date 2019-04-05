import React from 'react'

class CampaignFactoryTitle extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">CrowdSF</div>
        <div className="card-body">
          {this.props.campaignFactoryAddress ? (
            <div>
              <h5 className="card-title">CrowdSF is deployed</h5>
              <p className="card-text">{this.props.campaignFactoryAddress}</p>
            </div>
          ) : (
            <h5 className="card-title">Failed to deploy CrowdSF</h5>
          )}
        </div>
      </div>
    )
  }
}

export default CampaignFactoryTitle
