import React, { useState, useEffect } from 'react';

const EmployerDashboard = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', description: '', location: '' });

  // Simulate fetching data from an API
  useEffect(() => {
    // Example job posts
    setJobPosts([
      { id: 1, title: 'Frontend Developer Intern', status: 'Open', applicants: 3 },
      { id: 2, title: 'Marketing Intern', status: 'Closed', applicants: 5 },
    ]);

    // Example applications
    setApplications([
      { id: 1, jobId: 1, name: 'John Doe', status: 'Pending' },
      { id: 2, jobId: 2, name: 'Jane Smith', status: 'Reviewed' },
    ]);

    // Example interviews
    setInterviews([
      { id: 1, applicant: 'John Doe', date: '2025-01-10', status: 'Scheduled' },
    ]);
  }, []);

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = () => {
    // Simulate posting a new job
    setJobPosts([...jobPosts, { id: jobPosts.length + 1, ...newPost, status: 'Open', applicants: 0 }]);
    setNewPost({ title: '', description: '', location: '' });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">Employer Dashboard</h1>
      
      {/* Job Post Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Job Post Management</h2>
        {jobPosts.map((job) => (
          <div key={job.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-600">Status: {job.status}</p>
            <p className="text-sm text-gray-600">Applications: {job.applicants}</p>
            <div className="mt-4 space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* Create New Post */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Create New Job Post</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlePostSubmit(); }} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <input 
            type="text" 
            name="title" 
            placeholder="Job Title"
            value={newPost.title}
            onChange={handleNewPostChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newPost.description}
            onChange={handleNewPostChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input 
            type="text" 
            name="location" 
            placeholder="Job Location"
            value={newPost.location}
            onChange={handleNewPostChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <button type="submit" className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Post Job</button>
        </form>
      </section>

      {/* Applicant List */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Applicant List</h2>
        {applications.map((application) => (
          <div key={application.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{application.name}</h3>
            <p className="text-sm text-gray-600">Status: {application.status}</p>
            <div className="mt-4 space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">View Profile</button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">View Resume</button>
            </div>
          </div>
        ))}
      </section>

      {/* Interview Scheduler */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Interview Scheduler</h2>
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{interview.applicant}</h3>
            <p className="text-sm text-gray-600">Interview Date: {interview.date}</p>
            <p className="text-sm text-gray-600">Status: {interview.status}</p>
            <div className="mt-4 space-x-4">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Reschedule</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
            </div>
          </div>
        ))}
      </section>

      {/* Analytics Dashboard */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Analytics Dashboard</h2>
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
          <p className="text-lg text-gray-800">Number of Job Posts: {jobPosts.length}</p>
          <p className="text-lg text-gray-800">Total Applications: {applications.length}</p>
          <p className="text-lg text-gray-800">Total Interview Scheduled: {interviews.length}</p>
        </div>
      </section>
    </div>
  );
};

export default EmployerDashboard;
