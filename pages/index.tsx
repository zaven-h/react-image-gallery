import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ImageCard from '../components/ImageCard';

interface ImageType {
  id: string;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<any> | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/images');
        const data = await response.json();
        setResults(data)
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [])

  const filteredResult = useMemo(() => {
    if (!searchTerm) return results;

    return results?.filter(result => result.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [results, searchTerm])

  return (
    <div className="py-4 container mx-auto">
      <div className="bg-white border p-6 rounded shadow">
        <div className="container mx-auto text-black">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            id="searchfield"
            type="search"
            autoFocus
            placeholder="Search images"
            className="shadow appearance-none border rounded w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 leading-normal text-xl lg:text-2xl"
          />
        </div>
        <div className="pt-10">
          {isLoading && (
            <div className="flex items-center justify-center ">
              <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
          {filteredResult?.length === 0 && 'No Results'}
          {filteredResult && (
            <div>
              {filteredResult.map((result: ImageType, index: number) => (
                <ImageCard key={`result-${index}`} thumbnailUrl={result.thumbnailUrl} title={result.title} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
