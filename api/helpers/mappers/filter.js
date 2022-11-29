const { parse } = require('scim2-parse-filter')

const attributeOperationsMap = {
    "eq": "=",
    "gt": ">",
    "lt": "<",
    "le": "<=",
    "ge": ">=",
    "ne": "<>"
}

const logicalOperationsMap = {
    "and": "AND",
    "or": "OR"
}

function mapLogical(f) {
    let a = f.filters[0].op in Object.keys(logicalOperationsMap) ? mapLogical(f.filters[0]) : mapAttribute(f.filters[0]) 
    let b = f.filters[0].op in Object.keys(logicalOperationsMap) ? mapLogical(f.filters[1]) : mapAttribute(f.filters[1]) 
    
    return {
        FilterExpression: `(${a.FilterExpression} ${logicalOperationsMap[f.op]} ${b.FilterExpression})`,
        ExpressionAttributeValues: {
            ...a.ExpressionAttributeValues,
            ...b.ExpressionAttributeValues 
        }
    }
}
function mapAttribute(f) {
    let id = ":" + String(Math.floor(Math.random() * 1000000000))
    let out = {
        FilterExpression: `( ${f.attrPath} ${attributeOperationsMap[f.op]} ${id} )`,
        ExpressionAttributeValues: { }
    }

    out.ExpressionAttributeValues[id] = f.compValue

    return out
}

module.exports = {
    toAWS(filterString) {        
        let f = parse(filterString)
        
        if (Boolean(logicalOperationsMap[f.op])) {
            return mapLogical(f)
        } else {
            return mapAttribute(f)
        }
    }
}