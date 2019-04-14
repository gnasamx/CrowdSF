import React from 'react'
import Navbar from '../components/Navbar'
import CampaignDetailsCard1 from '../components/CampaignDetailsCard1'
import CreatorDetailsCard from '../components/CreatorDetailsCard'
import Campaign from '../../../build/contracts/Campaign.json'
import ContributionCard from '../components/ContributionCard'
import ContributionForm from '../components/ContributionForm'
import CreateRequestForm from '../components/CreateRequestForm'
import AllRequestCard from '../components/AllRequestsCard'
import ContributersList from '../components/ContributersList'

class CampaignDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaignAddress: this.props.match.params.camp,
      creator: null,
      cTitle: '',
      cDesc: '',
      minContribution: 0,
      campaignInstance: null,
      contributedAmount: 0,
      backersCount: 0,
      contributionAmtInput: '',
      requestPurpose: '',
      requestWorkerAdd: '0x0',
      requestEthAmt: 0,
      totalRequestsCount: 0,
      totalRequestArr: [],
      allContributersArr: []
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:8545'
      )
    }

    this.web3 = new Web3(this.web3Provider)
  }

  componentDidMount() {
    this.campaign = TruffleContract(Campaign)
    this.campaign.setProvider(this.web3Provider)

    // Getting all campaign details from campaign address
    if (this.state.campaignAddress) {
      try {
        this.campaign.at(this.state.campaignAddress).then(campaignInstance => {
          this.setState({ campaignInstance })
          // console.log('Then', this.state.campaignInstance)
          // Get creator details
          campaignInstance.manager().then(oo => {
            // console.log(`Manager: => ${oo}`)
            this.setState({ creator: oo })
          })
          // Get campaign summary
          campaignInstance.getSummary().then(summary => {
            // console.log('summary ; ', summary)
            this.setState({ cTitle: summary[0] })
            this.setState({ cDesc: summary[1] })
            this.setState({ minContribution: summary[2].toString() })
            this.setState({ contributedAmount: summary[3].toString() })
            this.setState({ backersCount: summary[5].toString() })
            this.setState({ creator: summary[6].toString() })
          })
          // Get total requests count
          this.state.campaignInstance.getRequestsCount().then(rc => {
            console.log(`Request count : ${rc}`)
            this.setState({ totalRequestsCount: rc })
            // Get all request data
            if (rc >= 1) {
              let totReqArr = []
              for (let i = 0; i < rc; i++) {
                campaignInstance.getRequests(i).then(ar => {
                  // console.log('All requests: ', ar)
                  totReqArr.push(ar)
                  // console.log('totReqArr', totReqArr)
                  this.setState({ totalRequestArr: totReqArr })
                })
              }
            }
          })
          // Get all contributers
          campaignInstance.getContributers().then(eachCont => {
            console.log(eachCont)
            this.setState({ allContributersArr: eachCont })
          })
        })
      } catch (error) {
        console.log(
          `Something went wrong fetching campaign details from Blockchain: ${error}`
        )
      }
    } else {
      console.log(`Campaign details are not fetched yet`)
    }
  }

  handleContribution = e => {
    e.preventDefault()
    try {
      console.log(
        'Yor contribution has started; ',
        this.state.contributionAmtInput
      )
      // console.log('handleContribution', this.state.campaignInstance)
      if (this.state.contributionAmtInput > this.state.minContribution) {
        this.state.campaignInstance
          .contribute({
            from: web3.eth.accounts.toString(),
            value: this.state.contributionAmtInput,
            gas: 4712388,
            gasPrice: 100000000000
          })
          .then(() => {
            console.log('Successful contribution')
            this.reRender()
          })
      } else {
        console.log(
          `Enter minimum contribution amount greater than ${
            this.state.minContribution
          }`
        )
      }
    } catch (error) {
      console.log('Something went wrong in contributing in campaign')
    }
  }

  onContributionChangeHandler = e => {
    this.setState({ contributionAmtInput: e.target.value })
  }

  reRender = () => {
    console.log('Reload started')
    window.location.reload()
    console.log('Reload completed')
  }

  requestChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleApprove = index => {
    console.log(index)
    try {
      this.state.campaignInstance
        .approveRequest(index, {
          from: web3.eth.accounts.toString(),
          gas: 4712388,
          gasPrice: 100000000000
        })
        .then(ar => {
          console.log(`Request approved ${JSON.stringify(ar)}`)
          this.reRender()
        })
    } catch (error) {
      console.log('Something went wrong while approving the request', error)
    }
  }

  handleFinalize = index => {
    console.log(index)
    try {
      this.state.campaignInstance
        .finalizeRequest(index, {
          from: web3.eth.accounts.toString(),
          gas: 4712388,
          gasPrice: 100000000000
        })
        .then(fr => {
          console.log(`Request finalize ${JSON.stringify(fr)}`)
          this.reRender()
        })
    } catch (error) {
      console.log('Something went wrong while finalizing the request', error)
    }
  }

  createNewRequestHandler = e => {
    e.preventDefault()
    try {
      let { requestPurpose, requestWorkerAdd, requestEthAmt } = this.state
      if (requestPurpose && requestWorkerAdd && requestEthAmt > 0) {
        this.state.campaignInstance
          .createRequest(requestPurpose, requestEthAmt, requestWorkerAdd, {
            from: web3.eth.accounts.toString(),
            gas: 4712388,
            gasPrice: 100000000000
          })
          .then(o => {
            console.log(`Created request => ${o}`)
            this.reRender()
          })
      } else {
        console.log('Check fields')
      }
    } catch (error) {
      console.log('Something went wrong in creating new request:', error)
    }
  }

  render() {
    let {
      creator,
      minContribution,
      contributedAmount,
      backersCount,
      requestPurpose,
      requestWorkerAdd,
      requestEthAmt,
      totalRequestArr,
      allContributersArr
    } = this.state

    return (
      <React.Fragment>
        <Navbar accountAddress={web3.eth.accounts.toString()} />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card mb-3">
                <img
                  src="https://pbs.twimg.com/profile_banners/803884128076578816/1545578522/1500x500"
                  className="card-img-top h-75"
                  alt="Campaign Image"
                />
                <div className="card-body">
                  <h5 className="card-title">{this.state.cTitle}</h5>
                  <p className="card-text">{this.state.cDesc}</p>
                  <p className="card-text">
                    <small className="text-muted">Last updated 1 min ago</small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rol mb-3">
            <div className="card">
              <div className="card-body">
                <ContributionForm
                  minContribution={minContribution}
                  onContributionChangeHandler={this.onContributionChangeHandler}
                  contributionAmtInputValue={this.state.contributionAmtInput}
                  handleContribution={this.handleContribution}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-4">
              <CreatorDetailsCard purpose="Creator" creator={creator} />
            </div>
            <div className="col-4">
              <CampaignDetailsCard1
                purpose="Minimum Contribution"
                minContribution={minContribution}
              />
            </div>
            <div className="col-4">
              <ContributionCard
                contributedTillNow={contributedAmount}
                backersCount={backersCount}
              />
            </div>
          </div>

          <div className="rol mb-3">
            <div className="card">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  All Contributers
                </div>
                <ContributersList allContributersArr={allContributersArr} />
              </div>
            </div>
          </div>

          {creator === web3.eth.accounts.toString() && (
            <div className="rol mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="card-title font-weight-bold">
                    Create Request
                  </div>
                  <CreateRequestForm
                    requestChangeHandler={this.requestChangeHandler}
                    requestPurpose={requestPurpose}
                    requestWorkerAdd={requestWorkerAdd}
                    requestEthAmt={requestEthAmt}
                    createNewRequestHandler={this.createNewRequestHandler}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="rol mb-3">
            <div className="card">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Request Details
                </div>
                <AllRequestCard
                  creator={creator}
                  totalRequestArr={totalRequestArr}
                  allContributersArr={allContributersArr}
                  handleApprove={this.handleApprove}
                  handleFinalize={this.handleFinalize}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default CampaignDetails
