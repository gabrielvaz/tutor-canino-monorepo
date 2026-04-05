'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Breed } from '@tutorcanino/data';

interface BreedVideosProps {
  videos: Breed['videos_youtube'];
  breedName: string;
}

export function BreedVideos({ videos, breedName }: BreedVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
          <Play size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">
          Vídeos sobre {breedName}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-gray-100">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.titulo}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <Play size={48} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button
                  className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                  onClick={() => window.open(video.url, '_blank')}
                  aria-label={`Assistir ${video.titulo}`}
                >
                  <Play size={24} className="ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2" title={video.titulo}>
                {video.titulo}
              </h3>
              {video.canal && (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <span>Fonte:</span>
                  <span className="font-medium">{video.canal}</span>
                </p>
              )}
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}
