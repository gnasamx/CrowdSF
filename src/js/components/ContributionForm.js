import React from 'react'

const ContributionForm = props => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="ContributionFieldId " className="font-weight-bold">
          Contribute to campaign
        </label>
        <div className="row">
          <div className="col-10">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">ETH</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="ContributionFieldId"
                aria-describedby="Help"
                placeholder="Enter amount"
                onChange={props.onContributionChangeHandler}
                value={props.contributionAmtInputValue}
              />
            </div>
            <small id="Help" className="form-text text-muted">
              Enter amount greater than the minimum contribution amount of{' '}
              <span className="text-info font-weight-bold">
                {props.minContribution} ETH
              </span>
            </small>
          </div>
          <div className="col-2">
            <button
              onClick={props.handleContribution}
              type="submit"
              className="btn btn-block btn-success"
            >
              Contribution
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ContributionForm
