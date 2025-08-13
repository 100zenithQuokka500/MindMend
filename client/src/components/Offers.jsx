const Offers = () => {
    return (
      <section id="offers" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <span className="text-lg font-bold text-purple-500 bg-purple-200 pl-4 pr-4 pt-1.5 pb-1.5 rounded-lg">
            Ready for positive change?
          </span>
          <h1 className="text-3xl font-bold mt-4 mb-8">Discover What MindMend Brings to You</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:translate-y-[-6px] flex flex-col items-center">
              <img src="/images/24by7chat.png" alt="24/7 Support" className="w-22 h-12 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">24/7 AI Companion</h3>
              <p className="text-gray-700 text-sm text-center">Experience round-the-clock emotional support through our intelligent AI companion. Your conversations remain completely private and secure with enterprise-grade encryption.</p>
            </div>
            <div className="card bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:translate-y-[-6px] flex flex-col items-center">
              <img src="/images/professionalTherapist.png" alt="Professional Support" className="w-22 h-12 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Connect with Experts</h3>
              <p className="text-gray-700 text-sm text-center">Find and connect with licensed mental health professionals in your community. Filter by location, specialty, insurance coverage, and availability to find your perfect match.</p>
            </div>
            <div className="card bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:translate-y-[-6px] flex flex-col items-center">
              <img src="/images/personalizedCare.png" alt="Personalized Care" className="w-22 h-12 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Tailored Support</h3>
              <p className="text-gray-700 text-sm text-center">MindMend adapts to your unique needs and preferences, offering personalized guidance and support that grows with you on your wellness journey.</p>
            </div>
            <div className="card bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:translate-y-[-6px] flex flex-col items-center">
              <img src="/images/encryption.png" alt="Security" className="w-22 h-12 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Evidence-Based Methods</h3>
              <p className="text-gray-700 text-sm text-center">Access proven therapeutic techniques including Cognitive Behavioral Therapy (CBT) and Dialectical Behavior Therapy (DBT) to develop healthier thought patterns and emotional regulation skills.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Offers;
  