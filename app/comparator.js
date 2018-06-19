const fs = require('fs');
var typeConfig = require("../config/phenotypes.json");
var models = require("./models");

module.exports = {
    judge
};

//here we read the topic distribution, and blow it up to compare with the phenotypes
function judge(bot, uuid) {
    var query = getDistribution(uuid);
    return bot.neo4j.query(query.query, query.params)
        .then(function (result) {
            var template = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
             for (i in result.records) {
                record = result.records[i]
                codeRec = record._fieldLookup.code
                weightRec = record._fieldLookup.weight
                //console.log(record._fields[codeRec] + "\t" + record._fields[weightRec])
                template[record._fields[codeRec]] = parseFloat(record._fields[weightRec]);
             }
            //console.log(template);
            //findNearest
            nearest = findNearest(template)
            //send to refinery
            console.log(JSON.stringify(nearest))
            bot.rabbit.publish(models.linkCluster(nearest));
            return result;
        });
};

//takes a distribution, runs nearest neighbor and returns the name of the nearest cluster
function findNearest(distribution) {
    //var phenotypes = JSON.parse(typeConfig);
    var min = { weight: 1000 };
    for (i in typeConfig) {
        var res = compare(typeConfig[i], distribution);
        if (res.weight < min.weight) {
            min = res;
        }
        //console.log(min);
    }
    return min;
}


//This function takes a topic distribution and a phenotype and returns a distance value
function compare(phenotype, distribution) {
    var total = 0;
    var weights = phenotype.weights;
    for (var i = 0; i < weights.length; i++) {
        if(distribution[i] == 0) continue;
        total += Math.abs(weights[i] - distribution[i]);
    }
    var res = {
        "name": phenotype.name,
        "weight": total
    }
    //console.log(res);
    return res;
}

function getDistribution(Uuid) {
    return {
        query: "match (f:File{Uuid:{uuid}})-[r]-(t:Topic)return t.Code as code, r.Weight as weight",
        params: { uuid: Uuid }
    }
}
