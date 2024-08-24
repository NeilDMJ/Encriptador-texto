const doc = document;
const textArea = doc.querySelector(".entrada__formulario");
const imagen  = doc.querySelector(".img__resultado");
const cargando = doc.querySelector(".loader");
const resultadoTitulo = doc.querySelector(".titulo__resultado");
const resultadoTexto = doc.querySelector(".texto__resultado")
const botonEncriptar = doc.querySelector(".encriptar");
const botonDesencriptar = doc.querySelector(".desencriptar");
const botonCopiar = doc.querySelector(".botonCopiar");


const llaves = [
    ["a", "ai"],
    ["e","enter"],
    ["i","imes"],
    ["o","ober"],
    ["u","ufat"]
];
//encriptamiento
function encriptar(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++){
            if(letra === llaves[j][0]){
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}
//desencriptamiento
function desencriptar(mensaje){
    let mensajeDes = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDes = mensajeDes.replace(regex, llaves[i][0]);
    }
    return mensajeDes;
}

textArea.addEventListener("input", (e)=>{
    imagen.style.display = "none";
    cargando.classList.remove("hidden");
    resultadoTitulo.textContent = "Capturando mensaje.";
    resultadoTexto.textContent = "";
})

botonEncriptar.addEventListener("click",(e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEn = encriptar(mensaje);
    resultadoTexto.textContent = mensajeEn;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es: "
})

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDes = desencriptar(mensaje);
    resultadoTexto.textContent = mensajeDes; 
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El resultado es: ";
});

botonCopiar.addEventListener("click",()=>{
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        imagen.style.display = "block";
        cargando.classList.add("hidden");
        resultadoTitulo.textContent = "El texto se copio";
        botonCopiar.style.display = "none";
        resultadoTexto.textContent = "";
    })
})