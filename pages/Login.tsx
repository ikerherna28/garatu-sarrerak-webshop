
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass: string) => pass.length >= 8;
  const validatePhone = (phone: string) => /^\d{9}$/.test(phone);
  
  // No numbers allowed in name/surname. Allow letters, spaces, hyphens, accents.
  const validateName = (name: string) => /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s'-]+$/.test(name);

  const calculatePasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

    // Common validations
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Sartu baliozko posta elektroniko bat.';
    }

    if (isRegister) {
      if (!formData.name.trim()) {
        newErrors.name = 'Izena beharrezkoa da.';
      } else if (!validateName(formData.name)) {
        newErrors.name = 'Izenak ezin du zenbakirik izan.';
      }

      if (!formData.surname.trim()) {
        newErrors.surname = 'Abizena beharrezkoa da.';
      } else if (!validateName(formData.surname)) {
        newErrors.surname = 'Abizenak ezin du zenbakirik izan.';
      }
      
      if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Telefonoak zehazki 9 digitu izan behar ditu.';
      }
      
      if (!validatePassword(formData.password)) {
        newErrors.password = 'Pasahitzak gutxienez 8 karaktere izan behar ditu.';
      } else if (passwordStrength < 2) {
        newErrors.password = 'Pasahitza ahulegia da. Erabili letrak eta zenbakiak.';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Pasahitzak ez datoz bat.';
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Pasahitza sartu behar duzu.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        await register(formData.email, formData.name, formData.surname, formData.phone, formData.password);
        navigate('/', { replace: true });
      } else {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/', { replace: true });
        } else {
          setErrors({ form: 'Posta elektronikoa edo pasahitza ez dira zuzenak.' });
        }
      }
    } catch (err) {
      setErrors({ form: 'Errore bat gertatu da. Saiatu berriro beranduago.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (field: string) => `
    w-full bg-white/5 border rounded-2xl h-14 px-6 text-white outline-none transition-all placeholder:text-white/20
    ${errors[field] ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-primary'}
  `;

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl bg-card-dark border border-white/10 rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden animate-slide-up">
        <div className="absolute -top-32 -right-32 size-64 bg-primary/20 blur-[100px] rounded-full"></div>
        
        <div className="mb-12 relative">
          <h2 className="text-5xl font-black uppercase tracking-tighter italic text-white">
            {isRegister ? 'Erregistratu' : 'Hasi Saioa'}
          </h2>
          <p className="text-white/40 mt-2 text-sm font-bold uppercase tracking-widest">
            {isRegister ? 'Sortu zure kontua sarrerak erosteko' : 'Sartu zure datuak jarraitzeko'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {errors.form && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center gap-3 animate-shake">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-red-500 text-xs font-black uppercase tracking-wide">{errors.form}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] ml-1">Posta Elektronikoa</label>
            <input 
              type="email" 
              className={inputClasses('email')}
              placeholder="zure@emaila.eus"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email}</p>}
          </div>

          {!isRegister ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Pasahitza</label>
                <button type="button" className="text-[9px] text-primary font-black uppercase tracking-widest hover:underline">Pasahitza ahaztu duzu?</button>
              </div>
              <input 
                type="password" 
                className={inputClasses('password')}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.password}</p>}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] ml-1">Izena</label>
                  <input type="text" className={inputClasses('name')} placeholder="Iker" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] ml-1">Abizena</label>
                  <input type="text" className={inputClasses('surname')} placeholder="Tolosa" value={formData.surname} onChange={(e) => setFormData({...formData, surname: e.target.value})} />
                  {errors.surname && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.surname}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] ml-1">Telefonoa (9 digitu)</label>
                <input 
                  type="tel" 
                  maxLength={9} 
                  className={inputClasses('phone')} 
                  placeholder="600000000" 
                  value={formData.phone} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setFormData({...formData, phone: val});
                  }} 
                />
                {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end ml-1">
                    <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Pasahitza (min 8 karaktere)</label>
                    <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-1 w-4 rounded-full transition-colors duration-500 ${passwordStrength >= i ? 'bg-primary shadow-[0_0_8px_rgba(248,27,230,0.6)]' : 'bg-white/10'}`}></div>
                        ))}
                    </div>
                </div>
                <input 
                  type="password" 
                  className={inputClasses('password')} 
                  placeholder="••••••••" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] ml-1">Errepikatu Pasahitza</label>
                <input 
                  type="password" 
                  className={inputClasses('confirmPassword')} 
                  placeholder="••••••••" 
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                />
                {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary h-16 rounded-full font-black text-xl shadow-neon-strong hover:scale-[1.03] active:scale-95 transition-all text-white mt-8 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              isRegister ? 'Sortu Kontua' : 'Sartu'
            )}
          </button>
        </form>

        <p className="mt-12 text-center text-white/40 text-sm font-bold uppercase tracking-widest">
          {isRegister ? 'Dagoeneko baduzu kontua?' : 'Ez duzu konturik oraindik?'}
          <button 
            onClick={() => {
              setIsRegister(!isRegister);
              setErrors({});
            }}
            className="ml-3 text-primary font-black hover:underline transition-all"
          >
            {isRegister ? 'Hasi saioa' : 'Erregistratu orain'}
          </button>
        </p>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
