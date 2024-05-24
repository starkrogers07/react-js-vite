import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

export default function ProductView() {
  const [dog, setDog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        // Fetch breed data
        const { data: breed } = await axios.get(
          `https://api.thedogapi.com/v1/breeds/${id}`,
          {
            headers: {
              'x-api-key': import.meta.env.VITE_APP_API_KEY,
            },
          }
        );

        // If breed has a reference image ID, fetch the image URL
        if (breed.reference_image_id) {
          const { data: image } = await axios.get(
            `https://api.thedogapi.com/v1/images/${breed.reference_image_id}`,
            {
              headers: {
                'x-api-key': import.meta.env.VITE_APP_API_KEY,
              },
            }
          );
          breed.image_url = image.url;
        }

        setDog(breed);
      } catch (error) {
        console.error("Error fetching dog data:", error);
      }
    };

    fetchDogData();
  }, [id]);

  if (!dog) {
    return (
      <h1 className="flex items-center justify-center text-white text-center px-5 text-3xl h-screen font-bold uppercase">
        Loading...
      </h1>
    );
  }

  return (
    <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
        <article>
          {dog.image_url && (
            <img
              src={dog.image_url}
              alt={dog.name}
              className="border-4 border-black rounded-lg"
            />
          )}
        </article>
        <article>
          <h1 className="text-3xl font-bold mb-8 lg:text-5xl">{dog.name}</h1>
          <ul className="text-sm leading-loose lg:text-base lg:leading-relaxed">
            <li>
              <span className="font-bold text-lg lg:text-xl">Breed Group:</span>{" "}
              <span className="text-base lg:text-lg">{dog.breed_group}</span>
            </li>
            <li>
              <span className="font-bold text-lg lg:text-xl">Bred For:</span>{" "}
              <span className="text-base lg:text-lg">{dog.bred_for}</span>
            </li>
            <li>
              <span className="font-bold text-lg lg:text-xl">Lifespan:</span>{" "}
              <span className="text-base lg:text-lg">{dog.life_span}</span>
            </li>
            <li>
              <span className="font-bold text-lg lg:text-xl">Origin:</span>{" "}
              <span className="text-base lg:text-lg">{dog.origin ? dog.origin : "NA"}</span>
            </li>
          </ul>
          <Link
            to="/"
            className="inline-block bg-black py-2 px-6 rounded mt-8 text-white hover:bg-slate-800 transition-all duration-200"
          >
            &larr; Back
          </Link>
        </article>
      </div>
    </section>
  );
}
