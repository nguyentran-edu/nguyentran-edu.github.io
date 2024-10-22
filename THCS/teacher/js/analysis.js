// Get the modal
let modal = document.getElementById('id01');
let valueLevel = 0;
let linkHomePage = "https://nguyentran-edu.github.io";
let linkCongCuLuyenThiLevel1 = "";
let linkCongCuLuyenThiLevel2 = "";
let linkCongCuLuyenThiLevel3 = "";
let urlCurrent = window.location.href;
window.onload = init;

function init() {
    checkCookie();
    if(urlCurrent.search("index.html") != -1){
        urlCurrent = urlCurrent.substring(0,urlCurrent.search("index.html")-1);
    }
    else if(urlCurrent.search("/#") != -1){
        urlCurrent = urlCurrent.substring(0,urlCurrent.search("/#"));
    }
    else if(urlCurrent.substring(urlCurrent.length-1,urlCurrent.length) == "/"){
        urlCurrent = urlCurrent.substring(0,urlCurrent.length-1);
    }

    linkCongCuLuyenThiLevel1 = urlCurrent + "/IC3GS6LEVEL1.html";
    linkCongCuLuyenThiLevel2 = urlCurrent + "/IC3GS6LEVEL2.html";
    linkCongCuLuyenThiLevel3 = urlCurrent + "/IC3GS6LEVEL3.html";
}

function checkCookie(){
    if(getCookie("CodeSchool").substring(0,2) == "TH"){
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
    else{
        alert("Bạn cần chọn lại trường mình đang học!");
        window.location.href = linkHomePage;
    }
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

function modalLogIn(value){
    document.getElementById('id01').style.display='block';
    valueLevel = value;
    var titleLogInLevel = "";
    var htmlModelLogIn = "";
    var colorTitleLogInLevel = "";
    if(valueLevel == 1){
        titleLogInLevel = "IC3 GS6 Level " + valueLevel.toString();
        colorTitleLogInLevel = "#994589";
    }
    else if(valueLevel == 2){
        titleLogInLevel = "IC3 GS6 Level " + valueLevel.toString();
        colorTitleLogInLevel = "#843C0C";
    }
    else{
        titleLogInLevel = "IC3 GS6 Level " + valueLevel.toString();
        colorTitleLogInLevel = "#385723";
    }
    htmlModelLogIn = "<div class=\"modal-content animate\">"
                    + "<div class=\"imgcontainer\">"
                    + "<span onclick=\"document.getElementById(\'id01\').style.display=\'none\'\" class=\"close\" title=\"Close Modal\">&times;</span>"
                    + "</div>"
                    + "<div class=\"container\" autocomplete=\"off\" >"
                    + "<h2 style=\"text-align: center; color: "
                    + colorTitleLogInLevel
                    + ";\" for=\"uname\"><b>"
                    + titleLogInLevel
                    + "</b></h2>"
                    + "<label for=\"uname\"><b>Tên Đăng Nhập</b></label>"
                    + "<input id=\"uname\" type=\"text\" placeholder=\"Nhập Tên Đăng Nhập\" autocomplete=\"off\" required>"
                    + "<label for=\"psw\"><b>Mã Xác Thực</b></label>"
                    + "<input id=\"psw\" type=\"password\" placeholder=\"Nhập Mã Xác Thực\" autocomplete=\"new-password\" required>"
                    + "<button onclick=\"submit()\">Đăng Nhập</button>"
                    + "</div>"
                    + "</div>";
    document.getElementById("id01").innerHTML = htmlModelLogIn;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let data = [];
let user = "";
let end_time = "";
let uFullName = "";
let typeUser = "";
let checkRow = false;

function submit(){
    let sheetID = getCookie("LS2");
    let base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    data = [];
    user = "";
    end_time = "";
    check = false;
    //console.log("Value: ",valueLevel);
    if(document.getElementById("uname").value=="" || document.getElementById("psw").value==""){
        alert("Bạn hãy nhập đầy đủ thông tin nhé!");
    }
    else{
        var u = document.getElementById("uname").value;
        var p = document.getElementById("psw").value;
        var sheetName = '';
        if(valueLevel == 1){            
            sheetName = 'LogIn1';
        }
        else if(valueLevel == 2){            
            sheetName = 'LogIn2';
        }
        else if(valueLevel == 3){            
            sheetName = 'LogIn3';
        }
        var qu_AllData = 'Select A, D, G, I WHERE A = \"' + u + '\" AND B = \"' + p + '\"';            
        //var qu_AllData = 'Select * ';
        var queryAllData = encodeURIComponent(qu_AllData);
        var urlAllData = `${base}&sheet=${sheetName}&tq=${queryAllData}`;
        
        //console.log(urlAllData);
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
                data = Object.keys(row).map((key) => [key, row[key]]);
                //console.log(typeof Object.keys(row).map((key) => [key, row[key]]));
                //data.push(row);
                user = data[0][1].toString();
                end_time = data[1][1].toString();
                uFullName = data[3][1].toString();
                typeUser = data[2][1].toString();
                checkLogIn();
                checkRow = true;
            })
            if(checkRow == false){
                checkLogIn();
            }
        })
    }    
}

