import React from 'react'

const CreatorDetailsCard = ({ creator, purpose }) => {
  return (
    <div className="card ">
      <div className="card-header">{purpose}</div>
      <div className="card-body">
        <h5 className="card-title">Campaign Creator</h5>
        <p className="card-text">{creator}</p>
      </div>
    </div>
    
  )
}
export default CreatorDetailsCard
