import React, { createContext, useState,type ReactNode } from "react";

interface FormDataType {
  longitude: string;
  latitude: string;
  yantra: string;
  scale: string;
  median: string;
}

interface FormContextType {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}
export  const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider:React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>({
    longitude: "",
    latitude: "",
    yantra: "",
    scale: "1.0",
    median: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
