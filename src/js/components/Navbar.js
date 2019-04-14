import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <Link className="navbar-brand" to="/">
          CrowdSF
        </Link>
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
              <Link className="nav-link" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-success my-2 my-sm-0"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Create Campaign
          </button>
          <div>
            {this.props.accountAddress && (
              <button
                className="btn btn-outline-warning ml-2 my-sm-0"
                type="submit"
              >
                {/* {this.props.accountAddress.slice(0, 5) + '...'} */}
                {this.props.accountAddress}{' '}
              </button>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
