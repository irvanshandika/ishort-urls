import React from "react";
import Image from "next/image";

function AboutPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
            <p className="text-gray-600 mt-2">Discover the story behind iShort URLs and our mission to simplify your web experience.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              <Image
                src="https://cdn3d.iconscout.com/3d/free/thumb/free-puzzle-3d-icon-download-in-png-blend-fbx-gltf-file-formats--solution-game-strategy-infographics-pack-business-icons-3187500.png?f=webp" // Replace with your image path
                alt="About Us"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:ml-8 mt-6 md:mt-0">
              <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mt-4">At iShort URLs, our mission is to provide a fast and reliable URL shortening service that helps you manage and share links with ease.</p>
              <p className="text-gray-600 mt-4">We are passionate about creating simple and effective tools that enhance your online experience, allowing you to focus on what truly matters.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
