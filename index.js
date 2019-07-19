var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var session = require('express-session');

var Web3 = require('web3');
var contract = require('truffle-contract');
var path = require('path');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

const fileUpload = require('express-fileupload');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var app = new express();
var port = 3000;

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on port " + port);
    }
});

var menu = [{
        href: '/',
        text: 'Home'
    },
    {
        href: '/#about',
        text: 'About Us'
    },
    {
        href: '/#contact',
        text: 'Contact Us'
    }
];

var Res;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'reviewmethereum', resave: true, saveUninitialized: true }));
app.use(fileUpload());

// require('./src/configuration/passport')(app, passport);

// var registerRouter = require('./src/routes/registrationRoute')(web3);
// var profileRouter = require('./src/routes/profileRoute')();
// var reviewerRouter = require('./src/routes/reviewerRoute')();

// var uploadRouter = require('./src/routes/uploadRoute')(web3);
// var yesnoRouter = require('./src/routes/yesnoRoute')(web3);
// var buyTRouter = require('./src/routes/buyTRoute')(web3);
// var sellTRouter = require('./src/routes/sellTRoute')(web3);


// app.use('/register', registerRouter);
// app.use('/u', reviewerRouter);
// app.use('/p', profileRouter);

// app.use('/review', yesnoRouter);
// app.use('/upload', uploadRouter);
// app.use('/buyTokens', buyTRouter);
// app.use('/sellTokens', sellTRouter);

// var nameRoute = require('./src/routes/sellTRoute')(web3);
// app.set('views', './src/views');
app.set('view engine', 'ejs');

var SATContractJSON = require(path.join(__dirname, 'build/contracts/product.json'));
console.log(path.join(__dirname, 'build/contracts/product.json'));
var SATContract = contract(SATContractJSON);
SATContract.setProvider(provider);

app.get('/', function(req, res) {
    
    res.render('index', {
        title: "SmartReviewer",
        heading: "The next generation conference paper reviewing system",
        navMenu: menu
    });
});

app.get('/chkpt1', function (request, result) {
    result.render('searchproduct.ejs');
});

app.get('/chkpt2', function (request, result) {
    result.render('searchprd.ejs');
});

app.get('/prstatus', function (request, result) {
    result.render('search.ejs');
});

app.post('/mo1', function(request, result) {

    // get product name
    var prid = request.body.Id;
    SATContract.deployed().then(function(instance) {
        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
        return instance.getProductName.call(prid);
    }).then(function(res) {
        getname = res.toString();
        console.log("The result is", res.toString());

        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            return instance.getPrice.call(prid);
        }).then(function(res) {
            getprice = parseInt(res);
            console.log("The result is", parseInt(res));

            SATContract.deployed().then(function(instance) {
                web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                return instance.getTimeStamp.call(prid);
            }).then(function(res) {
                gettime = new Date(parseInt(res));
                console.log("The result is", new Date(parseInt(res)));

                result.render('indexb', {
                    name: getname,
                    price: getprice,
                    time: gettime,
                    id: prid
                });

            }, function(error) {
                console.log(error);
            });

        }, function(error) {
            console.log(error);
        });

    }, function(error) {
        console.log(error);
    });
});

app.post('/mo3', function(request, result) {
    // get product name
    var prid = request.body.Id;
    var getname, gettime, getprice, getcomapny, getlocation, gettime1;
    SATContract.deployed().then(function(instance) {
        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
        return instance.getProductName.call(prid);
    }).then(function(res) {
        getname = res.toString();
        console.log("The result is", res.toString());
        // Price
        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            return instance.getPrice.call(prid);
        }).then(function(res) {
            getprice = parseInt(res);
            console.log("The result is", parseInt(res));
            // Timestamp1
            SATContract.deployed().then(function(instance) {
                web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                return instance.getTimeStamp.call(prid);
            }).then(function(res) {
                gettime = new Date(parseInt(res));
                console.log("The result is", new Date(parseInt(res)));
                // Company Name
                SATContract.deployed().then(function(instance) {
                    web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                    return instance.getCompanyName.call(prid);
                }).then(function(res) {
                    getcompany = res.toString();
                    console.log("The result is", new Date(parseInt(res)));
                    // Location1
                    SATContract.deployed().then(function(instance) {
                        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                        return instance.getLocation1.call(prid);
                    }).then(function(res) {
                        getlocation = res.toString();
                        console.log("The result is", new Date(parseInt(res)));
                        // TimeStamp2
                        SATContract.deployed().then(function(instance) {
                            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                            return instance.getTimeStamp1.call(prid);
                        }).then(function(res) {
                            gettime1 = new Date(parseInt(res));
                            console.log("The result is", new Date(parseInt(res)));

                            SATContract.deployed().then(function(instance) {
                                web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                                return instance.getRatings1.call(prid);
                            }).then(function(res) {
                                getratings = parseInt(res);
                                console.log("The result is", new Date(parseInt(res)));
                                result.render('indexc', {
                                    name: getname,
                                    price: getprice,
                                    time: gettime,
                                    company: getcompany,
                                    location1: getlocation,
                                    time1: gettime1,
                                    rating1: getratings,
                                    id: prid
                                });

                            }, function(error) {
                                console.log(error);
                            });

                        }, function(error) {
                            console.log(error);
                        });

                    }, function(error) {
                        console.log(error);
                    });

                }, function(error) {
                    console.log(error);
                });

            }, function(error) {
                console.log(error);
            });

        }, function(error) {
            console.log(error);
        });

    }, function(error) {
        console.log(error);
    });
});

