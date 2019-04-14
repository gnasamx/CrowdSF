import React from 'react'

const ContributionCard = ({ contributedTillNow, backersCount }) => {
  return (
    <div className="card ">
      <div className="card-header ">Contribution</div>
      <div className="card-body">
        <h5 className="card-title">
          Total: {contributedTillNow} eth / By Backers: {backersCount}
        </h5>
        <p className="card-text">
          This is total contribution for this campaign by all backers
        </p>
      </div>
    </div>
  )
}
export default ContributionCard
