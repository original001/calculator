import Matrix from './Matrix'

class OutputMatrix extends Matrix {
    constructor(options){
        super(options);
        this.array = options.array || []
    }

    set array(array){
        this.$rows.each((indRow, row)=>{
            $(row).find(this.$inputs).each((indInput, input)=>{
                $(input).val(array[indRow][indInput])
            })
        });
    }
}

export default OutputMatrix