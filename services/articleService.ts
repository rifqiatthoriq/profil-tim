import { Article, ArticleApiResponse } from "../types/article";

const API_URL = "https://dummyjson.com/posts?limit=10";

// 1. Menggunakan Promise constructor dengan resolve(), reject(), dan .then()
export function fetchArticlesWithPromise(): Promise<Article[]> {
  return new Promise((resolve, reject) => {
    // fetch() adalah Pre-built Async Function
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          reject("Gagal mengambil data server. Kode status: " + response.status);
          return;
        }
        return response.json();
      })
      .then((data: ArticleApiResponse) => {
        if (data && data.posts) {
          resolve(data.posts);
        } else {
          reject("Format data dari API tidak sesuai.");
        }
      })
      .catch((error) => {
        reject("Koneksi gagal: " + error.message);
      });
  });
}

// 2. Custom Async Function menggunakan async / await
export async function getTeamArticles(): Promise<Article[]> {
  const articles = await fetchArticlesWithPromise();
  return articles;
}
