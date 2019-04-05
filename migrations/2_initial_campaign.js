const Campaign = artifacts.require('Campaign')
module.exports = function(deployer) {
  deployer.deploy(Campaign, '', '', 10, '0x6fd33c48ebc17bd9d6751660f086db2650c69d48' )
}
