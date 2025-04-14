import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PhoneInputWithGeo() {
  const [country, setCountry] = useState("us"); // fallback
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          setCountry(data.country_code.toLowerCase()); // 'US' -> 'us'
        }
      })
      .catch((err) => {
        console.error("Error fetching location:", err);
      });
  }, []);

  return (
    <PhoneInput
      country={country}
      value={phone}
      onChange={setPhone}
      inputClass="your-tailwind-classes"
    />
  );
}
export default PhoneInputWithGeo;
