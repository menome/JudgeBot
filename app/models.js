

module.exports = {};

module.exports.linkCluster = (itm, uuid) => {
    return {
        "NodeType": "File",
        "Priority": 1,
        "SourceSystem": "JudgeBot",
        "ConformedDimensions": {
            "Uuid": uuid
        },
        "Connections":
            [
                {
                    "NodeType": "ReportType",
                    "RelType": "HAS_FACET",
                    "ForwardRel": true,
                    "ConformedDimensions": {
                        "Name": itm.name
                    }
                }
            ]

    }
}