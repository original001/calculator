import Matrix from './Matrix'

class OutputMatrix extends Matrix {
    writeToTable(array){
        this.$rows.each((indRow, row)=>{
            $(row).find(this.$inputs).each((indInput, input)=>{
                $(input).val(array[indRow][indInput])
            })
        });
        return this
    }
}

export default OutputMatrix