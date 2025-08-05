import React from "react";
import { Navbar } from "../Navbar";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="relative">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Scrollable Content with padding to avoid overlap with navbar */}
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-xl flex w-full max-w-5xl overflow-hidden">
          {/* Form Section */}
          <div className="w-1/2 p-8 bg-white">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-3 rounded bg-gray-100 shadow-inner placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-3 rounded bg-gray-100 shadow-inner placeholder-gray-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-100 shadow-inner placeholder-gray-500"
              />
              <input
                type="text"
                placeholder="Phone No."
                className="w-full p-3 rounded bg-gray-100 shadow-inner placeholder-gray-500"
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full p-3 rounded bg-gray-100 shadow-inner placeholder-gray-500 resize-none"
              />
              <button
                type="submit"
                className="bg-[#A7D7A7] hover:bg-[#94C894] text-white py-2 px-6 rounded transition-colors duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="w-1/2 bg-[#7BAE89] text-white p-8 flex flex-col justify-center">
            <div className="flex items-center mb-6 space-x-4">
              <Phone className="w-6 h-6" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-sm">1800-123-5124</p>
              </div>
            </div>
            <div className="flex items-center mb-6 space-x-4">
              <Mail className="w-6 h-6" />
              <div>
                <p className="font-semibold">Mail Us</p>
                <p className="text-sm">reviron@namowaste.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1" />
              <div className="text-sm space-y-2">
                <p className="font-semibold">Visit Us</p>
                <p>
                  Reviron eWaste Management Ltd. <br />
                  Old Mahapalipuram Road
                </p>
                <p>
                  Near Sathyabama University
                  <br />
                  Chennai 6000823.
                </p>
                <p>
                  Registered Office: B-91, A-6, LGF, Semacherry,
                  <br />
                  Chennai, Kanceepuram 600034 Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
