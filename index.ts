export {};
window.onload = () => {
    const th = localStorage.getItem("theme");
    if (th) {
        document.body.classList.forEach(className => {
            document.body.classList.remove(className);
        });
        const themeRadio = document.getElementById("r" + th) as HTMLInputElement;
        if (themeRadio) {
            themeRadio.checked = true;
        }
        document.body.classList.add("theme" + th);
    }else{
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (prefersDarkScheme.matches) {
            const r1 = document.getElementById("r1") as HTMLInputElement;
            if (r1) {
                r1.checked = true;
            }
            document.body.classList.add("theme1");
        } else {
            document.body.classList.forEach(className => {
                document.body.classList.remove(className);
            });
            const r2 = document.getElementById("r2") as HTMLInputElement;
            if (r2) {
                r2.checked = true;
            }
            document.body.classList.add("theme2");
        }
    }
};
let calcScreen:HTMLInputElement | null = document.getElementById("screen") as HTMLInputElement;
let radio:(HTMLInputElement | null) [] = [];  
let keyNum:(HTMLElement | null)[] = [];
let keyOperation: (HTMLElement | null)[] = [];
let keyControl:(HTMLElement | null)[] = [document.getElementById("reset"),document.getElementById("equal")];
let _calc:string = "" ;
let Number:number[] = [];
let operations:string[]= [];
let result:number ;
let delKey:HTMLElement | null = document.getElementById("opr-1"); 
for (let i = 0; i < 10; i++) {
    keyNum[i] = document.getElementById("num-"+i);
}
for (let i = 1; i < 4; i++) {
    radio[i] = document.getElementById("r"+i) as HTMLInputElement;
    radio[i]?.addEventListener("change", 
        ()=>{
            localStorage.setItem("theme",i.toString());
            document.body.classList.forEach(className => {
                document.body.classList.remove(className);
            });
            document.body.classList.add("theme"+i);
        }
    )
}


if (keyControl[1]) {
    keyControl[1].addEventListener("click", calc);
}

if (keyControl[0]) {
    keyControl[0].addEventListener("click", reset);
}

if (delKey) {
    delKey.addEventListener("click", del);
}

for (let i = 2; i < 6; i++) {
    keyOperation[i] = document.getElementById("opr-"+i);
}


[...keyNum,...keyOperation].map((key, index) => {
    if (key) {
        key.addEventListener("click", () => {
            if (calcScreen) {  
                _calc +=  key.innerHTML;
                _calc = _calc.replace(/x/g, "*");
                calcScreen.value = _calc;
            }
        });
    }
});

function del(){
    if (calcScreen) {
    _calc  = _calc.slice(0,-1);
    calcScreen.value = _calc;
    }
}

function reset(){
    if (calcScreen) {
        _calc  = "";
        calcScreen.value = _calc;
    }
}

function calc() {
    try{
    if (_calc.match(/[0-9+-/*]+/)) {
      _calc = eval(_calc).toString();
      if (calcScreen) {
          calcScreen.value = _calc.toString();
      }
    }
    } catch (error) {
        console.error("Calculation error:", error);
        if (calcScreen) {
            calcScreen.value = "Error";
        }
    }
}

