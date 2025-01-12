// intern.js

import React, { useState } from "react";

// Sample data for demo purposes
const sampleInternships = [
  { id: 1, title: "Web Development Internship", location: "Remote", status: "Pending" },
  { id: 2, title: "UI/UX Design Internship", location: "New York", status: "Reviewed" },
];

const sampleSkills = [
  { skill: "JavaScript", progress: 75 },
  { skill: "React", progress: 50 },
];

const sampleInterviews = [
  { company: "TechCorp", date: "2025-01-15", platform: "Zoom", link: "http://zoomlink.com" },
];

const sampleSavedJobs = [
  { id: 1, title: "Front-End Developer Internship", location: "San Francisco" },
];

const InternDashboard = () => {
  const [applications] = useState(sampleInternships);
  const [skills] = useState(sampleSkills);
  const [interviews] = useState(sampleInterviews);
  const [savedJobs] = useState(sampleSavedJobs);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Intern Dashboard</h1>

        {/* Internship Recommendations */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Internship Recommendations</h2>
          <ul className="space-y-3">
            {applications.map((internship) => (
              <li key={internship.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="font-semibold text-gray-700">{internship.title}</span> - {internship.location} - <span className={`text-sm font-medium ${internship.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>Status: {internship.status}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Application Tracker */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Application Tracker</h2>
          <ul className="space-y-3">
            {applications.map((internship) => (
              <li key={internship.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="font-semibold text-gray-700">{internship.title}</span> - <span className={`text-sm font-medium ${internship.status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>Status: {internship.status}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skill Progress */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skill Progress</h2>
          <ul className="space-y-3">
            {skills.map((skill) => (
              <li key={skill.skill} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="font-semibold text-gray-700">{skill.skill}</span>: <span className="font-medium text-blue-600">{skill.progress}% completed</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming Interviews */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Interviews</h2>
          {interviews.map((interview) => (
            <div key={interview.company} className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4 hover:bg-gray-100">
              <p className="font-semibold text-gray-700">{interview.company}</p>
              <p className="text-sm text-gray-600">Date: {interview.date}</p>
              <p className="text-sm text-gray-600">Platform: {interview.platform}</p>
              <p>
                <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Join Interview</a>
              </p>
            </div>
          ))}
        </section>

        {/* Saved Jobs */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Jobs</h2>
          <ul className="space-y-3">
            {savedJobs.map((job) => (
              <li key={job.id} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="font-semibold text-gray-700">{job.title}</span> - {job.location}
              </li>
            ))}
          </ul>
        </section>

        {/* Resume Builder / Portfolio Preview */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resume Builder / Portfolio Preview</h2>
          <p className="text-gray-600 mb-4">Click below to update your resume or view your portfolio:</p>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">Update Resume</button>
            <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200">Preview Portfolio</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InternDashboard;
