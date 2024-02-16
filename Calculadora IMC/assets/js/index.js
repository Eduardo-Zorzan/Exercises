function main () {
    const form = document.querySelector('form')
    const peso = document.querySelector('.peso')
    const altura = document.querySelector('.altura')
    const resultadoMostrar = form.querySelector('.result')
    let resultadoEscrito

    function IMC (pesop, alturap) {
        const IMC = pesop / alturap ** 2
        return IMC
    }
    function notReload (parameter) {
        parameter.preventDefault()
        const pesoValue = peso.value
        const alturaValue = altura.value
        let resultado = IMC(pesoValue, alturaValue)
        resultado = parseFloat(resultado)
        if (resultado) {
            resultado = resultado.toFixed(1)
            if (resultado < 18.5) {
                resultadoEscrito = 'peso abaixo do normal'
            } 
            else if (resultado >= 18.5 && resultado <= 24.9) {
                resultadoEscrito = 'peso normal'
            }
            else if (resultado >= 25 && resultado <= 29.9) {
                resultadoEscrito = 'sobrepeso'
            }
            else if (resultado >= 30 && resultado <= 34.9) {
                resultadoEscrito = 'obesidade grau 1'
            }
            else if (resultado >= 35 && resultado <= 39.9) {
                resultadoEscrito = 'obesidade grau 2'
            }
            else {
                resultadoEscrito = 'obesidade grau 3'
            }
            resultadoMostrar.innerHTML = `<div class="result-true"><p>O seu IMC é ${resultado}, ou seja você está com ${resultadoEscrito}<p><div>`
        }
        else {
            resultadoMostrar.innerHTML = `<div class="result-true"><p>Coloque apenas números por favor<p><div>`
        }
    }
    form.addEventListener('submit', notReload)
}

main()