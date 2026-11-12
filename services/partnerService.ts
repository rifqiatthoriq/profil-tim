import { PartnerApiResponse, PartnerUser } from "../types/partner";

const API_URL = "https://dummyjson.com/users?limit=10";

// 1. Menggunakan Promise constructor dengan resolve(), reject(), dan .then()
export function fetchPartnersWithPromise(): Promise<PartnerUser[]> {
  return new Promise((resolve, reject) => {
    // fetch() adalah Pre-built Async Function
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          reject("Gagal mengambil data server (Status: " + response.status + ")");
          return;
        }
        return response.json();
      })
      .then((data: PartnerApiResponse) => {
        if (data && data.users) {
          resolve(data.users);
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
export async function getPartnersAsync(): Promise<PartnerUser[]> {
  const partners = await fetchPartnersWithPromise();
  return partners;
}
