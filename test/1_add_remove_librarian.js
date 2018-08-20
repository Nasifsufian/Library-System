var Library = artifacts.require("Library");

contract('Library', function(accounts) {
    it("should owner be the accounts[0]", function() {
        return Library.deployed().then(function(instance) {
            return instance.owner.call();
        }).then(function(owner) {
            assert.equal(accounts[0].valueOf(), accounts[0], "owner is not the accounts[0]");
        });
    });

    it("only owner can add librarians", function() {
        return Library.deployed().then(function(instance) {
            instance.addLibrarian(accounts[1]);
            return instance
        }).then(function(instance) {
            return instance.librarians.call(accounts[1]);
        }).then(function(success) {
            assert.isTrue(success.valueOf(), "only owner can add librarian");
        });
    });

    it("only owner can remove librarians", function() {
        return Library.deployed().then(function(instance) {
            instance.removeLibrarian(accounts[1]);
            return instance
        }).then(function(instance) {
            return instance.librarians.call(accounts[1]);
        }).then(function(success) {
            assert.isFalse(success.valueOf(), "only owner can remove librarian");
        });
    });

});