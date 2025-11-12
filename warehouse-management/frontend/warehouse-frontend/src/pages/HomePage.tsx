import { useEffect, useState } from "react";
import { apiClient } from "@/shared/lib/api/client";
import { API_ENDPOINTS } from "@/shared/lib/api/endpoints";

function HomePage() {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    apiClient
      .get<string[]>(API_ENDPOINTS.TEST)
      .then((response) => setProducts(response.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test połączenia 🎯</h1>
      <ul className="list-disc pl-6">
        {products.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
