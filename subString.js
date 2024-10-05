class subString {
    putWords (word1, word2) {
        this.biggerSubString = 0;
        this.table = [];
        this.stringTable = ' ';
        this.word1 = word1;
        this.word2 = word2;
        for (let i of word1) {
            let collum = [];
            for (let a of word2) collum.push(0);
            this.table.push(collum)
        }
        this.compareWords();
        return this.stringTable;
    } 
 
    compareWords() {
        for (let i in this.table) {
            for (let a in this.table[i]) {
                if (this.word1[i] !== this.word2[a]) {
                    this.diferents(i, a);
                } else {
                    this.equals(i, a);
                }
                this.defineBigger(i, a);
            }
            this.createView(i);
        }
        this.biggerSubString = ` the bigger substring is ${this.biggerSubString }`
    }

    diferents(index1, index2) {
        try {
            if (isNaN(this.table[index1 - 1][index2])) throw new Error(NaN);
            if (this.table[index1][index2 - 1] === undefined) this.table[index1][index2] = this.table[index1 - 1][index2];
            else {
                if (this.table[index1 - 1][index2] > this.table[index1][index2 - 1]) {
                    this.table[index1][index2] = this.table[index1 - 1][index2];
                } else this.table[index1][index2] = this.table[index1][index2 - 1];
            }
        } catch {
            if (this.table[index1][index2 - 1] === undefined) this.table[index1][index2] = 1;
            else this.table[index1][index2] = this.table[index1][index2 - 1];
        }
    }

    equals (index1, index2) {
        try {
            if (isNaN(this.table[index1 - 1][index2 - 1]) || this.table[index1 - 1][index2 - 1] === undefined) {
                this.table[index1][index2] = 1;
            } else this.table[index1][index2] = this.table[index1 - 1][index2 - 1] + 1;
        } catch {
            this.table[index1][index2] = 1;
        }
    }

    createView(index) {
        this.stringTable += `\n\ [ ${this.table[index].join(', ')} ]`
    }

    defineBigger(index1, index2) {
        this.biggerSubString = this.table[index1][index2] > this.biggerSubString ? this.table[index1][index2] : this.biggerSubString;
    }
}



const test = new subString();

console.log(test.putWords('photography', 'photographe'))

console.log(test.biggerSubString)

console.log(test.putWords('photographer', 'photographe'))

console.log(test.biggerSubString)
