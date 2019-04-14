import React from 'react'
import Navbar from '../components/Navbar'
import CampaignDetailsCard1 from '../components/CampaignDetailsCard1'
import CreatorDetailsCard from '../components/CreatorDetailsCard'
import Campaign from '../../../build/contracts/Campaign.json'
import ContributionCard from '../components/ContributionCard'
import ContributionForm from '../components/ContributionForm'
import CreateRequestForm from '../components/CreateRequestForm'

class CampaignDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      campaignAddress: this.props.match.params.camp,
      creator: null,
      cTitle: '',
      cDesc: '',
      minContribution: 0,
      campaignInstance: null,
      contributedAmount: 0,
      backersCount: 0,
      contributionAmtInput: ''
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:8545'
      )
    }

    this.web3 = new Web3(this.web3Provider)
    this.account = web3.eth.accounts.toString()
  }

  componentDidMount() {
    this.setState({ account: web3.eth.accounts.toString() })
    this.campaign = TruffleContract(Campaign)
    this.campaign.setProvider(this.web3Provider)

    // Getting all campaign details from campaign address
    if (this.state.campaignAddress) {
      try {
        this.campaign.at(this.state.campaignAddress).then(campaignInstance => {
          this.setState({ campaignInstance })
          console.log('THEn', this.state.campaignInstance)
          campaignInstance.manager().then(oo => {
            // console.log(`Manager: => ${oo}`)
            this.setState({ creator: oo })
          })
          campaignInstance.getSummary().then(summary => {
            // console.log('summary ; ', summary)
            this.setState({ cTitle: summary[0] })
            this.setState({ cDesc: summary[1] })
            this.setState({ minContribution: summary[2].toString() })
            this.setState({ contributedAmount: summary[3].toString() })
            this.setState({ backersCount: summary[5].toString() })
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
  }

  onContributionChangeHandler = e => {
    this.setState({ contributionAmtInput: e.target.value })
  }

  reRender = () => {
    console.log('Reload started')
    window.location.reload()
    console.log('Reload completed')
  }

  render() {
    let {
      cTitle,
      cDesc,
      creator,
      account,
      minContribution,
      contributedAmount,
      backersCount
    } = this.state
    return (
      <React.Fragment>
        <Navbar accountAddress={account} />
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
          {/* <div className="rol mb-3">
            <div className="col">
              <button
                onClick={this.handleContribution}
                className="btn btn-success"
              >
                Contribute
              </button>
            </div>
          </div> */}

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
                  Create Request
                </div>
                <CreateRequestForm />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default CampaignDetails