app.post('/mob', function(request, result) {
    console.log("Mobile connect ho gaya");
    var prid = request.body.input;
    console.log("Aaya", prid);
    var first, second;
    SATContract.deployed().then(function(instance) {
        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
        return instance.getAll.call(prid);
    }).then(function(res) {
        first = res;
        console.log("The first result is", res['0'], new Date(parseInt(res['9'])).toString());
        
        result.json( {
            "name": first['0'],
            "price": parseInt(first['1']),
            "time": new Date(parseInt(first['2'])).toString(),
            "company": first['3'],
            "location": first['4'],
            "time1": new Date(parseInt(first['6'])).toString(),
            "ratings": parseInt(first['5']),
            "flocation":first['7'],
            "ftime":new Date(parseInt(first['9'])).toString(),
            "fratings":parseInt(first['8'])
        });

    }, function(error) {
        console.log(error);
    });
});

app.post('/moF', function(request, result) {
    // get product name
    var prid = request.body.Id;
    console.log("Aaya", prid);
    var first, second;
    SATContract.deployed().then(function(instance) {
        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
        return instance.getAll.call(prid);
    }).then(function(res) {
        first = res;
        console.log("The first result is", res['0'], new Date(parseInt(res['9'])).toString());
        var getstatus = "Delievered";

        result.render('finalDisplay', {
            name: first['0'],
            price: parseInt(first['1']),
            time: new Date(parseInt(first['2'])).toString(),
            company: first['3'],
            location1: first['4'],
            time1: new Date(parseInt(first['6'])).toString(),
            rating1: parseInt(first['5']),
            locationF:first['7'],
            timeF:new Date(parseInt(first['9'])).toString(),
            reviewF:parseInt(first['8']),
            status:getstatus,
            id: prid
        });


    }, function(error) {
        console.log(error);
    });
});

var getname, getprice = "", gettime;
app.get('/s', function(req, RRes) {

    SATContract.deployed().then(function(instance) {
        web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
        return instance.getProductName.call("sampleid");
    }).then(function(res) {
        getname = res.toString();
        console.log("The result is", res.toString());

        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            return instance.getPrice.call("sampleid");
        }).then(function(res) {
            getprice = parseInt(res);
            console.log("The result is", parseInt(res));

            SATContract.deployed().then(function(instance) {
                web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
                return instance.getTimeStamp.call("sampleid");
            }).then(function(res) {
                gettime = new Date(parseInt(res));
                console.log("The result is", new Date(parseInt(res)));

                RRes.render('result', {
                    name: getname,
                    price: getprice
                });

            }, function(error) {
                console.log(error);
            });

        }, function(error) {
            console.log(error);
        });

    }, function(error) {
        console.log(error);
    });

});

// app.get()

app.post('/mo',
    function(request, result) {
        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            console.log(web3.eth.accounts[0]);
            return instance.newProduct(request.body.Id, request.body.Name, request.body.price, new Date().getTime(),
                                                { from: web3.eth.accounts[0] });
        }).then(function(res) {
            console.log("The result is", res.toString());
            result.redirect('/s');
        }, function(error) {
            console.log(error);
        });
    });

app.post('/mo2',
    function(request, result) {
        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            console.log(web3.eth.accounts[0], request.body.Id);
            return instance.updateProduct(request.body.Id, request.body.comname, request.body.location, request.body.rate1, new Date().getTime(),
                                                { from: web3.eth.accounts[0] });
        }).then(function(res) {
            console.log("The result is", res.toString());
            result.redirect('/');
        }, function(error) {
            console.log(error);
        });
    });

app.post('/chkd',
    function(request, result) {
        SATContract.deployed().then(function(instance) {
            web3.personal.unlockAccount(web3.eth.accounts[0], "Anand@3302");
            console.log(web3.eth.accounts[0], request.body.Id);
            return instance.finalProduct(request.body.Id, request.body.locationF, request.body.reviewF, new Date().getTime(),
                                                { from: web3.eth.accounts[0] });
        }).then(function(res) {
            console.log("The result is", res.toString());
            result.redirect('/');
        }, function(error) {
            console.log(error);
        });
    });

app.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function(req, res) {
        console.log("Success");
        if (req.user.type == 0) {
            res.redirect('/p');
        } else {
            res.redirect('/u');
        }
    });