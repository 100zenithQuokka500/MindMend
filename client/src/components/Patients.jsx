const Patients = () => {
        return (
        <section className="patient-section p-6 bg-gray-100">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center">
                    <img src="/images/support.webp" alt="Patient Support" className="w-full md:w-1/2 rounded-lg" />
                    <div className="side-text md:ml-6 mt-6 md:mt-0">
                        <img src="/images/tickmark.png" alt="Verified" className="w-16 h-16 mb-4 rounded-xl" />
                        <h1 className="text-4xl font-bold mb-4">For Individuals Seeking Support</h1>
                        <p className="text-lg mb-6">Access our intelligent AI companion or connect with qualified professionals in your area</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="grid-item p-4 bg-white shadow-md rounded-lg">
                                <img src="/images/encryption.png" alt="Security" className="w-12 h-12 mb-2" />
                                <h3 className="text-xl font-semibold mb-2">Bank-Level Security</h3>
                                <p>Your information is protected with military-grade encryption and HIPAA compliance standards.</p>
                            </div>
                            <div className="grid-item p-4 bg-white shadow-md rounded-lg">
                                <img src="/images/professionalTherapist.png" alt="Professional Support" className="w-12 h-12 mb-2" />
                                <h3 className="text-xl font-semibold mb-2">Expert Network</h3>
                                <p>Connect with licensed and experienced mental health professionals in your community.</p>
                            </div>
                            <div className="grid-item p-4 bg-white shadow-md rounded-lg">
                                <img src="/images/personalizedCare.png" alt="Personalized Support" className="w-12 h-12 mb-2" />
                                <h3 className="text-xl font-semibold mb-2">Customized Approach</h3>
                                <p>Receive personalized care and support tailored to your specific needs and goals.</p>
                            </div>
                            <div className="grid-item p-4 bg-white shadow-md rounded-lg">
                                <img src="/images/24by7chat.png" alt="Always Available" className="w-12 h-12 mb-2" />
                                <h3 className="text-xl font-semibold mb-2">Always There</h3>
                                <p>Get support whenever you need it, day or night, through our AI companion.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Patients;
