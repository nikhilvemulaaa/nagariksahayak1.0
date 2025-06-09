import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Download,
  Share2,
  Star,
  CheckCircle
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes demo
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Multi-Modal Complaint Submission",
      description: "Submit complaints via text, voice, or image in any Indian language",
      timestamp: 15
    },
    {
      title: "AI-Powered Categorization",
      description: "Automatic issue classification and priority assignment",
      timestamp: 45
    },
    {
      title: "Real-Time Issue Mapping",
      description: "Live visualization of civic issues across the city",
      timestamp: 75
    },
    {
      title: "Admin Analytics Dashboard",
      description: "Comprehensive insights for government officials",
      timestamp: 105
    },
    {
      title: "Citizen Feedback System",
      description: "Rate and review resolution quality",
      timestamp: 135
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control video playback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const jumpToFeature = (timestamp: number, index: number) => {
    setCurrentTime(timestamp);
    setActiveFeature(index);
    // In a real implementation, this would seek to the timestamp
  };

  // Simulate video progress
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Update active feature based on current time
  React.useEffect(() => {
    const currentFeature = features.findIndex((feature, index) => {
      const nextFeature = features[index + 1];
      return currentTime >= feature.timestamp && (!nextFeature || currentTime < nextFeature.timestamp);
    });
    if (currentFeature !== -1) {
      setActiveFeature(currentFeature);
    }
  }, [currentTime]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Nagarik Sahayak Demo</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Video Player */}
          <div className="flex-1 bg-black relative">
            {/* Video Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-green-900 flex items-center justify-center relative">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Play className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Interactive Demo</h3>
                <p className="text-white/80">Experience the future of civic engagement</p>
              </div>

              {/* Demo Content Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl px-8">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <h3 className="text-3xl font-bold mb-4">{features[activeFeature].title}</h3>
                    <p className="text-xl text-white/90 mb-6">{features[activeFeature].description}</p>
                    
                    {/* Feature Demo Visualization */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">Text Input</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">Voice Recording</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                        <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">Image Upload</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span>AI-Powered Processing</span>
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <span>Real-Time Updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>

                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                    {/* Feature markers */}
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="absolute top-0 w-3 h-3 bg-yellow-400 rounded-full transform -translate-y-0.5 cursor-pointer hover:scale-125 transition-transform duration-300"
                        style={{ left: `${(feature.timestamp / duration) * 100}%` }}
                        onClick={() => jumpToFeature(feature.timestamp, index)}
                        title={feature.title}
                      ></div>
                    ))}
                  </div>
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm">
                  <Maximize className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Feature Timeline */}
          <div className="w-80 bg-white/60 backdrop-blur-lg border-l border-gray-200/50 flex flex-col">
            <div className="p-4 border-b border-gray-200/50">
              <h3 className="font-semibold text-gray-900 mb-2">Demo Features</h3>
              <p className="text-sm text-gray-600">Click on any feature to jump to that section</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => jumpToFeature(feature.timestamp, index)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-blue-100 border-2 border-blue-500 shadow-lg'
                      : 'bg-white/60 hover:bg-white/80 border border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-medium ${activeFeature === index ? 'text-blue-900' : 'text-gray-900'}`}>
                      {feature.title}
                    </h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {formatTime(feature.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm ${activeFeature === index ? 'text-blue-700' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                  {activeFeature === index && (
                    <div className="mt-2 flex items-center text-blue-600">
                      <Play className="w-4 h-4 mr-1" />
                      <span className="text-xs font-medium">Currently Playing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200/50 space-y-3">
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center text-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center text-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </button>
              </div>
              
              <button
                onClick={() => {
                  setCurrentTime(0);
                  setActiveFeature(0);
                  setIsPlaying(false);
                }}
                className="w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center text-sm"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Restart Demo
              </button>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-600">Rated 5/5 by government officials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;