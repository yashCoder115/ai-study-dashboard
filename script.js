function summarize(){

let text = document.getElementById("inputText").value

if(text.length === 0){
alert("Enter some text")
return
}

let sentences = text.split(".")

let summary = sentences.slice(0,3).join(".")

typeWriter(summary)

}

function typeWriter(text){

let i = 0
let speed = 25

document.getElementById("summary").innerText = ""

function typing(){

if(i < text.length){

document.getElementById("summary").innerText += text.charAt(i)

i++

setTimeout(typing, speed)

}

}

typing()

}
/* WORD COUNTER */

document.getElementById("inputText").addEventListener("input", function(){

let words = this.value.trim().split(/\s+/)

let count = this.value.length === 0 ? 0 : words.length

document.getElementById("wordCount").innerText =
"Words: " + count

})

/* COPY SUMMARY */

function copySummary(){

let text = document.getElementById("summary").innerText

navigator.clipboard.writeText(text)

alert("Summary copied!")

}

/* DARK MODE */

function toggleMode(){

document.body.classList.toggle("light")

}
document.getElementById("fileUpload").addEventListener("change", function(event){

let file = event.target.files[0]

if(!file) return

/* PDF FILE */

if(file.type === "application/pdf"){

let reader = new FileReader()

reader.onload = function(){

let typedarray = new Uint8Array(this.result)

pdfjsLib.getDocument(typedarray).promise.then(function(pdf){

let pages = []

for(let i = 1; i <= pdf.numPages; i++){

pages.push(
pdf.getPage(i).then(function(page){

return page.getTextContent().then(function(text){

return text.items.map(item => item.str).join(" ")

})

})

)

}

Promise.all(pages).then(function(texts){

document.getElementById("inputText").value = texts.join(" ")

})

})

}

reader.readAsArrayBuffer(file)

}

/* IMAGE FILE */

else if(file.type.startsWith("image/")){

Tesseract.recognize(
file,
"eng",
{ logger: m => console.log(m) }
).then(({ data: { text } }) => {

document.getElementById("inputText").value = text

})

}

else{

alert("Upload PDF or Image")

}

})
let uploadArea = document.getElementById("uploadArea")

uploadArea.addEventListener("dragover", function(e){
e.preventDefault()
uploadArea.style.borderColor = "#22c55e"
})

uploadArea.addEventListener("dragleave", function(){
uploadArea.style.borderColor = ""
})
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
dx:(Math.random()-0.5),
dy:(Math.random()-0.5)
});
}

function animateParticles(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,0.3)";
ctx.fill();

p.x+=p.dx;
p.y+=p.dy;

if(p.x<0||p.x>canvas.width) p.dx*=-1;
if(p.y<0||p.y>canvas.height) p.dy*=-1;
});

requestAnimationFrame(animateParticles);
}

animateParticles();