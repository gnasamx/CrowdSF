import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
// import Election from '../../build/contracts/Election.json'
// import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'
import CampaignFactory from '../../../build/contracts/CampaignFactory.json'
import Navbar from '../components/Navbar'
import CampaignFactoryTitle from '../components/CampaignFactoryTitle'
import Campaign from '../../../build/contracts/Campaign.json'
import Modal from '../components/Modal'
import SingleCampaign from '../components/SingleCampaign'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true,
      campaignFactoryAddress: null,
      campaignsFromBlockchain: []
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:8545'
      )
    }

    this.web3 = new Web3(this.web3Provider)

    // this.election = TruffleContract(Election)
    // this.election.setProvider(this.web3Provider)

    this.campaignFactory = TruffleContract(CampaignFactory)
    this.campaignFactory.setProvider(this.web3Provider)

    this.campaign = TruffleContract(Campaign)
    this.campaign.setProvider(this.web3Provider)

    // this.castVote = this.castVote.bind(this)
    // this.watchEvents = this.watchEvents.bind(this)

    this.createNewCampaignHandler = this.createNewCampaignHandler.bind(this)
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      // this.election.deployed().then((electionInstance) => {
      //   this.electionInstance = electionInstance
      //   this.watchEvents()
      //   this.electionInstance.candidatesCount().then((candidatesCount) => {
      //     for (var i = 1; i <= candidatesCount; i++) {
      //       this.electionInstance.candidates(i).then((candidate) => {
      //         const candidates = [...this.state.candidates]
      //         candidates.push({
      //           id: candidate[0],
      //           name: candidate[1],
      //           voteCount: candidate[2]
      //         });
      //         this.setState({ candidates: candidates })
      //       });
      //     }
      //   })
      //   this.electionInstance.voters(this.state.account).then((hasVoted) => {
      //     this.setState({ hasVoted, loading: false })
      //   })
      // })
      console.log('Creating campaign factory')
      this.campaignFactory.deployed().then(campaignFactoryInstance => {
        this.campaignFactoryInstance = campaignFactoryInstance
        // console.log('CampaignFactoryInstance => ', campaignFactoryInstance)
        this.setState({
          campaignFactoryAddress: campaignFactoryInstance.address
        })
        this.getAllDeployedCampaigns()
      })
    })
  }

  // watchEvents() {
  //   // TODO: trigger event when vote is counted, not when component renders
  //   this.electionInstance.votedEvent({}, {
  //     fromBlock: 0,
  //     toBlock: 'latest'
  //   }).watch((error, event) => {
  //     this.setState({ voting: false })
  //   })
  // }

  // castVote(candidateId) {
  //   this.setState({ voting: true })
  //   this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) =>
  //     this.setState({ hasVoted: true })
  //   )
  // }

  getAllDeployedCampaigns = () => {
    try {
      let allCampaignsArr = []
      console.log('Fetching all the campaigns')
      this.campaignFactoryInstance.getDeployedCampaigns().then(allCampaigns => {
        if (allCampaigns !== undefined) {
          console.log(`All campaign ${allCampaigns}`)
          allCampaigns.map(camp => {
            // console.log(`Campaign: ${camp}`)
            // console.log('this.campaign.at(camp); ', this.campaign.at(camp))
            this.campaign.at(camp).then(campaignInstance => {
              console.log(campaignInstance)
              allCampaignsArr.push(campaignInstance.address)
              // SetState the retrieve campaigns from blockchain
              this.setState({ campaignsFromBlockchain: allCampaignsArr })
              // console.log(this.state)
            })
          })
        }
      })
    } catch (error) {
      console.log(`Unable to get the all campaigns from blockchain. ${error}`)
    }
  }

  createNewCampaignHandler = (title, description, minimumFund) => {
    try {
      if (title && description && minimumFund >= 0) {
        this.campaignFactoryInstance
          .createCampaign(title, description, minimumFund, {
            from: this.state.account,
            gas: 4712388,
            gasPrice: 100000000000
          })
          .then(campaignFactory => {
            console.log(
              `New campaign created with address - ${campaignFactory.address}`
            )
          })
      } else {
        console.log('Enter minimum funding amount greater than 0')
      }
    } catch (error) {
      console.log(`Something went wrong while creating new campaign ${error}`)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar accountAddress={this.state.account} />
        <Modal createNewCampaignHandler={this.createNewCampaignHandler} />
        <div className="container">
          <div className="row">
            <div className="col">
              <CampaignFactoryTitle
                campaignFactoryAddress={this.state.campaignFactoryAddress}
              />
              <SingleCampaign
                campaignsFromBlockchain={this.state.campaignsFromBlockchain}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home
