class GlobalManager {
	constructor() {
		this.tocSel = document.getElementById("TOCSel");
		this.tocSel.addEventListener("change", (evt) => {tocChange(evt.target.value);});
		this.entryField = document.getElementById("EntryField");
		this.entryField.addEventListener("keyup", (evt) => {
			if (evt.key == "Escape") {
				this.entryField.value = "";
			}
			incrementalSearch();
		});
		this.displayField = document.getElementById("DisplayField");
		this.offset = entryData[0][1];
	}
}
const G = new GlobalManager();

G.tocSel.appendChild(document.createElement("option"));
for (let i = 0; i < indexData.length; i++) {
	let name = indexData[i][0];
	let val = indexData[i][1]
	let elem = document.createElement("option");
	elem.text = name;
	elem.value = val;
	G.tocSel.appendChild(elem);
}

G.entryField.focus();

function incrementalSearch() {
	G.tocSel.selectedIndex = 0;
	let iValue = G.entryField.value;
	iValue = iValue.replaceAll(" ", "");
	G.displayField.innerHTML = "";
	if (iValue == "") return;
	const regexp = new RegExp("^" + iValue, "i");
	for (let idx = 1; idx < entryData.length; idx++) {
		const wordsInPage = entryData[idx];
		for (let c of wordsInPage) {
			if (c.match(regexp)) {
				let it = document.createElement("div");
				let anchor = document.createElement("a");
				anchor.innerHTML = c;
				anchor.href = "javascript:openPage(" + (Number(idx) + Number(G.offset)) + ");";
				it.appendChild(anchor);
				G.displayField.appendChild(it);
			}
		}
	}
}

function openPage(page) {
	window.open(entryData[0][0] + page, "検索結果");
	G.entryField.focus();
}

function clearEntry() {
	G.entryField.value = "";
	G.displayField.innerHTML = "";
	G.entryField.focus();
}

function killingTime() {
	const page = Math.trunc(Math.random() * (entryData.length-1)) + 1;
	openPage(page);
}

function tocChange(val) {
	G.entryField.value = "";
	window.open(entryData[0][0]+val, "検索結果");
	G.entryField.focus();
}
