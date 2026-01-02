import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Smartphone, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const LoginScreen = () => {
  const { requestOtp, verifyOtp, loading } = useAuth();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return;
    const success = await requestOtp(phoneNumber);
    if (success) setStep('otp');
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) return;
    await verifyOtp(phoneNumber, otp);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden p-4">
      {/* Cosmic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px]" />
      
      {/* Floating Particles (Simulated) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-overlay"></div>

      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl relative z-10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardHeader className="text-center space-y-3 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-2">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
            Goal<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Tracker</span> 365
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">
            Your personal analytics command center
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Mobile Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-purple-500/20 h-12"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-lg shadow-lg shadow-purple-900/20"
                disabled={loading || phoneNumber.length < 3}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send OTP <ArrowRight className="w-5 h-5 ml-2" /></>}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="otp" className="text-slate-300">Verification Code</Label>
                    <button type="button" onClick={() => setStep('phone')} className="text-xs text-purple-400 hover:text-purple-300">Change Number</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <Input 
                    id="otp"
                    type="text"
                    placeholder="Enter code (1234)"
                    className="pl-10 bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:ring-cyan-500/20 h-12 tracking-widest text-lg"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 text-center pt-2">
                    Enter <span className="text-white font-mono">1234</span> to login
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-lg shadow-lg shadow-cyan-900/20"
                disabled={loading || otp.length !== 4}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Access Dashboard"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
      
      <div className="absolute bottom-6 text-slate-600 text-xs">
        Secure mock authentication powered by Emergent
      </div>
    </div>
  );
};

export default LoginScreen;
