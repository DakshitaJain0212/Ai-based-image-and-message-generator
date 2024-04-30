import React from "react";
import {
  MicrophoneIcon,
  PresentationChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

const features = [
  {
    name: "Share with Community",
    description:
      "It offers a vibrant platform for sharing your creations with a thriving community of creators and enthusiasts. With our 'Share with Community' feature, you can effortlessly upload and showcase your images, connection among like-minded individuals.",
    icon: InformationCircleIcon,
  },
  {
    name: "Response Generation",
    description:
      "GPT-3 generates a response based on the input prompt and context. The response can vary in length and complexity, depending on the instructions and parameters you provide.",
    icon: CogIcon,
  },
  {
    name: "Image Generation",
    description:
      " Image Forge processes the textual description and generates an image that matches the provided description. It leverages a combination of text-to-image synthesis techniques.",
    icon: PresentationChartBarIcon,
  },
  {
    name: "Voice Prompt",
    description:
      " You provide a voice prompt or question to the GPT-3 API, which serves as the basis for generating an answer.",
    icon: MicrophoneIcon,
  },
];


const people = [
    {
      name: 'Dakshita Jain',
      role: 'Full Stack developer',
     
    },
    {
        name: 'Monika Kushwah',
        role: 'Full Stack developer',
       
    },
    {
        name: 'Mumuksha Arya',
        role: 'frontend Developer',
       
    },
  ]

const LearnMore = ({ darkMode, toggleDarkMode }) => {
  return (
    <>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    <div className={`py-24 sm:py-32 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-7xl font-bold tracking-tight sm:text-6xl font-medium whitespace-nowrap ">
            AnswerCraft & Image Forge
          </h1>
          <p className="mt-3 text-7xl tracking-tight sm:text-6xl font-extralight">
            Overview
          </p>
          <p className="mt-6 text-lg leading-8">
            Using the GPT-3 API and DALL·E API to create Ai-Based answer generators and image generators can be achieved by integrating these APIs into your applications or services. Here's a high-level overview of how they can be used:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-600'}`}>
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  
    <div className={` ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className={`mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Specifications
          </h2>
          <p className="mt-4 text-gray-500">
            By integrating the GPT-3 and DALL·E APIs into our applications, we harness the power of AI for dynamic answer generation and image creation, enhancing user experiences, automating content production, and sparking creativity in various domains.
          </p>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="border-t border-gray-200 pt-4"
              >
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src={img1}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img2}
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img3}
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src={img4}
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  
    <div className={`py-24 sm:py-32  ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name} className="flex items-center gap-x-6">
              {/* <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" /> */}
              <div>
                <h3 className="text-base font-semibold leading-7">{person.name}</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the Members</h2>
          <p className="mt-6 text-lg leading-8">
            The team behind AnswerCraft & Image Forge builds a website to enhance AI-based content creation, merging technical prowess with creative vision.
          </p>
        </div>
      </div>
    </div>
    <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
  </>
  
  );
};

export default LearnMore;
