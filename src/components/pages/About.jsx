// src/components/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">About CountryExplorer</h1>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Project Overview</h2>
                    <p className="mb-2">
                        CountryExplorer is a React application built to showcase countries around the world
                        using data from the REST Countries API. This project was developed as a part of the
                        assignment for a frontend development course.
                    </p>
                    <p>
                        Users can search for countries, filter them by region or language, and view detailed
                        information about each country including population, capital, languages, currencies,
                        and more.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Features</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Browse countries from all around the world</li>
                        <li>Search for countries by name</li>
                        <li>Filter countries by region or language</li>
                        <li>View detailed information about each country</li>
                        <li>Save favorite countries for quick access</li>
                        <li>User authentication system</li>
                        <li>Responsive design for all device sizes</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Technologies Used</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>React (Functional Components & Hooks)</li>
                        <li>React Router for navigation</li>
                        <li>Tailwind CSS for styling</li>
                        <li>REST Countries API for data</li>
                        <li>LocalStorage for client-side data persistence</li>
                        <li>Lucide React for icons</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-3">API Integration</h2>
                    <p className="mb-2">
                        This application integrates with the REST Countries API to fetch and display
                        country data. The following endpoints are used:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>GET /all – to get a list of all countries</li>
                        <li>GET /name/{'{name}'} – to search a country by its name</li>
                        <li>GET /alpha/{'{code}'} – to get full details using a country code</li>
                        <li>GET /region/{'{region}'} – to get countries from a specific region</li>
                    </ul>
                </section>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Countries
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;