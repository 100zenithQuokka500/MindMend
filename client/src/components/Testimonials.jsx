const Testimonials = () => {
    return (
        <section id="testimonials" className="bg-purple-500 py-12">
            <div className="max-w-4xl mx-auto text-center px-4 flex flex-col md:flex-row justify-around items-center gap-8">
                <div className="text-white md:w-1/2">
                    <p className="text-lg italic mb-4">
                        &quot;MindMend has revolutionized how we approach mental health support. The combination of AI assistance and human expertise creates a comprehensive care experience that truly makes a difference in people&#39;s lives.&quot;
                    </p>
                    <hr />
                    <p className="font-semibold mt-4">MindMend Community</p>
                    <p className="mb-6">Trusted by thousands since 2024</p>
                </div>
                <div className="md:w-1/2">
                    <img src="/images/community.jpg" alt="Community Success" className="w-full h-auto border-2 border-gray-300 rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
