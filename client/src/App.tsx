import React, { useEffect, useMemo, useState } from "react";

import type { Book } from "./components/types";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookSearchSortFilter from "./components/BookSearchSortFilter";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import {
  getAddBook,
  getAllBook,
  getDeleteBook,
  getEditBook,
} from "./store/slices/bookSlice";
import "./components/loading.css";

const App: React.FC = () => {
  const loading = useSelector((state: any) => state.books.loading);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Book> | undefined>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"title" | "year">("title");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const books = useSelector((state: any) => {
    return state.books.book;
  });
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllBook());
  }, []);
  // useEffect(() => {
  //     dispatch(getAllBook({}));
  //   }, []);
  const categories = useMemo(
    () => Array.from(new Set(books.map((b) => b.category))).sort(),
    [books]
  );
  const handleDelete = (id: string) => {
    const ok=window.confirm("Ban co chac chan muon xoa?");
    if(!ok) return;
    dispatch(getDeleteBook(id));
  };
  const handleSubmit = (data: {
    id?: string;
    title: string;
    author: string;
    year: number;
    category: string;
  }) => {
    if (data.id) {
      dispatch(getEditBook(data));
    } else {
      dispatch(getAddBook(data));
    }
    setOpenForm(false);
  };

  const filteredSorted = useMemo(() => {
    let out = books.slice();
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }
    if (category !== "all") out = out.filter((b) => b.category === category);

    out.sort((a, b) => {
      if (sortBy === "title") {
        const r = a.title.localeCompare(b.title);
        return sortDir === "asc" ? r : -r;
      } else {
        const r = a.year - b.year;
        return sortDir === "asc" ? r : -r;
      }
    });
    return out;
  }, [books, search, category, sortBy, sortDir]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📚 Book Library Manager</h1>

      <Button
        variant="contained"
        onClick={() => {
          setEditing(undefined);
          setOpenForm(true);
        }}
      >
        Add Book
      </Button>

      <div className="mt-4">
        <BookSearchSortFilter
          search={search}
          category={category}
          sortBy={sortBy}
          sortDir={sortDir}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={(by, dir) => {
            setSortBy(by);
            setSortDir(dir);
          }}
          onClear={() => {
            setSearch("");
            setCategory("all");
            setSortBy("title");
            setSortDir("asc");
          }}
        />
      </div>

      <BookList
        books={filteredSorted}
        onEdit={(b) => {
          setEditing(b);
          setOpenForm(true);
        }}
        onDelete={handleDelete}
      />

      <BookForm
        open={openForm}
        initial={editing}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
