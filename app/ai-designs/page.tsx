
"use client"
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  Wand2, 
  Download, 
  RefreshCw, 
  Palette, 
  Home, 
  Sparkles,
  Eye,
  Settings,
  X,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';
import Image from 'next/image';

export default function AIInteriorDesignPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [designStyle, setDesignStyle] = useState('modern');
  const [roomType, setRoomType] = useState('kitchen');
  const [designPrompt, setDesignPrompt] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [apiStatus, setApiStatus] = useState<'checking' | 'working' | 'error'>('checking');
  const [tokenUsage, setTokenUsage] = useState({ vision: 0, images: 0 });

  const designStyles = [
    { id: 'modern', name: 'Modern Minimalist', description: 'Clean lines, neutral colors' },
    { id: 'scandinavian', name: 'Scandinavian', description: 'Light woods, cozy textures' },
    { id: 'industrial', name: 'Industrial', description: 'Exposed brick, metal accents' },
    { id: 'bohemian', name: 'Bohemian', description: 'Rich colors, eclectic mix' },
    { id: 'luxury', name: 'Luxury', description: 'Premium materials, elegant' },
    { id: 'rustic', name: 'Rustic', description: 'Natural materials, warm tones' }
  ];

  const roomTypes = [
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'living_room', name: 'Living Room', icon: '🛋️' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
    { id: 'dining_room', name: 'Dining Room', icon: '🍽️' },
    { id: 'office', name: 'Home Office', icon: '💻' }
  ];

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      setApiStatus('checking');
      const response = await fetch('/api/test-openai');
      const data = await response.json();

      if (data.success) {
        setApiStatus('working');
        console.log('✅ API Connection successful:', data.message);
      } else {
        setApiStatus('error');
        setError('API Test Failed: ' + (data.error || 'Unknown error'));
        console.error('❌ API Test failed:', data);
      }
    } catch (error) {
      setApiStatus('error');
      setError('Failed to test API connection. Check your setup.');
      console.error('❌ API connection test error:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setError('');
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateDesign = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }

    if (apiStatus !== 'working') {
      setError('API connection is not available. Please check your setup.');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 25) return prev + 5;
          if (prev < 50) return prev + 8;
          if (prev < 80) return prev + 3;
          if (prev < 90) return prev + 1;
          return prev;
        });
      }, 800);

      console.log('🚀 Starting AI generation...');
      console.log('Style:', designStyle, 'Room:', roomType);

      const response = await fetch('/api/generate-interior-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          style: designStyle,
          roomType: roomType,
          prompt: designPrompt || getDefaultPrompt(),
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to generate design');
      }

      const data = await response.json();

      if (data.success) {
        setGeneratedImage(data.generatedImage);

        if (data.apiUsage) {
          setTokenUsage(prev => ({
            vision: prev.vision + (data.apiUsage.visionTokens || 0),
            images: prev.images + (data.apiUsage.imageGeneration || 0)
          }));
        }

        console.log('✅ Design generated successfully!');
      } else {
        throw new Error(data.error || 'Generation failed');
      }

    } catch (error) {
      console.error('❌ Design generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate design. Please try again.';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const getDefaultPrompt = () => {
    const styleDesc = designStyles.find(s => s.id === designStyle)?.description || '';
    const roomName = roomTypes.find(r => r.id === roomType)?.name || '';

    return `Keep the original layout, walls, windows, doors, and architectural structure of this ${roomName.toLowerCase()} exactly as they are. DO NOT change the room's basic layout, wall positions, or architectural elements. Instead, thoughtfully ADD ${designStyle} style furniture, decor, and accessories that complement the existing space. Focus on: furniture placement that fits naturally, ${styleDesc.toLowerCase()}, appropriate lighting fixtures, decorative elements, color coordination with existing elements, and professional interior styling. Maintain the room's original proportions and structural integrity while enhancing it with beautiful ${designStyle} design elements.`;
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-interior-design-${designStyle}-${Date.now()}.png`;
      link.click();
    }
  };

  const resetAll = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    setError('');
    setDesignPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Enhanced Header */}
      <div className="bg-red-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="p-3 bg-white/20 rounded-full">
                <Wand2 className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold">Generate AI Designs</h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-red-50 max-w-3xl mx-auto leading-relaxed"
            >
              Upload your room photo and watch AI transform it into stunning interior designs
            </motion.p>

            {/* API Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex items-center justify-center"
            >
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                apiStatus === 'working' ? 'bg-green-500/20 text-white border border-green-300/30' :
                apiStatus === 'error' ? 'bg-red-600/20 text-white border border-red-300/30' :
                'bg-yellow-500/20 text-white border border-yellow-300/30'
              }`}>
                {apiStatus === 'working' ? <Wifi className="w-4 h-4" /> :
                 apiStatus === 'error' ? <WifiOff className="w-4 h-4" /> :
                 <RefreshCw className="w-4 h-4 animate-spin" />}

                {apiStatus === 'working' ? 'AI Ready' :
                 apiStatus === 'error' ? 'API Error' :
                 'Testing API...'}

                {tokenUsage.images > 0 && (
                  <span className="ml-2 text-xs opacity-75">
                    | Used: {tokenUsage.images} images
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex items-center justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>AI-Powered Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Multiple Styles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Instant Results</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 p-6 sticky top-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Settings className="w-6 h-6 text-red-400" />
                  Design Settings
                </h2>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={testApiConnection}
                  className={`p-2 rounded-lg ${
                    apiStatus === 'working' ? 'bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400' :
                    apiStatus === 'error' ? 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400' :
                    'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400'
                  }`}
                  title="Test API Connection"
                >
                  <RefreshCw className={`w-4 h-4 ${apiStatus === 'checking' ? 'animate-spin' : ''}`} />
                </motion.button>
              </div>

              {/* Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Upload Room Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-red-300 dark:border-red-400/30 rounded-xl p-8 text-center cursor-pointer hover:border-red-400 dark:hover:border-red-400/50 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all"
                >
                  {uploadedImage ? (
                    <div className="relative">
                      <Image
                        src={uploadedImage}
                        alt="Uploaded room"
                        width={200}
                        height={150}
                        className="mx-auto rounded-lg object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetAll();
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        Click to upload room image
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Room Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Room Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roomTypes.map(room => (
                    <button
                      key={room.id}
                      onClick={() => setRoomType(room.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        roomType === room.id
                          ? 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-400/50 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="text-lg mb-1">{room.icon}</div>
                      <div className="text-sm font-medium">{room.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Style */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Design Style
                </label>
                <div className="space-y-2">
                  {designStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setDesignStyle(style.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        designStyle === style.id
                          ? 'border-red-400 bg-red-50 dark:bg-red-950/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-400/50'
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{style.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Prompt */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Custom Instructions (Optional)
                </label>
                <textarea
                  value={designPrompt}
                  onChange={(e) => setDesignPrompt(e.target.value)}
                  placeholder="Add specific requirements like colors, furniture preferences..."
                  className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-400/20 resize-none transition-colors"
                  rows={3}
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateDesign}
                disabled={!uploadedImage || isProcessing || apiStatus !== 'working'}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  !uploadedImage || isProcessing || apiStatus !== 'working'
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-red-400 text-white hover:bg-red-500 hover:shadow-xl'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating Design... {progress}%
                  </div>
                ) : apiStatus !== 'working' ? (
                  <div className="flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    API Not Ready
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Generate AI Design
                  </div>
                )}
              </motion.button>

              {/* Error Display */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 dark:text-red-300 text-sm font-medium">Error</p>
                      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                      {apiStatus === 'error' && (
                        <button
                          onClick={testApiConnection}
                          className="text-xs text-red-500 dark:text-red-400 underline hover:text-red-700 dark:hover:text-red-300 mt-1"
                        >
                          Retry API Test
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Token Usage Display */}
              {tokenUsage.vision > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 rounded-lg transition-colors"
                >
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">API Usage</h4>
                  <div className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <div>Vision Tokens: {tokenUsage.vision}</div>
                    <div>Images Generated: {tokenUsage.images}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 p-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-6 h-6 text-red-400" />
                  Design Results
                </h2>

                {generatedImage && (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadImage}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={generateDesign}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                      Regenerate
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Results Display */}
              <div className="space-y-6">
                {/* Original Image */}
                {uploadedImage && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Original Room</h3>
                    <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                      <Image
                        src={uploadedImage}
                        alt="Original room"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Generated Image */}
                <div>
                  {generatedImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        AI Generated Design
                      </h3>
                      <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <Image
                          src={generatedImage}
                          alt="AI generated design"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                          ✨ AI Generated - {designStyles.find(s => s.id === designStyle)?.name}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Processing Animation */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20"
                  >
                    <div className="relative w-20 h-20 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full border-4 border-red-200 dark:border-red-400/20 border-t-red-400 rounded-full"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Creating Your Dream Design
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                      Our AI is analyzing your room and applying <span className="font-semibold text-red-400">{designStyles.find(s => s.id === designStyle)?.name.toLowerCase()}</span> style...
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-2">
                      <motion.div
                        className="h-3 bg-red-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{progress}% Complete</p>
                  </motion.div>
                )}

                {/* Empty State */}
                {!uploadedImage && !isProcessing && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-red-400/10 rounded-full flex items-center justify-center mb-6">
                      <Camera className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Ready to Transform Your Space?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
                      Upload a photo of your room to get started. Our AI will analyze the space and create stunning design variations.
                    </p>

                    {apiStatus === 'working' && (
                      <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        AI System Ready
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
