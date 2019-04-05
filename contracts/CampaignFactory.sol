pragma solidity >=0.4.21 <0.6.0;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(string memory campaignTitle, string memory campaignDescription, uint minimum) public {
        Campaign newCampaign = new Campaign(campaignTitle, campaignDescription, minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}