const clone = require('clone');

const objectId = function(ob){
    let id = '';
    Object.keys(ob).forEach(function(key){
        id += ob[key]+'';
    });
    return id;
};

const addToReturnIfUnique = function(ob, list){
    let id = objectId(ob);
    if(list.indexOf(id) !== -1) return false;
    list.push(id);
    return true;
};

const expand = function(data, omit){ //[]
    let combinations = {};
    let results = [];
    let ids = [];
    //todo: support enumerations
    let noExpansions = true;
    Object.keys(data).forEach(function(key){
        if(omit && omit.indexOf(key) !== -1) return;
        let item = data[key];
        if(typeof item == 'object'){
            try{
                if(
                    item.length !== 2 ||
                    typeof item[0] !== 'number' ||
                    typeof item[1] !== 'number'
                ) throw('skip');
                //todo: handle unsorted
                let lower = item[0];
                let upper = item[1];
                for(var lcv=lower; lcv < upper; lcv++){
                    (function(){
                        let copy = clone(data);
                        copy[key] = lcv;
                        let subresults = expand(copy, omit);
                        subresults.forEach(function(item){
                            if(addToReturnIfUnique(item, ids)) results.push(item);
                        });
                    })();
                }
            }catch(ex){
                item.forEach(function(value){
                    let copy = JSON.parse(JSON.stringify(data));
                    copy[key] = value;
                    let subresults = expand(copy, omit);
                    subresults.forEach(function(item){
                        if(addToReturnIfUnique(item, ids)) results.push(item);
                    });
                });
            }
            noExpansions = false;
        }
    });
    if(noExpansions) results.push(data);
    return results;
};

expand.default = expand;

module.exports = expand
