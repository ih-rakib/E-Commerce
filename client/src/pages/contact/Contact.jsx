import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-12 my-[100px]">
      <h1 className="text-3xl font-semibold mb-10 underline">Connect Me</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Email */}
        <div className="flex flex-col items-center cursor-pointer bg-blue-100 p-4 rounded-lg shadow-md w-32 text-center hover:bg-blue-200 hover:scale-105 transition-all">
          <i className="ri-mail-line text-4xl text-blue-600 mb-2"></i>
          <a
            href="mailto:hasanrakib3590@gmail.com"
            className="text-sm font-medium text-black hover:text-blue-800"
          >
            Email
          </a>
        </div>

        {/* GitHub */}
        <div className="flex flex-col items-center cursor-pointer bg-gray-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-gray-300 hover:scale-105 transition-all">
          <i className="ri-github-line text-4xl text-gray-800 mb-2"></i>
          <a
            href="https://github.com/ih-rakib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-gray-900"
          >
            GitHub
          </a>
        </div>

        {/* Projects */}
        <div className="flex flex-col items-center cursor-pointer bg-green-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-green-300 hover:scale-105 transition-all">
          <i className="ri-projector-line text-4xl text-green-600 mb-2"></i>
          <a
            href="https://github.com/ih-rakib/Profile/blob/master/Projects/Readme.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-green-800"
          >
            Projects
          </a>
        </div>

        {/* Leetcode */}
        <div className="flex flex-col items-center cursor-pointer bg-orange-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-orange-300 hover:scale-105 transition-all">
          <i className="ri-code-line text-4xl text-orange-600 mb-2"></i>
          <a
            href="https://leetcode.com/u/kuhelica/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-orange-800"
          >
            Leetcode
          </a>
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col items-center cursor-pointer bg-blue-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-blue-00 hover:scale-105 transition-all">
          <i className="ri-linkedin-line text-4xl text-blue-700 mb-2"></i>
          <a
            href="https://www.linkedin.com/in/ikramul-hasan-rakib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-blue-900"
          >
            LinkedIn
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col items-center cursor-pointer bg-green-300 p-4 rounded-lg shadow-md w-32 text-center hover:bg-green-400 hover:scale-105 transition-all">
          <i className="ri-whatsapp-line text-4xl text-green-600 mb-2"></i>
          <a
            href="https://wa.me/1857668385"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-green-800"
          >
            WhatsApp
          </a>
        </div>

        {/* YouTube */}
        <div className="flex flex-col items-center cursor-pointer bg-red-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-red-300 hover:scale-105 transition-all">
          <i className="ri-youtube-line text-4xl text-red-700 mb-2"></i>
          <a
            href="https://www.youtube.com/@ihrakib07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-red-900"
          >
            YouTube
          </a>
        </div>

        {/* Codeforces */}
        <div className="flex flex-col items-center cursor-pointer bg-purple-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-purple-300 hover:scale-105 transition-all">
          <i className="ri-sword-line text-4xl text-purple-700 mb-2"></i>
          <a
            href="https://codeforces.com/profile/Rakib03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-purple-900"
          >
            Codeforces
          </a>
        </div>

        {/* HackerRank */}
        <div className="flex flex-col items-center cursor-pointer bg-yellow-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-yellow-300 hover:scale-105 transition-all">
          <i className="ri-bank-card-line text-4xl text-yellow-700 mb-2"></i>
          <a
            href="https://www.hackerrank.com/profile/hasanrakib3590"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-yellow-900"
          >
            HackerRank
          </a>
        </div>

        {/* Learning */}
        <div className="flex flex-col items-center cursor-pointer bg-blue-200 p-4 rounded-lg shadow-md w-32 text-center hover:bg-blue-300 hover:scale-105 transition-all">
          <i className="ri-book-line text-4xl text-blue-700 mb-2"></i>
          <a
            href="https://github.com/ih-rakib/Profile/tree/master/Learning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black hover:text-blue-900"
          >
            Learning
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
