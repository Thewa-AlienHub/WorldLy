
import { useState, useEffect } from 'react';
import { Globe, Map, Book, MessageCircle, ArrowRight } from 'lucide-react';
import heroImage from '../../assets/hero.jpg';
import { Link } from 'react-router-dom';

export default function WordlyMainContent() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Color scheme from the provided hex codes
  const colors = {
    darkTeal: '#053742',
    blue: '#39A2DB',
    lightBlue: '#A2DBFA',
    paleBlue: '#E8F0F2',
  };

  // World destinations for the featured section
  const destinations = [
    { name: "Tokyo", description: "Explore Japan's vibrant culture and language", icon: "🇯🇵" },
    { name: "Paris", description: "Discover French arts and conversation", icon: "🇫🇷" },
    { name: "Cairo", description: "Uncover the mysteries of ancient Egypt", icon: "🇪🇬" },
    { name: "Rio", description: "Experience Brazilian Portuguese and customs", icon: "🇧🇷" }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section with Background Image */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Main background image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" 
            style={{ 
              // backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80')",
              backgroundSize: 'cover',
              backgroundImage: `url(${heroImage})`,
            }}>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(5, 55, 66, 0.7)' }}></div>
          </div>
        </div>
        
        <div 
          className={`container mx-auto px-4 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Discover the World with Worldly
              </h1>
              <p className="text-xl mb-8 text-white opacity-90">
                Your ultimate guide to exploring countries, cultures, and languages from around the globe.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/home">
                  <button className="px-8 py-3 rounded-full text-white font-medium text-lg transition-all duration-300 transform hover:scale-105" 
                    style={{ backgroundColor: colors.blue }}>
                    Start Exploring
                  </button>
                </Link>
                <button className="px-8 py-3 rounded-full font-medium text-lg border-2 border-white text-white transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-blue-800">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/* <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" 
                  style={{ backgroundColor: colors.lightBlue }}></div>
                <div className="absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" 
                  style={{ backgroundColor: colors.blue }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" 
                  style={{ backgroundColor: colors.paleBlue }}></div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1033&q=80" 
                       alt="World Map" 
                       className="rounded-lg shadow-2xl" />
                  <div className="absolute -top-5 -left-5 bg-white p-3 rounded-lg shadow-lg" style={{ backgroundColor: colors.paleBlue }}>
                    <div className="flex items-center">
                      <span className="text-3xl mr-2">🇮🇹</span>
                      <span className="font-medium">Ciao!</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg" style={{ backgroundColor: colors.paleBlue }}>
                    <div className="flex items-center">
                      <span className="text-3xl mr-2">🇰🇷</span>
                      <span className="font-medium">안녕하세요!</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Floating Elements - For decoration */}
        <div className="hidden md:block absolute top-1/4 left-10 z-10">
          <div className="w-20 h-20 rounded-full animate-float" style={{ backgroundColor: colors.lightBlue, opacity: 0.8 }}></div>
        </div>
        <div className="hidden md:block absolute bottom-1/4 right-10 z-10">
          <div className="w-12 h-12 rounded-full animate-float animation-delay-2000" style={{ backgroundColor: colors.blue, opacity: 0.2 }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.paleBlue }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.darkTeal }}>
              Unlock a World of Possibilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wordly combines language learning, cultural insights, and travel guides to give you the most comprehensive global experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6" style={{ backgroundColor: colors.lightBlue }}>
                <Book size={32} color={colors.darkTeal} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.darkTeal }}>Language Learning</h3>
              <p className="text-gray-600">
                Interactive lessons that help you master new languages through immersive experiences and practical conversations.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6" style={{ backgroundColor: colors.lightBlue }}>
                <Map size={32} color={colors.darkTeal} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.darkTeal }}>Cultural Exploration</h3>
              <p className="text-gray-600">
                Dive deep into traditions, customs, and history of different cultures around the world with expert guides.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6" style={{ backgroundColor: colors.lightBlue }}>
                <MessageCircle size={32} color={colors.darkTeal} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.darkTeal }}>Community Connections</h3>
              <p className="text-gray-600">
                Connect with native speakers and fellow explorers to practice languages and share cultural experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations/Explore Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.darkTeal }}>
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey with these popular destinations from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tokyo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-48 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1071&q=80" 
                     alt="Tokyo" 
                     className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-2">🇯🇵</span>
                  <h3 className="text-xl font-bold" style={{ color: colors.darkTeal }}>Tokyo</h3>
                </div>
                <p className="text-gray-600 mb-4">Explore Japan's vibrant culture and language</p>
                <button className="flex items-center font-medium transition-colors duration-300" style={{ color: colors.blue }}>
                  Explore <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            
            {/* Paris */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-48 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80" 
                     alt="Paris" 
                     className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-2">🇫🇷</span>
                  <h3 className="text-xl font-bold" style={{ color: colors.darkTeal }}>Paris</h3>
                </div>
                <p className="text-gray-600 mb-4">Discover French arts and conversation</p>
                <button className="flex items-center font-medium transition-colors duration-300" style={{ color: colors.blue }}>
                  Explore <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            
            {/* Cairo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-48 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                     alt="Cairo" 
                     className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-2">🇪🇬</span>
                  <h3 className="text-xl font-bold" style={{ color: colors.darkTeal }}>Cairo</h3>
                </div>
                <p className="text-gray-600 mb-4">Uncover the mysteries of ancient Egypt</p>
                <button className="flex items-center font-medium transition-colors duration-300" style={{ color: colors.blue }}>
                  Explore <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
            
            {/* Rio */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <div className="h-48 bg-gray-200">
                <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                     alt="Rio" 
                     className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-2">🇧🇷</span>
                  <h3 className="text-xl font-bold" style={{ color: colors.darkTeal }}>Rio</h3>
                </div>
                <p className="text-gray-600 mb-4">Experience Brazilian Portuguese and customs</p>
                <button className="flex items-center font-medium transition-colors duration-300" style={{ color: colors.blue }}>
                  Explore <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105" 
              style={{ backgroundColor: colors.blue }}>
              View All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: colors.paleBlue }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.darkTeal }}>
              What Our Explorers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who are discovering the world with Wordly
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                       alt="Sarah" 
                       className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-500">Learning Japanese</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Wordly transformed my trip to Tokyo! I went from zero Japanese knowledge to being able to confidently navigate the city and connect with locals."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                       alt="Michael" 
                       className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Michael Rodriguez</h4>
                  <p className="text-gray-500">Cultural Explorer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The cultural insights Wordly provides are incredible. I've learned so much about traditions and customs that I never would have discovered otherwise."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80" 
                       alt="Emma" 
                       className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold">Emma Wilson</h4>
                  <p className="text-gray-500">Digital Nomad</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who travels constantly, Wordly has become my essential companion. It's like having a local guide and language teacher in my pocket at all times."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r rounded-2xl shadow-xl py-12 px-8 md:py-16 md:px-12 relative overflow-hidden" 
            style={{ background: `linear-gradient(to right, ${colors.darkTeal}, ${colors.blue})` }}>
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                   alt="World Map Background" 
                   className="w-full h-full object-cover opacity-20" />
            </div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Begin Your Global Journey?
              </h2>
              <p className="text-xl mb-8 text-white opacity-90">
                Join Wordly today and unlock a world of languages, cultures, and experiences.
              </p>
              <button className="px-8 py-4 bg-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg" 
                style={{ color: colors.darkTeal }}>
                Start Exploring For Free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add some custom animation styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1); }
          66% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}