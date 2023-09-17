import React, { useState } from 'react';
import Head from 'next/head';
// import FileDropzone from '../components/FileDropzone';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [filePath, setFilePath] = useState<string | null>(null);

  const handleFileDrop = (path: string) => {
    setFilePath(path);
  };

  return (
    <div className="container">
    
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">File Upload App</h1>
        <input
          className="px-2 py-1 border rounded mb-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-2 py-1 border rounded mb-2"
          type="text"
          placeholder="Favorite Pokémon"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
        />
        {/* <FileDropzone onFileDrop={handleFileDrop} /> */}
        {filePath && <p className="mt-2">Uploaded File Path: {filePath}</p>}
      </main>
    </div>
  );
};

export default Home;
