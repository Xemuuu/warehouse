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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Test połączenia 🎯</h1>
      <div className="bg-secondary rounded-lg p-6">
        <ul className="space-y-2">
          {products.map((p, i) => (
            <li key={i} className="text-foreground">{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
