pragma solidity >=0.4.25 <0.6.0;

contract product {
	struct Product {
		// address genesis;
		string id;
		uint time;
		uint time1;
		uint timeF;
		address[] checkpoints;
		string name;
		string comname;
		string location1;
		string locationF;
		uint review1;
		uint reviewF;
		uint price;
	}

	mapping(string => Product) private products;
	string[] public ids;

    function newProduct(string memory hashid, string memory pname, uint pprice, uint timestamp) public returns (string memory){
        // require(!isPresent(docHash), "Document already present");
        ids.push(hashid);
        // products[hashid].genesis = paddr;
        products[hashid].name = pname;
        products[hashid].price = pprice;
        products[hashid].time = timestamp;
        return "success";

    }

    function updateProduct(string memory hashid, string memory comname, string memory location1, uint review1, uint time1) public returns (string memory){
        // require(!isPresent(docHash), "Document already present");
        // products[hashid].genesis = paddr;
        products[hashid].comname = comname;
        products[hashid].location1 = location1;
        products[hashid].review1 = review1;
        products[hashid].time1 = time1;
        return "success";
    }



    function finalProduct(string memory hashid,  string memory locationF, uint reviewF, uint timeF) public returns (string memory){
        // require(!isPresent(docHash), "Document already present");
        // products[hashid].genesis = paddr;
        //products[hashid].comname = comname;
        products[hashid].locationF = locationF;
        products[hashid].reviewF = reviewF;
        products[hashid].timeF = timeF;
        return "success";
    }

	function checkProduct(string memory hashid, address chkpt) public {
        products[hashid].checkpoints.push(chkpt);
    }

	function getProductName(string memory hashid) public view returns (string memory) {
		return products[hashid].name;
	}

	function getPrice(string memory hashid) public view returns (uint) {
		return products[hashid].price;
	}

	function getCompanyName(string memory hashid) public view returns (string memory) {
		return products[hashid].comname;
	}

	function getRatings1(string memory hashid) public view returns (uint) {
		return products[hashid].review1;
	}

	function getLocation1(string memory hashid) public view returns (string memory) {
		return products[hashid].location1;
	}

	function getTimeStamp(string memory hashid) public view returns (uint) {
		return products[hashid].time;
	}

	function getTimeStamp1(string memory hashid) public view returns (uint) {
		return products[hashid].time1;
	}

	function getTimeStampF(string memory hashid) public view returns (uint) {
		return products[hashid].timeF;
	}

	function getLocationF(string memory hashid) public view returns (string memory) {
		return products[hashid].locationF;
	}

	function getReviewF(string memory hashid) public view returns (uint) {
		return products[hashid].reviewF;
	}

	function getAll(string memory hashid) public view returns (
																string memory,
																uint,
																uint, 
																string memory, 
																string memory,
																uint,
																uint,
																string memory,
																uint,
																uint
																	) 
	{
		Product memory prd = products[hashid];
		return (
				prd.name,
				prd.price,
				prd.time,
				prd.comname,
				prd.location1,
				prd.review1,
				prd.time1,
				prd.locationF,
				prd.reviewF,
				prd.timeF
			);
	}

}