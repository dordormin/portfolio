import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data';
import { Logo } from './Logo';
import { Magnetic } from './Magnetic';

export function OSWidget() {
  const { language } = useLanguage();
  const t = translations[language].ui.osWidget;
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  const [time, setTime] = useState(new Date());
  
  // Real weather state
  const [weather, setWeather] = useState({
    temp: '--°C',
    descKey: 'loading',
    icon: Sun,
    color: 'text-gray-400',
    id: 'loading'
  });

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch real weather using Open-Meteo
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const current = data.current_weather;
        
        let icon = Sun;
        let color = 'text-yellow-400';
        let descKey = 'clear';
        let id = 'sun';
        
        const code = current.weathercode;
        
        // WMO Weather interpretation codes
        if (code === 0) {
          icon = Sun; color = 'text-yellow-400'; descKey = 'sunny'; id = 'sun';
        } else if (code >= 1 && code <= 3) {
          icon = Cloud; color = 'text-gray-300'; descKey = 'cloudy'; id = 'cloud';
        } else if (code >= 45 && code <= 48) {
          icon = Cloud; color = 'text-gray-400'; descKey = 'foggy'; id = 'fog';
        } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
          icon = CloudRain; color = 'text-blue-400'; descKey = 'rainy'; id = 'rain';
        } else if (code >= 71 && code <= 77) {
          icon = CloudSnow; color = 'text-white'; descKey = 'snowy'; id = 'snow';
        } else if (code >= 95 && code <= 99) {
          icon = CloudLightning; color = 'text-purple-400'; descKey = 'stormy'; id = 'storm';
        }
        
        setWeather({
          temp: `${Math.round(current.temperature)}°C`,
          descKey,
          icon,
          color,
          id
        });
      } catch (err) {
        setWeather({ temp: '--°C', descKey: 'unavailable', icon: Cloud, color: 'text-red-400', id: 'error' });
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback to Paris if user denies geolocation
          fetchWeather(48.8566, 2.3522);
        }
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  const WeatherIcon = weather.icon;
  // @ts-ignore
  const weatherDesc = t.weather[weather.descKey] || weather.descKey;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      className="flex flex-col gap-4 sm:gap-6 p-6 sm:p-8 rounded-[2rem] bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden relative w-full"
    >
      {/* Top Row: Volume & Logo (Console Style Right-Aligned priority) */}
      <div className="flex items-start justify-between border-b border-white/10 pb-4 sm:pb-6">
        
        {/* Date & Time (Left) */}
        <div className="flex flex-col">
          <span className="text-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
            <CalendarDays size={14} />
            {time.toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tighter flex items-end gap-2">
            {time.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}
            <span className="text-white/20 text-sm md:text-xl font-medium animate-pulse mb-1 md:mb-2">
              : {time.getSeconds().toString().padStart(2, '0')}
            </span>
          </span>
        </div>

        {/* Logo (Right) */}
        <div className="flex flex-col items-end gap-4">
          <div className="hidden sm:block opacity-80 mt-2">
            <Logo className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Body: Weather & CPU */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-2">{t.localEnv}</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 shrink-0 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={weather.id}
                  initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <WeatherIcon size={28} className={weather.color} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-medium text-white tracking-tight">{weather.temp}</span>
              <span className="text-orange-500/80 text-xs sm:text-sm font-medium tracking-wide">{weatherDesc}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer: CPU / Status mockup */}
      <div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"
            animate={{ width: ["30%", "85%", "40%", "90%", "30%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] text-white/40 font-mono tracking-[0.2em] shrink-0 uppercase">{t.sysOk}</span>
      </div>
    </motion.div>
  );
}
