"use strict"

function changeHp(isHealed) {
	let oldHp = (document.getElementById("hp").textContent).split("/");
	let actualHp = Number(oldHp[0]);
	let maxHp = Number(oldHp[1]);
    let newHp = 0;
    let final = "";

    if (isHealed) {
		newHp = actualHp + (actualHp < maxHp);
    } else {
		newHp = actualHp - (actualHp > 0);
    }
    
    final = newHp + "/" + maxHp;
    document.getElementById("hp").textContent = final;
}