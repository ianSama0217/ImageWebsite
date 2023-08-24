import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Home = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "SECRET";
  const initURL = "https://api.pexels.com/v1/curated?page=1&per_page=16";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=16`;
  const search = async (url) => {
    let result = await axios.get(url, { headers: { Authorization: auth } });
    // console.log(result);
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=16`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${
        page + 1
      }&per_page=16`;
    }
    let result = await axios.get(newURL, { headers: { Authorization: auth } });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initURL);
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((data) => {
            return <Picture data={data} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>More picture</button>
      </div>
    </div>
  );
};

export default Home;
