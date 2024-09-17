import  { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

const greetings = [
  { language: "Hindi", greeting: "नमस्ते (Namaste)" },
  { language: "Bengali", greeting: "নমস্কার (Nomoshkar)" },
  { language: "Telugu", greeting: "నమస్కారం (Namaskaram)" },
  { language: "Tamil", greeting: "வணக்கம் (Vanakkam)" },
  { language: "Kannada", greeting: "ನಮಸ್ಕಾರ (Namaskara)" },
  { language: "Malayalam", greeting: "നമസ്കാരം (Namaskaram)" },
  { language: "Gujarati", greeting: "નમસ્તે (Namaste)" },
  { language: "Marathi", greeting: "नमस्कार (Namaskar)" },
  { language: "Punjabi", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akal)" },
  { language: "Odia", greeting: "ନମସ୍କାର (Namaskar)" },
  { language: "Assamese", greeting: "নমস্কাৰ (Nomoskar)" },
  { language: "Urdu", greeting: "السلام علیکم (As-salamu Alaykum)" }
];

const TypedGreetings = () => {
  const typedElement = useRef(null);
  const [colorClass, setColorClass] = useState('text-orange-500'); 

  // Define color classes for the tricolor (Saffron,  Green)
  const colorClasses = ['text-orange-500', 'text-green-600'];

  useEffect(() => {
    const greetingsArray = greetings.map(item => item.greeting);

    // Initialize Typed.js
    const typed = new Typed(typedElement.current, {
      strings: greetingsArray,
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 1000,
      loop: true,
      onStringTyped: (arrayPos) => {
        setColorClass(colorClasses[arrayPos % colorClasses.length]);
      }
    });
  
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <h1 className={`text-xl font-bold ${colorClass}`}>
        <span ref={typedElement}></span>
      </h1>
    </div>
  );
};

export default TypedGreetings;
