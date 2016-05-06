/**
 * Created by zeqingzhang on 5/5/16.
 */
module.exports = function(app){
    require('./services/user.service.js')(app);
};