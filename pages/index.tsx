import { useState } from "react";
import type { MouseEventHandler } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {random} from 'lodash'
import { LazyImage } from "../components/LazyImage";

// generate simple unique id
const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// random number from 1 to 122
const myrandom = () => random(1, 123);

const Home: NextPage = () => {
  const [images, setImages] = useState<Array<IFoxImageItem>>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = () => {
    const id = generateId();
    const url = `https://randomfox.ca/images/${myrandom()}.jpg`;
    setImages([...images, { id, url }]);
    window.plausible("add_fox");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          data-domain="yourdomain.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>

      <main className="flex flex-col items-center justify-center flex-grow py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Imágenes aleatorias de zorros</h1>
        <p className="text-lg text-gray-600 mb-6">¡Haz clic en el botón para agregar una nueva imagen de zorro a la colección!</p>
        <div className="flex justify-center m-4">
          <button
            onClick={addNewFox}
            className="rounded-full bg-gradient-to-r bg-[#141e30] 
                    hover:bg-white 
                     hover:text-[#141e30] 
                     hover:border-[#141e30] 
                     hover:border-2 
                     text-white 
                     font-bold py-3 px-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Agregar nueva imagen
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {images.map(({ id, url }) => (
            <div className="p-4 bg-white rounded-lg shadow-md" key={id}>
              <LazyImage
                src={url}
                width="320"
                height="auto"
                className="mx-auto rounded-md bg-gray-300"
                onClick={() => console.log("--")}
              />
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center py-4">
        <p className="text-gray-400">&copy; 2024 Random Fox Alfredo M Aramburo</p>
      </footer>
    </div>
  );
};

export default Home;