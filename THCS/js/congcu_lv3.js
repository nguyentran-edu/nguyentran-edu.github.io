let linkHomePage = "https://nguyentran-edu.ic3gs6.com";
let data1 = [];
let user1 = "";
let end_time1 = "";
let uFullName = "";
let typeUserDetail = "";
let classOfUser = "";
let checkRow1 = false;
let dataAll = [];
let tabPrevious = null;
let urlCurrent = window.location.href;
window.onload = init;

function init() {
    checkCookieHome();
    checkCookie();
    renderNameUsr();
    renderLuaChonCongCu();
    dataAnalysis();
    logOut();
    //Change Here
    if(urlCurrent.search("IC3GS6LEVEL3.html") != -1){
        urlCurrent = urlCurrent.substring(0,urlCurrent.search("IC3GS6LEVEL3.html")-1);
    }
}

function checkCookieHome(){
    let sheetID = '16so5Uyf5w-UMS9NVf-4VPkiS3wC8Nu36WQwVaugzxZ8';
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    let codeSchool = getCookie("CodeSchool");
    let ls1 = getCookie("LS1");
    let ls2 = getCookie("LS2");
    let ls3 = getCookie("LS3");
    let dataCheckCookie = [];
    var sheetName = 'School_Detail';
    //up
    var qu_AllData = '';
    qu_AllData = 'Select B,C,D,F,G WHERE B = \"' + codeSchool + '\" AND F = \"' + ls1 + '\" AND G = \"' + ls2 + '\" AND H = \"' + ls3 + '\"';
    var queryAllData = encodeURIComponent(qu_AllData);
    
    var urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;
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
            dataCheckCookie.push(row);
        })
        renderNameSchool(dataCheckCookie);        
        return;
    });
    
}

function renderNameSchool(data){    
    if(data.length == 0){
        alert("Bạn cần chọn lại trường mình đang học!");
        window.location.href = linkHomePage;
    }
    else{
        document.getElementById("name-school").innerHTML = getCookie('NameSchool');
    }    
}

function renderNameUsr(){
    var htmlRenderNameUser = "<span style=\"color:blue;\">Họ và tên: </span>" + getCookie("nameUsr");
    if(getCookie("typeUserDetail") == "K6" || getCookie("typeUserDetail") == "K7" || getCookie("typeUserDetail") == "K8"){
        htmlRenderNameUser = htmlRenderNameUser + "<br>" + "<span style=\"color:blue;\">Lớp: </span>" + getCookie("classOfUser");
    }
   document.getElementById("nameUsr").innerHTML = htmlRenderNameUser;
}

function dataAnalysis(){
    var htmlDataAnalysis = "";
    htmlDataAnalysis = "<div><button class=\"btn-data-analysis\" onclick=\"actionDataAnalysis()\"><b>Thống Kê</b></button></div>";
    if(getCookie("typeUserDetail") == "QL6" || getCookie("typeUserDetail") == "QL7" || getCookie("typeUserDetail") == "QL8" || getCookie("typeUserDetail") == "GV6" || getCookie("typeUserDetail") == "GV7" || getCookie("typeUserDetail") == "GV8"){
        htmlDataAnalysis = htmlDataAnalysis + "<div><button class=\"btn-data-analysis\" style=\"margin-top:5px;\" onclick=\"actionDataAnalysisStudent()\"><b>Kết Quả Học Sinh</b></button></div>";
    }
    document.getElementById("data_analysis").innerHTML = htmlDataAnalysis;
}

function actionDataAnalysisStudent(){
    //Up
    var linkDataAnalysis = urlCurrent + "/teacher";
    window.open(linkDataAnalysis,'_blank');
}

function actionDataAnalysis(){
    //Up
    var linkDataAnalysis = urlCurrent + "/analysis";
    window.open(linkDataAnalysis,'_blank');
}

function logOut(){   
    var htmlLogOut = "";
    htmlLogOut = "<div><button class=\"btn-log-out\" onclick=\"actionLogOut()\"><b>Đăng Xuất</b></button></div>"
                    
    document.getElementById("log_out").innerHTML = htmlLogOut;
}

function actionLogOut(){
    document.cookie = 'usr=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'nameUsr=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'typeUserDetail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'classOfUser=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'ID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'STime=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.href = linkHomePage;
}

