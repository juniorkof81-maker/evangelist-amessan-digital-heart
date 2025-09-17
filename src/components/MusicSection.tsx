import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

const MusicSection = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder tracks (will be replaced with real tracks)
  const tracks = [
    {
      title: "Louange et Gloire",
      artist: "Évangéliste Jacques Amessan",
      duration: "4:32",
      // Placeholder - in real implementation, these would be real audio files
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      title: "Alléluia Victory",
      artist: "Évangéliste Jacques Amessan",
      duration: "3:45",
      // Placeholder - in real implementation, these would be real audio files  
      src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentTrack]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clickX = parseFloat(e.target.value);
    audio.currentTime = (clickX / 100) * duration;
  };

  return (
    <section id="musique" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Musique{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gospel
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Écoutez les chants d'inspiration divine qui accompagnent le ministère spirituel.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="audio-player p-8">
            {/* Current Track Info */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {tracks[currentTrack].title}
              </h3>
              <p className="text-muted-foreground">
                {tracks[currentTrack].artist}
              </p>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={tracks[currentTrack].src}
              onEnded={() => {
                if (currentTrack < tracks.length - 1) {
                  handleTrackChange(currentTrack + 1);
                } else {
                  setIsPlaying(false);
                }
              }}
            />

            {/* Progress Bar */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => currentTrack > 0 && handleTrackChange(currentTrack - 1)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                disabled={currentTrack === 0}
              >
                <SkipBack size={24} />
              </button>

              <button
                onClick={togglePlayPause}
                className="btn-divine p-4 rounded-full"
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>

              <button
                onClick={() => currentTrack < tracks.length - 1 && handleTrackChange(currentTrack + 1)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                disabled={currentTrack === tracks.length - 1}
              >
                <SkipForward size={24} />
              </button>
            </div>

            {/* Track List */}
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => handleTrackChange(index)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    currentTrack === index
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-secondary/50 hover:bg-secondary'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <Volume2 className="inline w-4 h-4 mr-1" />
                *Audio placeholders - Fichiers gospel réels à intégrer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;