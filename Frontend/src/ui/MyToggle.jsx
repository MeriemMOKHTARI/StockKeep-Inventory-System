import React, { useState } from "react";
import { Switch } from "@headlessui/react";

function MyToggle({ enabled, onToggle }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  const handleChange = (Enabled) => {
    setIsEnabled(!isEnabled);
    onToggle(!isEnabled);
  };

  return (
    <Switch
      checked={isEnabled}
      onChange={handleChange}
      className={`${
        isEnabled ? "bg-customGreen" : "bg-gray-200"
      } relative inline-flex h-[22px] w-[50px] items-center rounded-full`}
    >
      <span className="sr-only">Toggle activity</span>
      <span
        className={`${
          isEnabled ? "translate-x-14" : "translate-x-1"
        } inline-block h-5 w-5 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

export default MyToggle;
