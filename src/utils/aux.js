const extractGetParams = (params)=>{
    let extractedParams = "";
    if(params.length>0){
        extractedParams = "?";
    }
    for(let i=0; i<params.length; i++){
        if(i!==0){
            extractedParams += "&"
        }
        extractedParams += params[i].key+"="+params[i].value;
    }
    return extractedParams;
}


export {extractGetParams}