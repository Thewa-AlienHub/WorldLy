import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
        About <span className="text-[#147eb7]">WorldLy</span>
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-8 space-y-8 border border-slate-200">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Project Overview
          </h2>
          <p className="text-slate-600 mb-2">
            <strong>CountryExplorer</strong> is a modern React-based web
            application designed to provide users with interactive access to
            information about countries across the globe. Developed as part of a
            frontend development course, this project highlights practical
            skills in API integration, responsive design, and state management.
          </p>
          <p className="text-slate-600">
            Users can search and filter countries by name, region, or language,
            and view detailed profiles including population, capital, languages,
            currencies, and more.
          </p>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Key Features
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Real-time search and filtering by name, region, or language</li>
            <li>Detailed country profiles with rich data presentation</li>
            <li>Ability to mark and manage favorite countries</li>
            <li>Responsive layout optimized for all device sizes</li>
            <li>User authentication for personalized experiences</li>
            <li>Seamless navigation with React Router</li>
          </ul>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Technologies Used
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>
              <strong>React</strong> – Functional components with Hooks
            </li>
            <li>
              <strong>React Router</strong> – Client-side routing and navigation
            </li>
            <li>
              <strong>Tailwind CSS</strong> – Utility-first responsive styling
            </li>
            <li>
              <strong>REST Countries API</strong> – External API for real-time
              country data
            </li>
            <li>
              <strong>LocalStorage</strong> – Persistence of user favorites and
              session state
            </li>
            <li>
              <strong>Lucide React</strong> – Lightweight icons for enhanced UI
            </li>
          </ul>
        </section>

        {/* API Integration */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            API Integration
          </h2>
          <p className="text-slate-600 mb-2">
            CountryExplorer utilizes the <strong>REST Countries API</strong> to
            retrieve real-time data. The application makes use of the following
            endpoints:
          </p>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>
              <code>GET /all</code> – Retrieve data for all countries
            </li>
            <li>
              <code>GET /name/&#123;name&#125;</code> – Search for a specific
              country
            </li>
            <li>
              <code>GET /alpha/&#123;code&#125;</code> – Get country details by
              code
            </li>
            <li>
              <code>GET /region/&#123;region&#125;</code> – Filter countries by
              region
            </li>
          </ul>
        </section>

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link
            to="/home"
            className="inline-flex items-center transition font-semibold text-[#147eb7] hover:text-[#0f5a8c]"
          >
            <ArrowLeft className="mr-2" /> Back to Countries
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;