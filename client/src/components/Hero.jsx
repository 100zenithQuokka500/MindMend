import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const goToChatPage = () => {
        navigate('/chat');
    }

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="hero-text text-center md:text-left md:w-1/2 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">Transform Your Mind, Transform Your Life</h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6">Discover personalized AI-powered therapy support and connect with qualified mental health professionals in your area. Streamline your path to emotional wellbeing.</p>
                    <button 
                        onClick={goToChatPage} 
                        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300"
                    >
                        Chat Now
                    </button>
                </div>
                <div className="hero-image md:w-1/2 px-4 mt-8 md:mt-0">
                    <img src="/images/counseling.webp" alt="MindMend Logo" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
