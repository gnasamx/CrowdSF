pragma solidity >=0.4.21 <0.6.0;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    address[] public contributersAddArr;
    uint public approversCount;
    string campaignTitle;
    string public campaignDescription;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(string memory _campaignTitle,  string memory _campaignDescription, uint minimum, address creator) public {
        campaignTitle = _campaignTitle;
        campaignDescription = _campaignDescription;
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
        contributersAddArr.push(msg.sender);
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index)  public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        (request.value);
        request.complete = true;
    }

    function getSummary() public view returns (string memory, string memory, 
      uint, uint, uint, uint, address
      ) {
        return (
          campaignTitle,
          campaignDescription,
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getContributers() public view returns(address[] memory) {
        return contributersAddArr;
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function getRequests(uint index) public view returns (string memory, uint, address, bool, uint ) {
        Request storage request = requests[index];

        return (
            request.description,
            request.value,
            request.recipient,
            request.complete,
            request.approvalCount
        );
    }

}