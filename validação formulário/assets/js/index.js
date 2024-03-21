class StandardInput {
    constructor(NameOfClass) {
        this.NameOfClass = NameOfClass;
        this.input = document.querySelector(`.${NameOfClass} input`);
    }
    changeBackground(condition) {
        if (condition) this.input.style.background = 'white';
        else this.input.style.background = 'red'
    }
    verifyEmpty() {
        return this.input.value
    }
    basicVerification() {
        this.changeBackground(this.verifyEmpty())
    }
}


class LimitedCharactersNoSymbols extends StandardInput {
    constructor(NameOfClass, min, max) {
        super(NameOfClass)
        this.characters = 'abcdefghijklmnopqrstuvwxyz123456789 ';
        this.min = min;
        this.max = max;
    }
    noSymbols() {
        for (let i of this.input.value) {
            let validator = false;
            for (let a of this.characters) {
                if (i === a) validator = true;
            }
            if (!validator) return false
        }
        return true
    }
    minMaxLength() {
        let inputLength = this.input.value.length;
        return (inputLength <= this.max && inputLength >= this.min);
    }
    allVerifications() {
        this.basicVerification()
        this.changeBackground(this.minMaxLength() && this.noSymbols())
    }
}

class ValidacaoCpf extends StandardInput {
    constructor(NameOfClass) {
        super(NameOfClass)
        this.cpf = this.input;
        this.numeroLimpo;
        this.numeroLimpoArray = [];
        this.verdadeiro;
    }

    limparCPF() {
        this.numeroLimpo = this.cpf.value;
        for (let i = 0; i < this.numeroLimpo.length; i++) {
            if (this.numeroLimpo[i] !== '.' && this.numeroLimpo[i] !== '-'){
                this.numeroLimpoArray.push(this.numeroLimpo[i])
            } else {
                continue
            }
        }
        return this.numeroLimpoArray
    }

    esquecerCPF() {
        this.numeroLimpoArray = [];
    }

    converterCPFEmNumero() {
        this.numeroLimpoArray = this.limparCPF().map((value) => parseInt(value))
        return this.numeroLimpoArray
    }

    somaDigitoUm() {
        let acum = 10;
        const somaPrimeiro = this.converterCPFEmNumero().reduce((acumF, valor, indice, array) => {
            if (indice < array.length - 2) {
                acumF += valor * acum
                acum--
            }
        return acumF
        }, 0)
        let primeiroNumero = 11 - (somaPrimeiro % 11);
        if (primeiroNumero > 9 ) primeiroNumero = 0;
        return primeiroNumero
    }

    somaDigitoDois() {
        let acum = 11;
        const somaSegundo = this.numeroLimpoArray.reduce((acumF, valor, indice, array) => {
        if (indice < array.length - 1) {
            acumF += valor * acum
            acum--
        }
            return acumF
        }, 0)
        let segundoNumero = 11 - (somaSegundo % 11);
        if (segundoNumero > 9 ) segundoNumero = 0;
        return segundoNumero
    }

    verificarSequencia() {
        const possivelSequencia = this.numeroLimpoArray.filter((valor) => valor === this.numeroLimpoArray[0])
        return !(possivelSequencia.length === 11)
    }

    verificacaoUm() {
        return this.somaDigitoUm() === this.numeroLimpoArray[9];
    }
    
    verificacaoDois() {
        return this.somaDigitoDois() === this.numeroLimpoArray[10];
    }

    verificacaoGeral() {
        return this.verificacaoUm() && this.verificacaoDois() && this.verificarSequencia();
    }
    allVerifications() {
        this.basicVerification();
        this.changeBackground(this.verificacaoGeral());
        this.esquecerCPF()
    }
}

class Password extends StandardInput {
    constructor(NameOfClass, ClassOfRepeated, min, max, symbolsP, upperCaseP, numberP) {
        super(NameOfClass);
        this.ClassOfRepeated = ClassOfRepeated;
        this.inputRepeated = document.querySelector(`.${ClassOfRepeated} input`);
        this.min = min;
        this.max = max;
        this.symbolsP = symbolsP;
        this.upperCaseP = upperCaseP;
        this.numberP = numberP;
        this.symbolsString = '!@#$%¨&*()_-+/?><;:';
        this.alphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇ';
        this.numbersString = '123456789';
    }

    minMaxLength() {
        let inputLength = this.input.value.length
        return inputLength >= this.min && inputLength <= this.max;
    }

    comparator(string) {
        for (let i of string) {
            for (let a of this.input.value) {
                if(i === a) return true
            }
        }
        return false
    }

    symbols() {
        if (!this.symbolsP) return true
        return this.comparator(this.symbolsString)
    }
    upperCase() {
        if (!this.upperCaseP) return true
        return this.comparator(this.alphabetString)
    }
    number() {
        if (!this.numberP) return true
        return this.comparator(this.numbersString)
    }

    repeatedPassword() {
        let backgroundRepeatedPassword;
        if (this.input.value === this.inputRepeated.value && this.input.value) backgroundRepeatedPassword = 'white'
        else backgroundRepeatedPassword = 'red'
        this.inputRepeated.style.background = backgroundRepeatedPassword;
        return (this.input.value === this.inputRepeated.value)
    }
    
    allVerifications() {
        this.basicVerification();
        const isValid = this.minMaxLength() && this.symbols() && this.upperCase() && this.number();
        this.changeBackground(isValid);
        return this.repeatedPassword() && isValid;
    }
}

const nameInput = new StandardInput('input-name')
const lastNameInput = new StandardInput('input-lastName')
const user = new LimitedCharactersNoSymbols('input-user', 3, 12)
const cpf = new ValidacaoCpf('input-CPF')
const password = new Password('input-password', 'input-repeatedPassword', 6, 12, true, true, true)
document.addEventListener('click', (event) => {
    const ev = event.target;
    if(ev.classList.contains('send-button')) {
        nameInput.basicVerification()
        lastNameInput.basicVerification()
        user.allVerifications()
        cpf.allVerifications()
        password.allVerifications()
    }
})