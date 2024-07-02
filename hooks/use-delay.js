import { useEffect, useState } from "react";

export default function useDelay(mlSeconds) {
  const [isDelaying, setIsDelaying] = useState(false);
  const [timeoutID, setTimeoutID] = useState(null);

  const startDelay = (func) => {
    setIsDelaying(true);
    clearTimeout(timeoutID);

    const newTimeout = setTimeout(() => {
      func && func();
      setIsDelaying(false);
    }, mlSeconds);
    setTimeoutID(newTimeout);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return [isDelaying, startDelay];
}

// desc: this custom hook is used to delay re-render happening whenever state changing too fast, if there is a large data or a complex algo happen whenever state change,
// it will cause lagging.
// If the change keep happening under given time, the state will not change until the change stop happening for given time
// isPending will return true when the change happening, and return false when the state change. this prop can be used to display loading.
//
// usage
// const [isPending, startDelay] = useDelay(500); // 500 is delay time in milliseconds, if does not given delay time, default value will be 400
// const [value, setValue] = useState("");
//
// const handleValueChange = (newValue) => {
//   startDelay(() => {
//     setValue(newValue)
//   });
// };
