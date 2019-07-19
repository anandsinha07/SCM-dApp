const Token = artifacts.require("product");

module.exports = function(deployer) {
    deployer.deploy(Token);
};