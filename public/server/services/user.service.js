/**
 * Created by zeqingzhang on 5/5/16.
 */
module.exports = function(app) {
console.log("Connected");
    app.post("/api/history", addHistory);
    app.get("/api/history", getHistory);

    function getHistory(req,res){
        if(req.session.history != undefined) {
            res.json(req.session.history);
        }else{
            res.send(200);
        }
    }




    function addHistory(req,res){
        var history = req.body.address;

        if(req.session.history != undefined){
            for(var i in history){
                console.log(req.session.history[i]);
            }
            req.session.history.push(history);
            console.log(req.session);
            res.send(200);

        }else {
            console.log(req.session);
            req.session.history = [];
            req.session.history.push(history);

            res.send(200);
        }

    }

};
