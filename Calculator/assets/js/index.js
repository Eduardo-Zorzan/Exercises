function Calculator () {
    this.input = document.querySelector('.calculator input')
    this.start = () => {
        listeners()
    }
    const listeners = () => {
        document.addEventListener('click', (parameter) => {
            let event = parameter.target 
            if (event.classList.contains('button')) addInInput(event);
            if (event.classList.contains('delete')) deleteOne();
            if (event.classList.contains('C')) deleteAll();
            if (event.classList.contains('equal')) equal();
        })
        document.addEventListener('keydown', (parameter) => {
            if (parameter.key === 'Enter') equal();
        })
    }
    const addInInput = (parameter) => {
        let element = document.querySelector(`.${parameter.classList[1]}`);
        this.input.value += element.innerText
    }
    const deleteOne = () => this.input.value = this.input.value.slice(0, -1);
    const deleteAll = () => this.input.value = ' ';
    const equal = () => {
        for (let i in this.input.value) {
            try {
                this.input.value = eval(this.input.value)
            } catch {
                deleteOne()
                continue
            }
        }
    }
}

const calculator = new Calculator();
calculator.start()