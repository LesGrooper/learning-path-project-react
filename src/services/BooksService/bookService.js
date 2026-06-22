import axiosInstanceBook from '../../api/axiosInstanceBooks';
import helperGlobal from '../../utils/helpers';

class  BooksService {
    constructor(
        helper = helperGlobal,
    ){
        this.helper = helper;
    }
    async getAllBooks({ } = {}) {
        try {
            let getBooks = await axiosInstanceBook.get('/list');
            if(
                this.helper.isSetValue(getBooks) &&
                this.helper.isSetValue(getBooks['status']) &&
                this.helper.isSetValue(getBooks['data']) &&
                this.helper.isSetValue(getBooks['data']['books']) &&
                getBooks['status'] == 200
            ) {
                const data = getBooks['data']['books'];
                return data;
            }
        } catch (_err) {
            console.log(_err)
        }
    }
};

export default new BooksService;