import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
const Card = () => {
  const [currentActivity, setCurrentActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const key = useRef(0);

  const override = {
    display: "block",
    margin: "auto",
    marginTop:"100px",
    marginBottom:"100px",
    borderColor: "red",
  };

  const getNextData = async () => {
    setIsLoading(true);
    key.current = currentActivity.key;
    const res = await axios("http://www.boredapi.com/api/activity/");
    setIsLoading(false);
    setCurrentActivity(res.data);
  };

  const getPreData = async () => {
    setIsLoading(true);
    const res = await axios(
      `http://www.boredapi.com/api/activity/?key=${key.current}`
    );

    setIsLoading(false);
    key.current = 0;
    setCurrentActivity(res.data);
  };
  // console.log(currentActivity,getData);
  useEffect(() => {
    getNextData();
  }, []);
  return (
    <>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <div className=" flex justify-center">
        <div>
          <div className="text-center font-semibold">
            <h1 className="text-5xl">
              <span className="text-blue-700 tracking-wide">Activity </span>
              <span>Suggetion</span>
            </h1>
          </div>
          <div className="ml-10 pt-20 flex flex-row">
            <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
              {isLoading ? (
                <FadeLoader
                  loading={isLoading}
                  cssOverride={override}
                  size={250}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <div className="70">
                  <p className="font-semibold text-gray-400 text-left">
                    <span className="material-icons align-middle">
                      emoji_people
                    </span>
                    <span className="pl-2">
                      Accessibility:{" "}
                      <span className="text-white">
                        {currentActivity.accessibility}%
                      </span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">groups</span>
                    <span className="pl-2">
                      Participants:{" "}
                      <span className="text-white">
                        {currentActivity.participants}
                      </span>
                    </span>
                  </p>
                  <p className="font-semibold text-gray-400 text-left pt-5">
                    <span className="material-icons align-middle">
                      filter_vintage
                    </span>
                    <span className="pl-2">
                      Type:
                      <span className="text-white">
                        {" "}
                        {currentActivity.type}{" "}
                      </span>
                    </span>
                  </p>
                  <hr className="mt-4 border-1 border-gray-600" />
                  <h1 className="text-white font-bold text-xl">Activity</h1>
                  <p className="pt-2 tracking-wide">
                    {currentActivity.activity}
                  </p>
                  <hr className="mt-4 border-1 border-gray-600" />
                  {key.current ? (
                    <button
                      className="p-4 bg-blue-600 bg-blue-600 mt-8 rounded-xl text-white"
                      onClick={getPreData}
                    >
                      <span className="pr-2 material-icons align-middle text-sm">
                        west
                      </span>
                      <span className="font-small">Previous </span>
                    </button>
                  ) : (
                    <button
                      className="p-4 bg-blue-400 bg-blue-600 mt-8 rounded-xl text-white"
                      onClick={getPreData}
                      disabled
                    >
                      <span className="pr-2 material-icons align-middle text-sm">
                        west
                      </span>
                      <span className="font-small">Previous </span>
                    </button>
                  )}
                  <button
                    className="p-4 bg-blue-600 ml-5 mt-8 rounded-xl text-white"
                    onClick={getNextData}
                  >
                    <span className="font-small">Next</span>
                    <span className="pl-2 material-icons align-middle text-sm">
                      east
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
