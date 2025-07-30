// src/pages/components/WorkerCard.jsx
import React from 'react';

export const WorkerCard = () => {
  const workers = [
    {
      name: "John Doe",
      role: "Industrial Mechanic",
      image:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    },
    {
      name: "Maria Smith",
      role: "Fabrication Technician",
      image:
        "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    },
    {
      name: "Ravi Kumar",
      role: "Hydraulics Technician",
      image:
        "https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg",
    },
    {
      name: "Daliya N",
      role: "Dismantling Technician",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBwcm9maWxlJTIwcGljdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pr-6">
      {workers.map((worker, index) => (
        <div
          key={index}
          className="bg-white rounded-[30px] overflow-hidden shadow-xl w-[280px] text-center mx-auto"
        >
          {/* Top green section */}
          <div className="bg-[#81AD87] h-24 relative"></div>

          {/* Profile image */}
          <div className="relative -mt-12 mb-2">
            <div className="w-24 h-24 rounded-full border-[6px] border-white mx-auto overflow-hidden shadow-md">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom white content */}
          <div className="px-4 pb-6">
            <h2 className="text-lg font-bold">{worker.name}</h2>
            <p className="text-sm text-gray-600 font-semibold">{worker.role}</p>
            <hr className="w-12 border-[#81AD87] my-2 mx-auto" />

            {/* Buttons */}
            <div className="flex justify-center gap-3 mt-5">
              <button className="bg-[#81AD87] text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-200"
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#6E9673')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#81AD87')}>
                View
              </button>
              <button className="bg-[#81AD87] text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-200"
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#6E9673')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#81AD87')}>
                Assign
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
