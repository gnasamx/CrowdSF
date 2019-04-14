import React from 'react'

const CampaignDetailsCard1 = props => {
  return (
    <div className="card ">
      <div className="card-header">Minimum Contribution</div>
      <div className="card-body">
        <h5 className="card-title">{props.minContribution} eth</h5>
        <p className="card-text">
          Each backers has to give minimum funds of {props.minContribution}{' '}
          eth.
        </p>
      </div>
    </div>
  )
}
export default CampaignDetailsCard1
