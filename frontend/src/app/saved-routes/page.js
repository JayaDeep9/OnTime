"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { userAPI } from "@/lib/api";
import toast from "react-hot-toast";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState([]);

  const loadRoutes = async () => {
    try {
      const res = await userAPI.getSavedRoutes();
      setRoutes(res.data.routes);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load saved routes");
    }
  };

  const deleteRoute = async (id) => {
    try {
      await userAPI.deleteRoute(id);
      toast.success("Route deleted");
      loadRoutes();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadRoutes();
    };
    init();
  }, []);

  return (

    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-extrabold mb-6">⭐ Saved Routes</h1>
        <p className="text-muted-foreground mb-10">Your favorite travel routes at one place.</p>

        {routes.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            No saved routes yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {routes.map((route) => (
              <div
                key={route._id}
                className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">{route.routeName}</h2>

                  <p className="text-muted-foreground mt-1">
                    From: <span className="text-foreground">{route.sourceStation}</span>
                  </p>

                  <p className="text-muted-foreground">
                    To: <span className="text-foreground">{route.destinationStation}</span>
                  </p>

                  <p className="text-muted-foreground">
                    Time: <span className="text-foreground">{route.preferredTime}</span>
                  </p>

                  <p className="text-sm text-muted-foreground mt-2">
                    Saved on: {new Date(route.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteRoute(route._id)}
                  className="bg-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-md"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
