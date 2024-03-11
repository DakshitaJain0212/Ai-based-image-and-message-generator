import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const CommunityPage = ({ darkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

 

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [input,setInput] = useState('');
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setInput(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <> 
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* <div className=" py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Community Showcase
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI.
            </p>
            <div className="mt-16 ">
              <FormField
                labelName="Search posts"
                type="text"
                name="text"
                placeholder="Search something..."
                value={searchText}
                handleChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"></div>
          <div>



<div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {searchText ? (
    <RenderCards
      data={searchedResults}
      title="No Search Results Found"
    />
  ) : (
    <RenderCards
      data={allPosts}
      title="No Posts Yet"
    />
  )}
</div>

          </div>
        </div>
      </div> */}


<div className={`py-24 sm:py-32 ${darkMode ? 'bg-black' : ''}`}>
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className={`text-3xl font-bold tracking-tight ${darkMode ? 'text-gray-200' : 'text-gray-900'} sm:text-4xl`}>
        The Community Showcase
      </h2>
      <p className={`mt-2 text-lg leading-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Browse through a collection of imaginative and visually stunning
        images generated by DALL-E AI.
      </p>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
          darkMode={darkMode}
        />
      </div>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3"></div>
    <div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {searchText ? (
          <RenderCards
            data={searchedResults}
            title="No Search Results Found"
          />
        ) : (
          <RenderCards
            data={allPosts}
            title="No Posts Yet"
          />
        )}
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default CommunityPage;
