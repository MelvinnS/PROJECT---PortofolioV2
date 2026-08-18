import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PhotographyDetail from './PhotographyDetail';
import ShortMovieDetail from './ShortMovieDetail';
import VideoEditingDetail from './VideoEditingDetail';
import GraphicDesignDetail from './GraphicDesignDetail';

export const CreativeDetailPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  if (category === 'photography') {
    return (
      <PhotographyDetail
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    );
  }
  if (category === 'short-movie') {
    return (
      <ShortMovieDetail
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    );
  }
  if (category === 'video-editing') {
    return (
      <VideoEditingDetail
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    );
  }
  if (category === 'graphic-design') {
    return (
      <GraphicDesignDetail
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    );
  }

  // Fallback for unknown category
  return (
    <main className="pb-16">
      <div className="topbar">
        <div className="container-narrow">
          <Link to="/#creative" className="back-link">
            <ArrowLeft className="w-4 h-4" /> Back to Creative Works
          </Link>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <p className="text-[var(--text-dim)]">Creative category not found.</p>
        </div>
      </section>
    </main>
  );
};

export default CreativeDetailPage;
