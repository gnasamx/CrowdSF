import React from 'react'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      minFund: 0
    }
  }

  createNewCampaignHandlerM = min => {
    console.log('Hello: ', min)
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div
        className="modal fade"
        role="dialog"
        id="exampleModal"
        ria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Campaign
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form body */}
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Campaign Title</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.onChangeHandler}
                    name="title"
                    value={this.state.title}
                    id="exampleInputEmail1"
                    placeholder="Enter campaign title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Campaign Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.onChangeHandler}
                    name="description"
                    value={this.state.description}
                    id="exampleInputEmail1"
                    placeholder="Something more about this campaign"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    Campaign Minimum Funds(in ether)
                  </label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">eth</div>
                    </div>
                    <input
                      type="text"
                      onChange={this.onChangeHandler}
                      name="minFund"
                      value={this.state.minFund}
                      className="form-control"
                      id="exampleInputPassword1"
                      aria-describedby="emailHelp"
                      placeholder="Minimum amount"
                    />
                  </div>
                  <small id="emailHelp" className="form-text text-muted">
                    This is minimum amount each backer has to give in ether
                  </small>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.createNewCampaignHandler.bind(
                  this,
                  this.state.title,
                  this.state.description,
                  this.state.minFund
                )}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
