import React from 'react'
import Campaign from '../../../build/contracts/Campaign'
import { Link } from 'react-router-dom'

class SingleCampaign extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCampaigns: [],
      creator: '0x0'
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
    this.campaign = TruffleContract(Campaign)
    this.campaign.setProvider(this.web3Provider)
  }

  listOnClickHandler = campAdd => {
    // console.log(` Campaign address ${campAdd}`)
    // console.log(`Account : ${this.account}`)

    this.campaign.at(campAdd).then(campaignInstance => {
      // Manager address of this campaign
      campaignInstance.manager().then(oo => {
        console.log(`Manager: => ${oo}`)
        // this.setState({creator: oo})
      })

      // Contribute to the campaign
      // Convert eth to wei => web3.toWei(15, 'ether'),
      // campaignInstance
      //   .contribute({
      //     from: web3.eth.accounts.toString(),
      //     value: 15,
      //     gas: 4712388,
      //     gasPrice: 100000000000
      //   })
      //   .then(() => {
      //     console.log('Successful contribution')
      //   })

      // Get summary of campaign
      campaignInstance.getSummary().then(summary => {
        console.log(`Summary: ${summary}`)
      })

      // campaignInstance.createRequest(
      //   'New tool',
      //   2,
      //   '0x9fc3a36938eed8a4546239cf97ddb9119afb62fd',
      //   {
      //     from: web3.eth.accounts.toString(),
      //     gas: 4712388,
      //     gasPrice: 100000000000
      //   }
      // ),
      //   then(o => console.log(`Created request => ${o}`))

      // Get request count
      // campaignInstance
      //   .getRequestsCount()
      //   .then(rc => console.log(`Request count : ${rc}`))

      // Approve request
      // campaignInstance
      //   .approveRequest(0, {
      //     from: web3.eth.accounts.toString(),
      //     gas: 4712388,
      //     gasPrice: 100000000000
      //   })
      //   .then(ar => console.log(`Request approved ${JSON.stringify(ar)}`))

      // Finalize request
      // campaignInstance
      //   .finalizeRequest(0, {
      //     from: web3.eth.accounts.toString(),
      //     gas: 4712388,
      //     gasPrice: 100000000000
      //   })
      //   .then(fr => console.log(`Request finalize ${JSON.stringify(fr)}`))
    })
  }

  render() {
    // console.log(`Inside SingleComponent ${this.props.campaignsFromBlockchain}`)
    const campaignList = this.props.campaignsFromBlockchain.map(
      (cfbcAddress, i) => (
        <li
          key={i}
          onClick={() => this.listOnClickHandler(cfbcAddress)}
          style={{ listStyle: 'none' }}
        >
          <Link to={`/${cfbcAddress}`} style={{ textDecoration: 'none' }}>
            <div className="card mb-2">
              <div className="card-body">{cfbcAddress}</div>
            </div>
          </Link>
        </li>
      )
    )

    return (
      <React.Fragment>
        <h6 className="m-3">All Campaigns</h6>
        <ul style={{ margin: 0, padding: 0 }}>{campaignList}</ul>
      </React.Fragment>
    )
  }
}

export default SingleCampaign
