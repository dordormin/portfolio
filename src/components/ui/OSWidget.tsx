import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function OSWidget() {
  const [time, setTime] = useState(new Date());
  
  // Real weather state
  const [weather, setWeather] = useState({
    temp: '--°C',
    desc: 'Loading...',
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
        let desc = 'Clear';
        let id = 'sun';
        
        const code = current.weathercode;
        
        // WMO Weather interpretation codes
        if (code === 0) {
          icon = Sun; color = 'text-yellow-400'; desc = 'Sunny'; id = 'sun';
        } else if (code >= 1 && code <= 3) {
          icon = Cloud; color = 'text-gray-300'; desc = 'Cloudy'; id = 'cloud';
        } else if (code >= 45 && code <= 48) {
          icon = Cloud; color = 'text-gray-400'; desc = 'Foggy'; id = 'fog';
        } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
          icon = CloudRain; color = 'text-blue-400'; desc = 'Rainy'; id = 'rain';
        } else if (code >= 71 && code <= 77) {
          icon = CloudSnow; color = 'text-white'; desc = 'Snowy'; id = 'snow';
        } else if (code >= 95 && code <= 99) {
          icon = CloudLightning; color = 'text-purple-400'; desc = 'Stormy'; id = 'storm';
        }
        
        setWeather({
          temp: `${Math.round(current.temperature)}°C`,
          desc,
          icon,
          color,
          id
        });
      } catch (err) {
        setWeather({ temp: '--°C', desc: 'Unavailable', icon: Cloud, color: 'text-red-400', id: 'error' });
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      className="flex flex-col gap-4 p-5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden relative"
    >
      {/* Decorative gradient blob inside widget */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header: Date & Time */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex flex-col">
          <span className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1 flex items-center gap-1">
            <CalendarDays size={12} />
            {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <span className="text-4xl font-light text-white flex items-center gap-2">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            <span className="text-white/20 text-sm animate-pulse">: {time.getSeconds().toString().padStart(2, '0')}</span>
          </span>
        </div>
      </div>

      {/* Body: Weather */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-white/50 text-xs font-mono uppercase tracking-wider mb-1">Local Env</span>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-medium text-white">{weather.temp}</span>
            <span className="text-white/60 text-sm mb-1">{weather.desc}</span>
          </div>
        </div>
        
        <div className="relative w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={weather.id}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <WeatherIcon size={32} className={weather.color} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer: CPU / Status mockup */}
      <div className="mt-2 pt-4 border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-500 rounded-full"
            animate={{ width: ["30%", "70%", "40%", "80%", "30%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[10px] text-white/40 font-mono">SYS_OK</span>
      </div>
    </motion.div>
  );
}
