// src/components/LinkedInEmbed.jsx
import { useEffect, useRef } from "react";

export default function LinkedInEmbed({ postUrl, locale = "en_US" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!postUrl || !ref.current) return;

    // Set the target blockquote each time the URL changes
    ref.current.innerHTML = `
      <blockquote class="linkedin-post">
        <a href="${postUrl}"></a>
      </blockquote>
    `;

    const scriptId = "linkedin-embed-script";
    const init = () => {
      if (window.IN && window.IN.parse) window.IN.parse();
    };

    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://platform.linkedin.com/in.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `lang: ${locale}`;
      document.body.appendChild(script);
      // give the SDK a beat to attach, then parse
      setTimeout(init, 500);
    } else {
      init();
    }
  }, [postUrl, locale]);

  return <div ref={ref} />;
}
