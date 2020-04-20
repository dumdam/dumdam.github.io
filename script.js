var cats = ["sensation", "feeling", "sens-sure", "feel-sure", "sens-result", "make-more", "length-samsara", "liberation", "door", "door-sure"];
var text_cats = ["sens-cause", "door-cause"];

var memory = [];

var all_radios = false;
var all_texts = false;

class sensation {
    constructor(cause,type,door,feeling,result,samsara){
        this.cause = cause;
        this.type = type;
        this.door = door;
        this.feeling = feeling;
        this.result = result;
        this.samsara = samsara;
    }
}

function is_checked(name){
    var radios = document.getElementsByName(name);
    
    for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked == true) {
            return true;
        }
    }

    return false;
}

function not_empty(name){
    var text = document.getElementsByName(name);

    return (text[0].value == "");
}

function clear_radios(){
    cats.forEach(ele => {
        let elements = document.getElementsByName(ele);
        elements.forEach(radio => {
            radio.checked = false;
        });
    });

    all_radios = false;
}

function clear_texts(){
    text_cats.forEach(ele => {
        let elements = document.getElementsByName(ele);
        elements.forEach(tex => {
            tex.value = "";
        });
    });

    all_texts = false;
}

function get_radio(name){
    var radios = document.getElementsByName(name);
    
    for (let j = 0; j < radios.length; j++) {
        if (radios[j].checked == true) {
            return radios[j].value;
        }
    }

    return false;
}

function get_text(name){
    var text = document.getElementsByName(name);

    return text[0].value;
}

function go_next(){
    if (all_radios && all_texts) {
        
        memory.push(new sensation(
            get_text("sens-cause"),
            get_radio("sensation"),
            get_radio("door"),
            get_radio("feeling"),
            get_radio("sens-result"),
            get_radio("length-samsara")
        ));

        clear_radios();
        clear_texts();
        window.scrollTo(0, 0);
    }
}

function reset_form(){
    clear_radios();
    clear_texts();
}

function finish_up(){
    let count = memory.length;
    let line = `<div> <p>Total sensations: ${count} </p></div>`;

    let res = "";
    memory.forEach(ele =>{
        res += `<div> <p> ${ele.cause} => ${ele.type} => ${ele.door} => ${ele.feeling} => ${ele.result} => lengthen samsara: ${ele.samsara} </p> </div>`;
    });

    line += res;

    document.getElementById("sensation").style.display = "none";
    document.getElementById("door").style.display = "none";
    document.getElementById("control").style.display = "none";

    document.getElementById("result").style.display = "block";
    document.getElementById("show").innerHTML = line;
}

function start_again(){
    document.getElementById("result").style.display = "none";
    memory = [];
    clear_texts();
    clear_radios();

    document.getElementById("sensation").style.display = "block";
    document.getElementById("door").style.display = "block";
    document.getElementById("control").style.display = "block";
}

document.addEventListener("change",function(e){
    if(e.target.type == "radio"){
        var i;
        for (i = 0; i < cats.length; i++) {
            if (!is_checked(cats[i])) {
                break;
            }
        }
        if (i == cats.length) {
            all_radios = true;
            go_next();
        }else{
            all_radios = false;
        }
    }
});

document.addEventListener("focusout", function(e){
    if (e.target.type == "text") {
        var k;
        for (k = 0; k < text_cats.length; k++) {
            if (not_empty(text_cats[k])) {
                break;
            }
        }

        if (text_cats.length == k) {
            all_texts = true;
            go_next();
        }else{
            all_texts = false;
        }
    }
});