function checkLogIn(){
    var currentDate = new Date();
    if(user == document.getElementById("uname").value){
        if(currentDate.getUTCFullYear() > Number(end_time.slice(5,9))){
            alert("Tài khoản của bạn đã hết hạn!");
        }
        else if(currentDate.getUTCFullYear() == Number(end_time.slice(5,9))){
            var strMonth_Day_Tmp = end_time.slice(end_time.indexOf(",")+1,end_time.length-1);
            var strMonth = strMonth_Day_Tmp.slice(0,strMonth_Day_Tmp.indexOf(","));
            if(currentDate.getUTCMonth() > Number(strMonth)){
                alert("Tài khoản của bạn đã hết hạn!");
            }
            else if(currentDate.getUTCMonth() == Number(strMonth)){
                var strDay = strMonth_Day_Tmp.slice(strMonth_Day_Tmp.indexOf(",")+1,strMonth_Day_Tmp.length);
                if(currentDate.getUTCDate() > Number(strDay)){
                    alert("Tài khoản của bạn đã hết hạn!");
                }
                else{
                    if(typeUser == "QL6" || typeUser == "QL7" || typeUser == "QL8" || typeUser == "GV6" || typeUser == "GV7" || typeUser == "GV8"){
                        goToLinkCongCuLuyenThi();
                    }
                    else{
                        alert("Tài khoản của bạn không có quyền truy cập!");
                    }
                }
            }
            else{
                if(typeUser == "QL6" || typeUser == "QL7" || typeUser == "QL8" || typeUser == "GV6" || typeUser == "GV7" || typeUser == "GV8"){
                    goToLinkCongCuLuyenThi();
                }
                else{
                    alert("Tài khoản của bạn không có quyền truy cập!");
                }
            }
        }
        else{
            if(typeUser == "QL6" || typeUser == "QL7" || typeUser == "QL8" || typeUser == "GV6" || typeUser == "GV7" || typeUser == "GV8"){
                goToLinkCongCuLuyenThi();
            }
            else{
                alert("Tài khoản của bạn không có quyền truy cập!");
            }
        }
        // var strMonth_Day_Tmp = end_time.slice(end_time.indexOf(",")+1,end_time.length-1);
        // var strYear = end_time.slice(5,9);
        // var strMonth = strMonth_Day_Tmp.slice(0,strMonth_Day_Tmp.indexOf(","));
        // var strDay = strMonth_Day_Tmp.slice(strMonth_Day_Tmp.indexOf(",")+1,strMonth_Day_Tmp.length);
        // var stringEndTime = strMonth + "/" + strDay + "/" + strYear;        
    }
    else{
        alert("Bạn đã NHẬP SAI thông tin đăng nhập!");
    }
}

function goToLinkCongCuLuyenThi(){
    //Up
    setCookie("usr", user, 8);
    setCookie("nameUsr", uFullName, 8);
    
    if(valueLevel == 1){
        window.location.href = linkCongCuLuyenThiLevel1;
    }
    else if(valueLevel == 2){
        window.location.href = linkCongCuLuyenThiLevel2;
    }
    else if(valueLevel == 3){
        window.location.href = linkCongCuLuyenThiLevel3;
    }
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