function checkCookie() {
    let sheetID = getCookie("LS2");
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    let ur = getCookie("usr");
    var sheetName = 'LogIn3';        
    var qu_AllData = 'Select A, D, G, H, I WHERE A = \"' + ur + '\"';
    var queryAllData = encodeURIComponent(qu_AllData);
    var urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;
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
                    alert("Chúc bạn luyện thi hiệu quả!");
                    return;
                }
            }
            else{
                alert("Chúc bạn luyện thi hiệu quả!");
                return;
            }
        }
        else{
            alert("Chúc bạn luyện thi hiệu quả!");
            return;
        }  
    }
    else{
        backToLogInPage();
    }
}

function backToLogInPage(){
    alert("Bạn cần đăng nhập lại để tiếp tục luyện thi!");
    window.location.href = linkHomePage;
}

function setCookie(cname,cvalue,exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // document.cookie = courseName + "=" + courseValue + ";" + expires + ";path=/";
    // document.cookie = achievementsOfUserName + "=" + achievementsOfUserValue + ";" + expires + ";path=/";
    
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

function renderLuaChonCongCu(){
    var htmlSelectTool = "";
    htmlSelectTool = "<input type=\"radio\" id=\"s1\" name=\"se_tool\" value=\"s1\"> <span style=\"color:#5B46F8;\"><b><i>Luyện Tập</i></b></span>&emsp;&ensp;"
    //Change Here
                    + "<input style=\"display:none;\" type=\"radio\" id=\"s3\" name=\"se_tool\" value=\"s3\"> <span style=\"display:none;color:#F8466D;\"><b><i>Luyện Thi</i></b></span>&emsp;&ensp;"
                    + "<input type=\"radio\" id=\"s2\" name=\"se_tool\" value=\"s2\"> <span style=\"color:#E63C1E;\"><b><i>Thi Thử</i></b></span><br/>"
                    + "<div><button class=\"btn-select-tool\" onclick=\"confirmRenderCongCu()\"><b>OK</b></button></div>";
                    
    document.getElementById("select-tool").innerHTML = htmlSelectTool;
}

function confirmRenderCongCu(){
    var ele = document.getElementsByName('se_tool');
    var checkSelect = false;
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked){
            if(ele[i].value == "s1"){
                renderCongCu("CC1_LV3", 1);
            }
            //Change Here
            // else if(ele[i].value == "s3"){
            //     renderCongCu("CC3_LV3", 3);
            // }            
            else if(ele[i].value == "s2"){
                renderCongCu("CC2_LV3", 2);
            }
            checkSelect = true;
        }
    }
    if(checkSelect == false){
        // Change Here
        // alert("Bạn hãy chọn \"Luyện Tập\" hoặc \"Luyện Thi\" nhé!");
        
        alert("Bạn hãy chọn \"Luyện Tập\" hoặc \"Thi Thử\" nhé!");
    }
}

function renderCongCu(nameSheet, typeTool){
    //Up
    let sheetID = getCookie("LS1");
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    var sheetName = nameSheet;
    var qu_AllData = 'Select *';
    var queryAllData = encodeURIComponent(qu_AllData);
    var urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;
    dataAll = [];
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
            dataAll.push(row);
        })
        if(typeTool == 1){
            renderToWebsite1(dataAll);
        }
        else if(typeTool == 2){
            renderToWebsite2(dataAll);
        }
        else{
            renderToWebsite3(dataAll);
        }        
    });
}

