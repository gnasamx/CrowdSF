import React from 'react'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <a className="navbar-brand" href="#">
          CrowdSF
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <button className="btn btn-success my-2 my-sm-0" data-toggle="modal" data-target="#exampleModal">
            Create Campaign
          </button>
          <button
            className="btn btn-outline-warning ml-2 my-sm-0"
            type="submit"
          >
            {/* {this.props.accountAddress.slice(0, 5) + '...'} */}
            {this.props.accountAddress}{' '}
          </button>
        </div>
      </nav>
    )
  }
}

export default Navbar
