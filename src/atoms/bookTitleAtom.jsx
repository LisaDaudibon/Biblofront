import { atomWithStorage } from "jotai/utils";

export const bookTitleAtom = atomWithStorage(
  // book_id: null,
  "book_title", null
  // book_pages: null,
  // book_published_date: null,
  // book_author: null
  // book_category: null,
  // book_description: null,
  // book_image_url: null
);


