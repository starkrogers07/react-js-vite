import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ListView() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const observer = useRef();

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await axios.get("https://api.thedogapi.com/v1/breeds", {
          headers: {
            'x-api-key': import.meta.env.VITE_APP_API_KEY
          },
          params: {
            limit,
            page
          }
        });
        setBreeds(prevBreeds => [...prevBreeds, ...res.data]);
      } catch (error) {
        console.error("Error fetching dog data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogData();
  }, [page]);

  const lastBreedElementRef = useRef();

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    const callback = entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (lastBreedElementRef.current) observer.current.observe(lastBreedElementRef.current);
  }, [loading]);

  if (error) {
    return (
      <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
        Error loading data
      </h1>
    );
  }

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl">
          Dog Discovery
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20">
        {breeds.map((breed, index) => (
          <Link
            to={`/${breed.id}`}
            key={`${breed.id}-${index}`} // Use a combination of breed.id and index
            ref={index === breeds.length - 1 ? lastBreedElementRef : null}
            className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition-all duration-200"
          >
            <article>
              {breed.reference_image_id ? (
                <img
                  src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`}
                  alt={breed.name}
                  className="rounded-t-lg md:h-36 w-full object-contain"
                />
              ) : (
                <div className="rounded-t-lg md:h-36 w-full object-contain bg-gray-500 flex items-center justify-center">
                  <span className="text-white">No Image</span>
                </div>
              )}
              <h3 className="text-white text-lg font-bold mt-4 text-center">
                {breed.name}
              </h3>
              <p className="text-white text-center">
                Bred For: {breed.bred_for}
              </p>
            </article>
          </Link>
        ))}
      </div>

      {loading && (
        <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl font-bold uppercase">
          Loading...
        </h1>
      )}
    </section>
  );
}
