import React, { useState } from "react";

import YantrasParametersForm from "./YantrasParametersForm";
import Scene from "../../components/common/Scene";
import Location from "./Location";
import SamratYantraView from "../../components/table/table";


const Home: React.FC = () => {
  const [modelPath,setModelPath] = useState<string|null>("");
  const [isMapOpen,setMapOpen] = useState<boolean>(false);
  const [loading,setLoading] = useState(false);
  return (
    <div className="home-page bg-bg grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 ">
      <section className="flex flex-col justify-start items-start gap-4 bg-primary border border-border rounded-[8px] p-6">
        <h1 className="text-accent text-2xl/[24px] font-bold ">Parameters</h1>
        <div className="w-full h-[1px] bg-border"></div>
        <YantrasParametersForm setMapOpen={setMapOpen} loading={loading} setModelPath={setModelPath} setLoading={setLoading}/>
      </section>
      <section className="flex h-full flex-col justify-start items-start gap-4 bg-primary border border-border rounded-[8px] p-6">
        <div className="w-full h-full flex flex-col justify-start items-center  gap-2">
           {!isMapOpen? modelPath==""?
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
            modelPath && <Scene setLoading={setLoading} modelPath={modelPath}/>:
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2">
              <Location/>
              {modelPath &&<Scene setLoading={setLoading} modelPath={modelPath}/>}
            </div>}
            
        </div>
      </section>
      <section className="w-full h-aut  col-span-2">
        {
        isMapOpen && <SamratYantraView/>
      }

      </section>
    </div>
  );
};

export default Home;
