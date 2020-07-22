"use strict"

function healhp(){
	let hp=document.getElementById("hp").textContent;
	let newhp=0;
	let final="";
	hp=hp.split("/");
	if(Number(hp[0])<Number(hp[1])){
		newhp=Number(hp[0])+1;
	}
	else {
		newhp=Number(hp[0]);w
	}
	final=newhp+"/"+hp[1];
	document.getElementById("hp").textContent=final;
}

function damagehp(){
	let hp=document.getElementById("hp").textContent;
	let newhp=0;
	let final="";
	hp=hp.split("/");
	if(Number(hp[0])>0){
		newhp=Number(hp[0])-1;
	}
	final=newhp+"/"+hp[1];
	document.getElementById("hp").textContent=final;
}