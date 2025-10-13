import React, { useState } from "react";

import YantrasParametersForm from "./YantrasParametersForm";
import Scene from "../../components/common/Scene";
import Location from "./Location";


const Home: React.FC = () => {
  const [modelPath,setModelPath] = useState("");
  const [loading,setLoading] = useState(false);
  return (
    <div className="home-page bg-bg grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 ">
      <section className="flex flex-col justify-start items-start gap-4 bg-primary border border-border rounded-[8px] p-6">
        <h1 className="text-accent text-2xl/[24px] font-bold ">Parameters</h1>
        <div className="w-full h-[1px] bg-border"></div>
        <YantrasParametersForm loading={loading} setModelPath={setModelPath} setLoading={setLoading}/>
      </section>
      <section className="flex h-full flex-col justify-start items-start gap-4 bg-primary border border-border rounded-[8px] p-6">
        <div className="w-full h-full flex flex-col justify-start items-center  gap-2">
            {/* {modelPath==""?
              <div className="w-full h-full flex flex-col justify-start items-center gap-2 mt-12 px-12" >
                <div className="w-full h-auto flex flex-col justify-start items-center">
                  <h2 className="text-2xl font-semibold text-accent">Generated Output</h2>
                  <div className="w-full h-[1px] bg-secondary mt-3"></div>
                </div>
                <div className="flex-1 w-full py-2">
                  <p className="w-full text-center text-[#888]">Enter parameters and click "Generate Dimensions" to see the results.</p>
                </div>
              </div>
            :
            <Scene setLoading={setLoading} modelPath={modelPath}/>} */}
            <Location/>
        </div>
      </section>
    </div>
  );
};

export default Home;
