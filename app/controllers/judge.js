const comparator = require("../comparator");
const helpers = require("@menome/botframework/helpers");
module.exports.swaggerDef = {
    "/judge": {
      "x-swagger-router-controller": "judge",
      "post": {
        "tags": [
          "JudgeBot"
        ],
        "parameters": [
          {
            "name": "uuid",
            "in": "query",
            "required": true,
            "description": "The uuid of the file we're retrieving.",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "default": {
            "description": "Error"
          }
        }
      }
    }
  }
  
  module.exports.post = function(req,res) {
    var uuid = req.swagger.params.uuid.value;
    comparator.judge(req.bot, uuid)
    .then(function (){
        res.json(helpers.responseWrapper({
            status: "success",
            message: "Starting the REST Harvest"
          }));
    })
    .catch(function(err){
        res.status(400).json(helpers.responseWrapper({
            status: "failure",
            message: err.toString()
          }));
    });
  }