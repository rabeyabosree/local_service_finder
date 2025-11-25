import img from "../../assets/contact.jpg";

function ContactPage() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form container */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 sm:p-10 m-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-violet-800 text-center mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
          Have questions or need help? Fill out the form below and we’ll get
          back to you shortly.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 outline-none transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 outline-none transition"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500 outline-none transition resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-violet-800 hover:bg-violet-600 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
