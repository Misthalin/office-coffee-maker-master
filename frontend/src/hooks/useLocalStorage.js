// Inspired by Web Dev Simplified
// Link: https://github.com/WebDevSimplified/react-budget-app/tree/main/src/hooks
import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const JsonValue = localStorage.getItem(key);
    if (JsonValue != null) return JSON.parse(JsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
});
useEffect(() => {
localStorage.setItem(key, JSON.stringify(value))
}, [key, value])
return [value, setValue]
}
