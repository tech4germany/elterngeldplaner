import { createContext, useMemo, useState } from 'react';

const FormContext = createContext();
export default FormContext;

export const FormContextWrapper = ({ children }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const formContextValue = useMemo(
    () => ({
      activeStepIndex,
      setActiveStepIndex,
      formData,
      setFormData
    }),
    [activeStepIndex, setActiveStepIndex, formData, setFormData]
  );

  return <FormContext.Provider value={formContextValue}> {children} </FormContext.Provider>;
};
