let colors = ["red", "yellow", "green", "blue", "pink", "orange"]//מערך הצבעים הקיימים
let check = new Array(0, 0, 0, 0, 0, 0,);//מערך מונים
let rand_colors = [];
let arr_choose;
let x;
let flag = false;
let flag2 = false;
let counterwhite = 0, counterblack = 0
let counterlevel = 'a';
let arr_result;
let counterenter = 0;
let timer;
let cou = 0;
document.getElementById("img_play").addEventListener("click", randomer)
document.getElementById("img_home").addEventListener("click", homer)
function homer() {
    window.open("home.html", "_self")
}

document.getElementById("img_play").addEventListener("click", timering)
function timering() {
    timer = setInterval(function () {
        cou++
        console.log(cou)
        if (cou >= 300) {
            console.log("yes")
            window.open("lose.html", "_self")
        }
    }, 1000
    );
}
function randomer() {


    if (counterenter == 0) {
        counterenter++;
        flag2 = true;
        for (let index = 0; index < 4; index++) {
            check[index] = 0;
        }
        for (var i = 0; i < 4; i++) {
            x = Math.round(Math.random("red", "yellow", "green", "blue", "pink", "orange") * 5);
            if (check[x] > 0) {
                while (check[x] > 0) {
                    x = Math.round(Math.random("red", "yellow", "green", "blue", "pink", "orange") * 5);
                }
            }
            console.log(x)
            check[x]++
            rand_colors[i] = x

        }
    }

}
document.getElementById("img_check").addEventListener("click", checking)
function checking() {
    counterblack = 0;
    counterwhite = 0;
    flag = false;
    arr_choose = document.querySelectorAll(`.${counterlevel}`);
    for (var index = 0; index < 4; index++) {
        if (arr_choose[index].id == counterlevel.toString())//בדיקה אם יש דיב ריק
        {
            for (var i = 0; i < 4; i++) {
                arr_choose[i].style.backgroundColor = 'transparent';
                flag = true
            }
        }
        else//בדיקה אם יש צבע פעמיים
        {
            for (var j = 0; j < index; j++) {
                if (arr_choose[index].style.backgroundColor == arr_choose[j].style.backgroundColor) {
                    flag = true
                    for (var z = 0; z < 4; z++) {
                        arr_choose[z].style.backgroundColor = 'transparent';
                        arr_choose[z].id = counterlevel.toString()
                    }
                }
            }
        }
    }
    //מילוי התוצאה לפי הכמות הנדרשת של השחור לבן
    if (flag == false) {
        arr_result = document.querySelectorAll(".result" + `${counterlevel}`)
        for (let index = 0; index < rand_colors.length; index++) {
            for (let i = 0; i < arr_choose.length; i++) {
                if (colors[rand_colors[index]] == arr_choose[i].id) {
                    if (index == i) {
                        counterblack++
                    }
                    else {
                        counterwhite++
                    }
                }
            }
        }
        console.log(counterwhite)
        console.log(counterblack)
        if (counterblack == 4) {
            window.open("winer.HTML", "_self")

        }
        else {


            for (let index = 0; index < counterblack; index++) {
                arr_result[index].style.backgroundColor = "red"

            }
            for (let index = counterblack; index < counterwhite + counterblack; index++) {
                arr_result[index].style.backgroundColor = "white"

            }
            counterlevel = String.fromCharCode(counterlevel.charCodeAt(0) + 1);
            if (counterlevel == 'f') {

                window.open("lose.html", "_self")
            }
        }
    }
}

function dragStart(event) {
    event.dataTransfer.setData("id", event.target.id);
}

function drop(ev) {
    if (flag2 == true) {

        if (ev.target.className == counterlevel) {
            document.getElementById("music").play();

            ev.preventDefault();
            var id = ev.dataTransfer.getData("id");

            ev.target.id = id
            ev.target.style.backgroundColor = id

        }

    }
}
function allowDrop(event) {
    event.preventDefault()
}
