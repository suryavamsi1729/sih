
import { LocateFixed } from "lucide-react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Label from "../../components/ui/lable";
import Select, { type Option } from "../../components/ui/select";
import { useState, type Dispatch, type SetStateAction } from "react";

interface YantrasParametersFormProps{
    setModelPath? : Dispatch<SetStateAction<string>>;
    loading : boolean;
    setLoading :  Dispatch<SetStateAction<boolean>>;
}

const YantrasParametersForm: React.FC<YantrasParametersFormProps> = ({setModelPath,setLoading,loading}) => {
    const [formData, setFormData] = useState({
        logitude: "",
        latitude: "",
        yantra: "",
        scale: "1.0",
        median: "",
    });
    const yantraOptions: Option[] = [
        { value: "samrat", label: "Samrat", model: "/assets/models/model1.glb" },
        { value: "rama", label: "Rama", model: "/assets/models/model2.glb"  },
        { value: "digmasa", label: "Digmasa", model: "/assets/models/model3.glb" },
        { value: "nadivalaya", label: "Nadivalaya", model: "/assets/models/model4.glb"  },
        { value: "kranthi vritta", label: "Kranthi Vritta" , model: "/assets/models/model5.glb" },
    ];
      const medianOptions: Option[] =[
        { value: "greenwich", label: "Greenwich (Modern)"  },
        { value: "ujjain", label: "Ujjain (Historical)"  },
      ]
      const getUserLocation = () => {
        if (navigator.geolocation) {
          // what to do if supported
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  // what to do once we have the position
                  const { latitude, longitude } = position.coords;
                  setFormData({...formData,latitude:String(latitude),logitude:String(longitude)})
              },
              (error) => {
                  // display an error if we cant get the users position
                  console.error('Error getting user location:', error);
              }
          );
        }
        else {
            // display an error if not supported
            console.error('Geolocation is not supported by this browser.');
        }
      };

    return (
        <form className="w-full flex flex-col justify-start items-start gap-6">
            <Select className={`${loading?"cursor-not-allowed":""}`} label="Select Yantra" placeholder="Pick one..." options={yantraOptions} value={formData.yantra} onChange={
                (val) => {
                    setLoading(true);
                    setFormData({ ...formData, yantra: val || "" });
                    const selectedOption = yantraOptions.filter((option)=>option.value==val)[0];
                    if(selectedOption && setModelPath && selectedOption.model){
                        setModelPath(selectedOption.model);
                        setLoading(false);
                    }
                }

            }/>
            <div className={`w-full flex flex-col gap-2`}>
              <Label lable="Location Coordinate" htmlFor=""/>
              <div className="w-full flex flex-row gap-2">
                <Input id="latitude" type="text" placeholder="Latitude (e.g., 26.9124" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}  />
                <Input id="latitude" type="text" placeholder="Latitude (e.g., 26.9124" value={formData.logitude} onChange={(e) => setFormData({ ...formData, logitude: e.target.value })}  />
              </div>
              <Button onClick={()=>{getUserLocation()}} className="w-full flex flex-row gap-2 border border-border bg-secondary text-text hover:bg-[#4a4a4a] hover:cursor-pointer" size="md" variant="outline">
                <LocateFixed size={20}/>
                <p>Location Coordinates</p>
              </Button>
            </div>
            <div className={`w-full flex flex-col gap-1.5`}>
              <Label lable="Scale Factor" htmlFor=""/>
                <Input type="number" step={0.1} value={formData.scale} onChange={(e) => setFormData({ ...formData, scale: e.target.value })}  />
            </div>
            <Select label="Reference Meridian" placeholder="Pick one..." options={medianOptions} value={formData.median} onChange={(val) => setFormData({ ...formData, median: val || "" })}/>
            <Button  className="w-full flex flex-row gap-2 font-semibold border border-border bg-accent text-bg hover:bg-[#ffb84d] hover:cursor-pointer mt-2" size="md" variant="outline">
                <p>Generate Dimensionss</p>
            </Button>
        </form>
    )
}

export default YantrasParametersForm;
