import { useCallback } from "react";
import { BooksService } from "../../services";
import { useBooksStore } from "../../store/Books/bookStore";
import toast from "react-hot-toast";
import helperGlobal from "../../utils/helpers";

function useBooks() {
    const {
        books = [],
        total = 0,
        isLoading,
        setLoading,
        setBooks,
        setError,
    } = useBooksStore();

    const fetchBooks = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const data = await BooksService.getAllBooks(params);
            if(
                helperGlobal.isSetValue(data)
            ) {
                setBooks(data || [], (data && data.length) || 0, 0);
            }
        } catch (_err) {
            setError(_err);
            toast.error(_err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [setLoading, setBooks, setError]);

    return { books, total, isLoading, fetchBooks };
}

export default useBooks;