import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Book } from "../../components/types";
export const getAllBook = createAsyncThunk("getAllBook", async () => {
  try {
    const res: any = await axios.get(`http://localhost:8080/books`);
    // return res.data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(res.data);
      }, 3000);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
});
export const getAddBook = createAsyncThunk(
  "getAddBook",
  async (new_Book: Book) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/books",
        new_Book
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getDeleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string) => {
    await axios.delete(`http://localhost:8080/books/${id}`);
    return id;
  }
);

export const getEditBook = createAsyncThunk(
  "books/editBook",
  async (data: Book) => {
    await axios.put(`http://localhost:8080/books/${data.id}`, data);
    return data;
  }
);
const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBook.pending, () => {})
      .addCase(getAllBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getAddBook.fulfilled, (state, action) => {
        state.book.push(action.payload);
      })
      .addCase(getDeleteBook.fulfilled, (state, action) => {
        state.book = state.book.filter((b) => b.id !== action.payload);
      })
      .addCase(getEditBook.fulfilled, (state, action) => {
        state.book = state.book.map((b) =>
          b.id === action.payload.id ? action.payload : b
        );
      });
  },
});
export default bookSlice.reducer;

// import type { Book, BookPagination, PageAble } from "../components/types";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState : BookPagination = {
//     books : [] ,
//     totalPage : 0
// };

// export const addBook = createAsyncThunk("book/addBook" ,async(book : Book) => {
//     const response = await axios.post("http://localhost:8080/books",book);
//     return response.data;
// });

// export const getAllBook = createAsyncThunk("book/getAllBook", async ({page ,size , search} : PageAble) => {
//     const response = await axios.get(`http://localhost:8080/books?_page=${page}&_limit=${size}&title_like=${search}`);
//     return {
//         books: response.data,
//         totalPage: Math.ceil(+response.headers["x-total-count"] / size) // Tính tổng số trang
//     };
// });

// export const updateBook = createAsyncThunk("book/updateBook" ,async(book : Book ) => {
//     const response = await axios.put(`http://localhost:8080/books/${book.id}`,book);
//     return response.data;
// });

// export const deleteBook = createAsyncThunk("book/deleteBook" ,async(id : number) => {
//      await axios.delete(`http://localhost:8080/books/${id}`);
//     return id ;
// });

// const bookSlice = createSlice({
//     name : "book",
//     initialState,
//     reducers : {} ,
//     extraReducers : (builder) => {
//         builder
//         .addCase(getAllBook.fulfilled, (state,action) => {
//             return state = {
//                 books : action.payload.books ,
//                 totalPage : action.payload.totalPage
//             };

//         })
//         .addCase(addBook.fulfilled , (state , action) => {
//             state.books.push(action.payload);
//         })

//         .addCase(updateBook.fulfilled,(state , action) => {
//              state.books.map((book) => book.id === action.payload.id ? action.payload : book);
//         })
//         .addCase(deleteBook.fulfilled , (state , action) => {

//                state.books = state.books.filter((book) => book.id !== action.payload)

//         });

//     }
// });
// export default bookSlice.reducer ;
