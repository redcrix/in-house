const user = require('../../models/user.model');
const product = require('../../models/product.model');
const competition = require('../../models/competition.model');
const participate = require('../../models/participate.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

exports.signup = function(req, res){
    console.log(req.body);
    if(req.body.phone && req.body.email && req.body.lastname && req.body.firstname && req.body.password){
        var newuser = new user();
        newuser.firstname = req.body.firstname;
        newuser.lastname = req.body.lastname;
        newuser.phone = req.body.phone;
        newuser.email = req.body.email;
        newuser.password = newuser.generateHash(req.body.password);

        user.find({"email": req.body.email}, function(err, found){
            if(err){
                return res.json({
                    message: "please try again later",
                    error: err
                });
            } else if(found){
                return res.json({
                    message: "email is already registered",
                    error: err
                });
            } else {
                newuser.save(function(err){
                    if(err){
                        return res.json({
                            message: "please try again later",
                            error: err
                        });
                    } else {
                        return res.json({
                            message: "user account is created"
                        });
                    }
                });
            }
        });

    } else {
        return res.json({
            code: 200,
            message: "firstname, lastname, email, phone, password these fields are required"
        });
    }


}

exports.login = function(req, res){
    console.log(req.body);
    if(req.body.email && req.body.password){
        user.findOne({'email': req.body.email}, function(err, found){
            if (err){
                return res.json({
                    error: "Something went wrong please try again later"
                });
            }

            if (!found) {
                return res.json({
                    message: "User not found"
                });
            }

            if (found.validPassword(req.body.password)){
                var token = jwt.sign(found.toJSON(), config.secret);
                return res.json({
                    message: "LoggedIn",
                    user: found,
                    token: token
                });
            } else {
                return res.json({
                    message: 'Email Or Password Does Not Match.'
                });
            }
        });
    } else {
        return res.json({
            message: "email and password is required for login",
        });
    }
}

exports.show_all_product = function(req, res){
    jwt.verify(req.token, config.secret, (err, user)=>{
        if(err){
            return res.json({
                message: err.message,
            });
        } else {
            product.find( function(err, allproduct){
                if(err){
                    return res.json({
                        error: err
                    });
                } else {
                    return res.json({
                        message: "all product",
                        product: allproduct,
                        user: user
                    });
                }
            });
        }
    });
}

exports.add_product = function(req, res){
    console.log(req.body);
    var products = new product();
    products.item_name = req.body.name;
    products.item_category = req.body.category;
    products.item_price = req.body.price;
    products.item_details = req.body.details;
    products.item_competition = req.body.competition;
    products.save(function(err, saved){
        if(err){
            return res.json({
                error: err
            }); 
        } else {
            return res.json({
                message: "product is added",
                product: saved 
            });
        }
    });
}

exports.show_all_competition = function(req, res){
    competition.find( function(err, allcompetition){
        if(err){
            return res.json({
                error: err
            });           
        } else {
            return res.json({
                message: "all product",
                product: allcompetition
            });
        }
    });
}

exports.add_competition_details = function(req, res){
    product.findById(req.body.product, function(err, found){
        if(err){
            return res.json({
                error: err
            });
        } else {
            if(found && found.item_competition && !found.item_competition_ongoing){
                var comp = new competition();
                comp.product_id = req.body.product;
                comp.total_members_allowed = req.body.total_members;
                comp.already_members_in = 0;
                comp.fees = req.body.fee;
                comp.save(function(err, saved){
                    if(err){
                        return res.json({
                            error: err
                        });
                    } else {
                        product.findByIdAndUpdate(req.body.product, {'item_competition_ongoing': true}, {new: true}, function(err, updated){
                            if(err){
                                return res.json({
                                    error: err
                                });
                            } else {
                                return res.json({
                                    competition_detail: saved
                                });
                            }
                        })
                    }
                });
            } else {
                return res.json({
                    message: "this product is not available for competition or one competition is already on going",
                });
            }
        }
    });
}

exports.add_participate_details = function(req, res){

}

exports.add_competitors = function(req, res){
    competition.findById(req.body.competition_id, function(err, found){
        if(err){
            return res.json({
                error: err
            });
        } else {
            if(found && found.competition_status && found.last_registration_status){
                var p = new participate();
                p.product_id = found.product_id;
                p.competition_id = found._id;
                p.user_id = req.body.user_id;
                participate.findOne({user_id: req.body.user_id}, function(err, found){
                    if(err){
                        return res.json({
                            error: err
                        });
                    } else if(!found){
                        p.save(function(err, done){
                            return res.json({
                                message: "you are registered",
                                details: done
                            });
                        });
                    } else {
                        return res.json({
                            message: "you are already registered"
                        });
                    }
                });
            } else {
                return res.json({
                    message: "registration is closed"
                });
            }
        }
    });
}