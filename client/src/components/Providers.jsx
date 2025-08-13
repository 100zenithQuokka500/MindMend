import { useNavigate } from "react-router-dom";

const Providers = () => {
    const navigate = useNavigate();

    const goToSignUpPage = () => {
        navigate('/signup');
    };

    return (
        <section className="p-10 pt-10 bg-gray-100 text-center">
            <h1 className="text-3xl font-bold mb-4">For Mental Health Professionals</h1>
            <p className="mb-6 text-gray-500">Join our network of trusted providers and connect with patients seeking support</p>
            <div className="flex flex-col md:flex-row justify-center items-start space-y-6 md:space-y-0 md:space-x-6">
                <div className="flex flex-col space-y-6 w-22 md:w-1/3">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <img src="/images/step1.png" alt="Step 1" className="w-22 h-12 object-cover mb-4 mx-auto " />
                        <h3 className="text-xl font-semibold mb-2">Step 1: Create Your Profile</h3>
                        <p>Set up your professional profile highlighting your expertise, specialties, and approach to therapy. Showcase your credentials and experience to attract the right patients.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <img src="/images/step2.png" alt="Step 2" className="w-22 h-12 object-cover mb-4 mx-auto" />
                        <h3 className="text-xl font-semibold mb-2">Step 2: Connect with Patients</h3>
                        <p>Receive inquiries from patients who match your expertise and availability. Review patient needs and schedule consultations that fit your practice.</p>
                    </div>
                </div>
                <div className="w-22 md:w-1/2">
                    <img src="/images/providerNetwork.jpg" alt="Provider Network" className="w-4/5 h-[35rem] md:h-[30rem] object-cover mb-4 rounded-lg mx-auto" />
                </div>
            </div>
            <button onClick={goToSignUpPage} className="mt-6 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Join Our Provider Network</button>
        </section>
    );
};

export default Providers;

