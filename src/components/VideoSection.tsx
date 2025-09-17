import { Play } from 'lucide-react';

const VideoSection = () => {
  // Placeholder video data
  const videos = [
    {
      id: "dQw4w9WgXcQ", // Placeholder YouTube ID
      title: "Sermon : La Foi qui Transforme",
      description: "Un message puissant sur la foi et la transformation spirituelle.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    }
  ];

  const handleVideoClick = (videoId: string) => {
    // In real implementation, this would open the video
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section id="videos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vidéos{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Spirituelles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Regardez les sermons et moments spirituels qui inspirent et transforment les vies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="fade-in">
              <div className="bg-card rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-divine)] transition-all duration-300">
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Play size={32} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{video.title}</h3>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Placeholder for more videos */}
          <div className="bg-card/50 border-2 border-dashed border-muted rounded-xl p-8 text-center fade-in">
            <div className="text-muted-foreground">
              <Play size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Plus de vidéos à venir</p>
              <p className="text-sm">
                Intégration YouTube ou fichiers locaux à configurer
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-secondary/50 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-muted-foreground text-sm">
              <strong>Note :</strong> Les vidéos peuvent être intégrées via YouTube, Vimeo, 
              ou hébergées localement selon vos préférences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;