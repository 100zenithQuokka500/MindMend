const Footer = () => {
    const currentYear=new Date().getFullYear()
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };
  return (
    <footer className="bg-purple-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <img src="/images/mindmendlogo.png" alt="MindMend Logo" className="mb-4 w-12 h-12 rounded-full" />
            <p className="text-white">
              MindMend is an innovative online platform offering a comprehensive suite of mental health tools. It features an AI therapist chatbot for immediate support, a robust search tool to help users find professional therapists nearby, and an AI-driven therapy note-taking tool designed for therapists.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-16">
            <div className="mb-8 md:mb-0">
              <p className="font-bold mb-4">Company</p>
              <ul className="space-y-2">
                <li onClick={() => scrollToTop()}><a href="#" className="text-white hover:text-white">About</a></li>
                <li><a href="#offers" className="text-white hover:text-white">Services</a></li>
                <li><a href="/blog" className="text-white hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <p className="font-bold mb-4">Product</p>
              <ul className="space-y-2">
                <li><a href="#buy" className="text-white hover:text-white">Pricing</a></li>
                <li><a href="#offers" className="text-white hover:text-white">Features</a></li>
                <li><a href="#testimonials" className="text-white hover:text-white">Customers</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Channels</p>
              <ul className="space-y-2">
                <li><a href="/" className="text-white hover:text-white">Careers</a></li>
                <li><a href="/" className="text-white hover:text-white">Contact</a></li>
                <li><a href="/" className="text-white hover:text-white">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-white">© {currentYear} MindMend Corp. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
