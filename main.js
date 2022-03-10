const config = require("./config.json");
const fs = require("fs");
let files = fs.readdirSync(config.input);

// will be in a loop if multiple files
const lConfig = config.languages[files[0].split(".")[1]]
let filedata = fs.readFileSync(`${config.input}/${files[0]}`,"utf-8");
let report = {...config.report};
let lines = filedata.split("\n");
let mlCommentState = false;
for(i of lines){
    report.total +=1;
    // removing spaces if indentation
    i = i.trim();
    if(mlCommentState){
        report.comment += 1;
        if(i.endsWith(lConfig.multiLineCommentStop))
            mlCommentState = false
        continue;
    }
    if(i==''){
        report.blank += 1;
    }
    else if(i.startsWith(lConfig.comment)){
        report.comment += 1;
    }
    else if(i.startsWith(lConfig.multiLineCommentStart) && i.endsWith(lConfig.multiLineCommentStop)){
        report.comment += 1;
    }
    else if(i.startsWith(lConfig.multiLineCommentStart)){
        report.comment += 1;
        mlCommentState = true;
    } 
    else 
        report.code += 1;
}
console.log(report)