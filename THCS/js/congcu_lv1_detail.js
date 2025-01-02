let linkBackToLogInPage = "https://nguyentran-edu.ic3gs6.com";
let linkBackToToolPage = "https://nguyentran-edu.ic3gs6.com/THCS/IC3GS6LEVEL1.html";
let data1 = [];
let user1 = "";
let end_time1 = "";
let uFullName = "";
let typeUserDetail = "";
let classOfUser = "";
let STime_CC = "";
let checkRow1 = false;
window.onload = init;

function init() {
    checkCookie();
}

function checkCookie() {
    let sheetID = getCookie("LS2");
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    let ur = getCookie("usr");
    let idTool = getCookie("ID");
    var sheetName = 'LogIn1';
    var qu_AllData = 'Select A, D, G, H, I WHERE A = \"' + ur + '\"';
    var queryAllData = encodeURIComponent(qu_AllData);
    var urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;
    
    //Cần Code lại phần check làm bài này!!!   
    if(ur == '' || idTool == ''){
        backToLogInPage();
    }
    fetch(urlAllData)
    .then(res => res.text())
    .then(rep => {                
        const jsData = JSON.parse(rep.substr(47).slice(0, -2));
        const colz = [];
        jsData.table.cols.forEach((heading) => {
            if (heading.label) {
                colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
            }
        })
        
        jsData.table.rows.forEach((main) => {
            const row = {};
            colz.forEach((ele, ind) => {
                row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
            })
            data1 = Object.keys(row).map((key) => [key, row[key]]);
            user1 = data1[0][1].toString();
            end_time1 = data1[1][1].toString();
            typeUserDetail = data1[2][1].toString();
            classOfUser = data1[3][1].toString();
            uFullName = data1[4][1].toString();
            checkLogIn1(ur);
            checkRow1 = true;
        })
        if(checkRow1 == false){
            checkLogIn1(ur);
        }
    })
}

function checkLogIn1(ur){
    var currentDate = new Date();
    if(user1 == ur){
        if(currentDate.getUTCFullYear() > Number(end_time1.slice(5,9))){
            backToLogInPage();
        }
        else if(currentDate.getUTCFullYear() == Number(end_time1.slice(5,9))){
            var strMonth_Day_Tmp = end_time1.slice(end_time1.indexOf(",")+1,end_time1.length-1);
            var strMonth = strMonth_Day_Tmp.slice(0,strMonth_Day_Tmp.indexOf(","));
            if(currentDate.getUTCMonth() > Number(strMonth)){
                backToLogInPage();
            }
            else if(currentDate.getUTCMonth() == Number(strMonth)){
                var strDay = strMonth_Day_Tmp.slice(strMonth_Day_Tmp.indexOf(",")+1,strMonth_Day_Tmp.length);
                if(currentDate.getUTCDate() > Number(strDay)){
                    backToLogInPage();
                }
                else{
                    if(getCookie("ID") == NCC){
                        saveInfo(NCC);
                        //alert("Chúc bạn luyện thi hiệu quả!");
                        return;
                    }
                    else{
                        backToToolPage();
                    }
                }
            }
            else{
                if(getCookie("ID") == NCC){
                    saveInfo(NCC);
                    //alert("Chúc bạn luyện thi hiệu quả!");
                    return;
                }
                else{
                    backToToolPage();
                }
            }
        }
        else{
            if(getCookie("ID") == NCC){
                saveInfo(NCC);
                //alert("Chúc bạn luyện thi hiệu quả!");
                return;
            }
            else{
                backToToolPage();
            }
        }  
    }
    else{
        backToLogInPage();
    }
}

function saveInfo(ID){
    var nameSheet = "";
    if(ID.slice(ID.search("_")+1,ID.search("_")+3) == "LT"){
        nameSheet = "CC1_" + ID.slice(0,ID.search("_"));
    }
    else if(ID.slice(ID.search("_")+1,ID.search("_")+3) == "TT"){
        nameSheet = "CC2_" + ID.slice(0,ID.search("_"));
    }
    else{
        nameSheet = "CC3_" + ID.slice(0,ID.search("_"));
    }
    
    var qu_AllData = 'Select H WHERE B = \"' + ID + '\"';
    var queryAllData = encodeURIComponent(qu_AllData);
    let sheetID = getCookie("LS1")
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    var urlAllData = `${base}&sheet=${nameSheet}&tq=${queryAllData}`;
        
    fetch(urlAllData)
    .then(res => res.text())
    .then(rep => {                
        const jsData = JSON.parse(rep.substr(47).slice(0, -2));
        const colz = [];
        jsData.table.cols.forEach((heading) => {
            if (heading.label) {
                colz.push(heading.label.toLowerCase().replace(/\s/g, ''));
            }
        })
        
        jsData.table.rows.forEach((main) => {
            const row = {};
            colz.forEach((ele, ind) => {
                row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
            })
            data1 = Object.keys(row).map((key) => [key, row[key]]);
            STime_CC = data1[0][1].toString();
            
            setCookie("usr", user1, 8);
            setCookie("nameUsr", uFullName, 8);
            setCookie("typeUserDetail", typeUserDetail, 8);
            setCookie("classOfUser", classOfUser, 8);
            setCookie("ID", ID, 8);
            setCookie("STime", STime_CC, 8);
        }) 
    });   
}

function backToLogInPage(){
    alert("Bạn cần đăng nhập lại để tiếp tục luyện thi!");
    window.location.href = linkBackToLogInPage;
}

function backToToolPage(){
    alert("Bạn cần chọn lại bài làm!");
    window.location.href = linkBackToToolPage;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function setCookie(cname,cvalue,exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
