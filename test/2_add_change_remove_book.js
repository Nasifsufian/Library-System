var Library = artifacts.require("Library");

contract('Library', function(accounts) {
    it("only owner can add librarians", function() {
        return Library.deployed().then(function(instance) {
            instance.addLibrarian(accounts[1]);
            return instance
        }).then(function(instance) {
            return instance.librarians.call(accounts[1]);
        }).then(function(value) {
            assert.isTrue(value.valueOf(), "only owner can add librarian");
        });
    });

    var _idBook_ = 0;

    it("only librarian can add books", function() {
        return Library.deployed().then(function(instance) {
            instance.addBook("1234567891234", accounts[2]);
            return instance;
        }).then(function(instance) {
            var idTmp = instance.idBook.call();
            _idBook_ = parseInt(idTmp) - 1;
            return instance;
        }).then(function(instance) {
            return instance.books.call(_idBook_);
        }).then(function(book) {
            assert.equal(book[0].valueOf(), "1234567891234", "isbn invalid");
            assert.equal(book[1].valueOf(), accounts[2], "owner invalid");
        });
    });

    it("only librarian and owner can change the book's owner", function() {
        return Library.deployed().then(function(instance) {
            instance.changeOwnerBook(_idBook_, accounts[3]);
            return instance;
        }).then(function(instance) {
            return instance.books.call(_idBook_);
        }).then(function(book) {
            assert.equal(book[0].valueOf(), "1234567891234", "isbn invalid");
            assert.equal(book[1].valueOf(), accounts[3], "owner invalid");
        });
    });

    it("only librarian can remove books", function() {
        return Library.deployed().then(function(instance) {
            instance.removeBook(_idBook_);
            return instance;
        }).then(function(instance) {
            return instance.bookExists.call(_idBook_);
        }).then(function(value) {
            assert.isFalse(value.valueOf(), "only owner can remove book");
        });
    });
    
    it("only owner can remove librarians", function() {
        return Library.deployed().then(function(instance) {
            instance.removeLibrarian(accounts[1]);
            return instance
        }).then(function(instance) {
            return instance.librarians.call(accounts[1]);
        }).then(function(value) {
            assert.isFalse(value.valueOf(), "only owner can remove librarian");
        });
    });
});