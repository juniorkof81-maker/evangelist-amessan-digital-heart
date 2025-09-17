import { Play } from 'lucide-react';

const VideoSection = () => {
  // Vidéos du canal YouTube "La Maison de Sagesse"
  const videos = [
    {
      id: "example1", // À remplacer par de vraies URLs YouTube du canal @lamaisondesagesse
      title: "Puiser la Sagesse des Proverbes - Session Matinale",
      description: "Session d'étude biblique matinale avec l'Évangéliste Jacques Amessan, tous les mardis-vendredis à 04h45 GMT.",
      thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
      channelUrl: "https://www.youtube.com/@lamaisondesagesse"
    },
    {
      id: "example2",
      title: "Enseignement sur la Patience et la Prière",
      description: "Message inspirant sur l'importance de la patience et du pouvoir de la prière dans la vie chrétienne.",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      channelUrl: "https://www.youtube.com/@lamaisondesagesse"
    },
    {
      id: "example3",
      title: "Veillée de Prière avec le Collectif des Frères en Christ",
      description: "Moment de prière et d'intercession avec le Collectif des Frères en Christ à Abidjan.",
      thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
      channelUrl: "https://www.youtube.com/@lamaisondesagesse"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="fade-in">
              <div className="bg-card rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-divine)] transition-all duration-300 group">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <Play size={48} className="mx-auto mb-3 text-primary opacity-70" />
                      <p className="text-sm text-muted-foreground">Cliquez pour voir sur YouTube</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                      <Play size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{video.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{video.description}</p>
                  <a 
                    href={video.channelUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors text-xs font-medium"
                  >
                    🎥 Chaîne: La Maison de Sagesse
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Canal YouTube Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 max-w-2xl mx-auto border border-primary/20">
            <h3 className="text-xl font-semibold mb-4">🎬 Chaîne YouTube Officielle</h3>
            <p className="text-muted-foreground mb-6">
              Abonnez-vous à <strong>"La Maison de Sagesse"</strong> pour ne manquer aucun enseignement spirituel, 
              session de prière et moment d'inspiration avec l'Évangéliste Jacques Amessan.
            </p>
            <a 
              href="https://www.youtube.com/@lamaisondesagesse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-divine inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Play size={20} />
              Visiter la Chaîne YouTube
            </a>
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