function renderToWebsite1(data){
    htmlListForm = "";   
    htmlListForm = htmlListForm + "<table class=\"table-form-real-estate-CongVu\">"
                                + "<tr class=\"table-row-form-real-estate-CongVu\">"
                                + "<th class=\"table-header-form-real-estate-CongVu\">STT</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Chủ Đề</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Luyện Tập</th>"
                                + "</tr>";
    var typeTodo = "";
    var titleTodo = "";
    for(var count = 0; count < data.length; count++){
        typeTodo = "<button class=\"button-google-form\" type=\"button\">"+ data[count]['nametodo'] +"</button>";
        titleTodo = "<span style=\"color:black;font-weight:bold;\">" + data[count]['title'];
    

        htmlListForm = htmlListForm + "<tr "
                                    + "id=\"info" + String(count+1) + "\""
                                    + " class=\"table-row-form-real-estate-CongVu\">"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + data[count]['number']
                                    + "</td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\">"
                                    + titleTodo
                                    + "</span></td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + "<a href=\"#info" + String(count+1) + "\" onclick=\"goToLink("
                                    + "\'"
                                    + String(data[count]['linktodo1'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['id'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['currenttime'])
                                    + "\'"
                                    + ")\">"
                                    + typeTodo
                                    + "</a>"

                                    + "</td>"
                                    + "</tr>"
    }
    htmlListForm = htmlListForm + "</table>";
    document.getElementById("main").innerHTML = htmlListForm;
}

function renderToWebsite2(data){
    htmlListForm = "";   
    htmlListForm = htmlListForm + "<table class=\"table-form-real-estate-CongVu\">"
                                + "<tr class=\"table-row-form-real-estate-CongVu\">"
                                + "<th class=\"table-header-form-real-estate-CongVu\">STT</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Bộ Đề</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Thi Thử</th>"
                                + "</tr>";
    var typeTodo = "";
    var titleTodo = "";
    for(var count = 0; count < data.length; count++){
        typeTodo = "<button class=\"button-google-form1\" type=\"button\">"+ data[count]['nametodo'] +"</button>";
        titleTodo = "<span style=\"color:black;font-weight:bold;\">" + data[count]['title'];
    

        htmlListForm = htmlListForm + "<tr "
                                    + "id=\"info" + String(count+1) + "\""
                                    + " class=\"table-row-form-real-estate-CongVu\">"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + data[count]['number']
                                    + "</td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\">"
                                    + titleTodo
                                    + "</span></td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + "<a href=\"#info" + String(count+1) + "\" onclick=\"goToLink("
                                    + "\'"
                                    + String(data[count]['linktodo1'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['id'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['currenttime'])
                                    + "\'"
                                    + ")\">"
                                    + typeTodo
                                    + "</a>"

                                    + "</td>"
                                    + "</tr>"
    }
    htmlListForm = htmlListForm + "</table>";
    document.getElementById("main").innerHTML = htmlListForm;
}

function renderToWebsite3(data){
    htmlListForm = "";   
    htmlListForm = htmlListForm + "<table class=\"table-form-real-estate-CongVu\">"
                                + "<tr class=\"table-row-form-real-estate-CongVu\">"
                                + "<th class=\"table-header-form-real-estate-CongVu\">STT</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Chủ Đề</th>"
                                + "<th class=\"table-header-form-real-estate-CongVu\">Luyện Thi</th>"
                                + "</tr>";
    var typeTodo = "";
    var titleTodo = "";
    for(var count = 0; count < data.length; count++){
        typeTodo = "<button class=\"button-google-form1\" type=\"button\">"+ data[count]['nametodo'] +"</button>";
        titleTodo = "<span style=\"color:black;font-weight:bold;\">" + data[count]['title'];
    

        htmlListForm = htmlListForm + "<tr "
                                    + "id=\"info" + String(count+1) + "\""
                                    + " class=\"table-row-form-real-estate-CongVu\">"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + data[count]['number']
                                    + "</td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\">"
                                    + titleTodo
                                    + "</span></td>"
                                    + "<td class=\"table-data-form-real-estate-CongVu\" style=\"text-align:center;\">"
                                    + "<a href=\"#info" + String(count+1) + "\" onclick=\"goToLink("
                                    + "\'"
                                    + String(data[count]['linktodo1'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['id'])
                                    + "\'"
                                    + ",\'"
                                    + String(data[count]['currenttime'])
                                    + "\'"
                                    + ")\">"
                                    + typeTodo
                                    + "</a>"

                                    + "</td>"
                                    + "</tr>"
    }
    htmlListForm = htmlListForm + "</table>";
    document.getElementById("main").innerHTML = htmlListForm;
}

function goToLink(linkToDo,ID,STime){
    setCookie("usr", user1, 8);
    setCookie("nameUsr", uFullName, 8);
    setCookie("typeUserDetail", typeUserDetail, 8);
    setCookie("classOfUser", classOfUser, 8);
    setCookie("ID", ID, 8);
    setCookie("STime", STime, 8);
    if(tabPrevious != null){
        tabPrevious.close();
        tabPrevious = window.open(linkToDo,'_blank');
    }
    else{
        tabPrevious = window.open(linkToDo,'_blank'); 
    }
}
