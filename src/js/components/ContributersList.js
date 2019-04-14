import React from 'react'

const ContributersList = ({ allContributersArr }) => {
  let allContributers = allContributersArr.map((eachCont, i) => {
    return (
      <li key={i} className="list-group-item">
        {eachCont.toString()}
      </li>
    )
  })
  return <ul style={{margin: 0, padding: 0}}>{allContributers}</ul>
}

export default ContributersList
