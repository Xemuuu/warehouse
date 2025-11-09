import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching data:", err));
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

export default App;
