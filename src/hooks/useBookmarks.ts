
import * as React from "react";

interface Bookmark {
  id: string;
  timestamp: string;
  title: string;
  messages: any[];
  experts: any[];
}
type BookmarksMap = Record<string, Bookmark>;

function getBookmarks(): BookmarksMap {
  if (typeof window === "undefined") return {};
  try {
    const val = localStorage.getItem("agora_bookmarks");
    return val ? JSON.parse(val) : {};
  } catch {
    return {};
  }
}
function setBookmarks(bm: BookmarksMap) {
  try {
    localStorage.setItem("agora_bookmarks", JSON.stringify(bm));
  } catch {}
}

export function useBookmarks() {
  const [bookmarks, setBookmarksState] = React.useState<BookmarksMap>(getBookmarks());

  const addBookmark = (bookmark: Bookmark) => {
    const updated = { ...getBookmarks(), [bookmark.id]: bookmark };
    setBookmarks(updated);
    setBookmarksState(updated);
  };

  const isBookmarked = (id: string) => {
    return !!bookmarks[id];
  };

  // Optionally: expose more actions (remove, list, etc.) for extension

  React.useEffect(() => {
    setBookmarksState(getBookmarks());
  }, []);

  return {
    bookmarks,
    addBookmark,
    isBookmarked,
  };
}
