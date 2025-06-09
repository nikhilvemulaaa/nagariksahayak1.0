import React, { useState, useRef } from 'react';
import { 
  MessageSquare, 
  Mic, 
  Camera, 
  Upload, 
  X, 
  Send, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  MicOff,
  Square,
  Play,
  Pause,
  Trash2,
  CheckCircle
} from 'lucide-react';

interface ComplaintFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    category: 'infrastructure',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'roads', label: 'Roads & Transport' },
    { value: 'sanitation', label: 'Sanitation' },
    { value: 'environment', label: 'Environment' },
    { value: 'safety', label: 'Public Safety' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      // Reset all form data
      setTextInput('');
      setAudioBlob(null);
      setUploadedImages([]);
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        category: 'infrastructure',
        priority: 'medium'
      });
      setActiveTab('text');
    }, 3000);
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Your complaint has been successfully submitted. You will receive a confirmation email shortly.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Complaint ID:</strong> CMP-{Date.now().toString().slice(-6)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Report an Issue</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter the issue location"
              />
            </div>
          </div>

          {/* Category and Priority */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <div className="flex gap-2">
                {priorities.map(priority => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      formData.priority === priority.value 
                        ? priority.color + ' ring-2 ring-blue-500' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-Modal Input Tabs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">Describe Your Issue *</label>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'text' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Text Input
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('voice')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'voice' 
                    ? 'bg-white text-green-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice Recording
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === 'image' 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Camera className="w-4 h-4 mr-2" />
                Image Upload
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Describe your issue in detail. You can type in English or any regional language..."
                  required={activeTab === 'text' && !audioBlob && uploadedImages.length === 0}
                />
                <div className="text-sm text-gray-500">
                  Supports: Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, and more...
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  {!isRecording && !audioBlob && (
                    <div>
                      <Mic className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Click to start recording your complaint</p>
                      <button
                        type="button"
                        onClick={startRecording}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center mx-auto"
                      >
                        <Mic className="w-5 h-5 mr-2" />
                        Start Recording
                      </button>
                    </div>
                  )}

                  {isRecording && (
                    <div>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <MicOff className="w-8 h-8 text-red-600" />
                      </div>
                      <p className="text-red-600 font-medium mb-2">Recording... {formatTime(recordingTime)}</p>
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center mx-auto"
                      >
                        <Square className="w-5 h-5 mr-2" />
                        Stop Recording
                      </button>
                    </div>
                  )}

                  {audioBlob && (
                    <div>
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-green-600 font-medium mb-4">
                        Recording completed ({formatTime(recordingTime)})
                      </p>
                      <div className="flex gap-2 justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            const audio = new Audio(URL.createObjectURL(audioBlob));
                            audio.play();
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </button>
                        <button
                          type="button"
                          onClick={deleteRecording}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Speak clearly in your preferred language. Recording will be automatically transcribed.
                </div>
              </div>
            )}

            {activeTab === 'image' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload images of the issue</p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center mx-auto"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Images
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, GIF. Max 5MB per image.
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (!textInput && !audioBlob && uploadedImages.length === 0)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Complaint
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;