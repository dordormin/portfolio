import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/data';

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
      className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-background border border-border shadow-2xl shadow-black/80 overflow-hidden relative w-full"
    >
      {/* Header: Date & Time */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
        <div className="flex flex-col">
          <span className="text-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
            <CalendarDays size={12} className="sm:w-[14px] sm:h-[14px]" />
            {time.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white flex items-center gap-1 sm:gap-2">
            {time.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })}
            <span className="text-white/20 text-xs sm:text-sm md:text-base animate-pulse mt-1 sm:mt-2">: {time.getSeconds().toString().padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Body: Weather */}
      <div className="flex items-center justify-between pt-1 sm:pt-2">
        <div className="flex flex-col">
          <span className="text-white/50 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-1">{t.localEnv}</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">{weather.temp}</span>
            <span className="text-white/60 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">{weatherDesc}</span>
          </div>
        </div>
        
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-surface rounded-xl sm:rounded-2xl border border-border shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={weather.id}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <WeatherIcon size={24} className={`${weather.color} sm:w-8 sm:h-8`} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer: CPU / Status mockup */}
      <div className="mt-1 sm:mt-2 pt-3 sm:pt-4 border-t border-white/10 flex items-center gap-2 sm:gap-3">
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-500 rounded-full"
            animate={{ width: ["30%", "70%", "40%", "80%", "30%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[9px] sm:text-[10px] text-white/40 font-mono shrink-0">{t.sysOk}</span>
      </div>
    </motion.div>
  );
}
