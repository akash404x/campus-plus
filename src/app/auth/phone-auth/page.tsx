'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { Sparkles, Phone, ArrowRight, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { UserRole } from '@/lib/firebase';

export default function PhoneAuthPage() {
  const router = useRouter();
  const { sendOtp, verifyOtp } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const recaptchaVerifierRef = useRef<any>(null);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }

    setIsLoading(true);

    try {
      // Initialize reCAPTCHA verifier
      const recaptchaVerifier = new (window as any).firebase.auth.RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            // reCAPTCHA solved
          },
          'expired-callback': () => {
            toast.error('reCAPTCHA expired. Please try again.');
          },
        }
      );

      recaptchaVerifierRef.current = recaptchaVerifier;

      const result = await sendOtp(phoneNumber, recaptchaVerifier);
      
      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      setConfirmationResult(result.confirmationResult);
      setIsOtpSent(true);
      toast.success('OTP sent successfully!');
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsLoading(true);

    const result = await verifyOtp(confirmationResult, otp, role);
    
    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    toast.success('Phone verification successful!');
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-600/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 glass">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Phone Authentication</CardTitle>
            <CardDescription className="text-base">
              {isOtpSent ? 'Enter the OTP sent to your phone' : 'Enter your phone number to continue'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isOtpSent ? (
              <>
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['student', 'teacher', 'organizer'] as const).map((r) => (
                      <Button
                        key={r}
                        type="button"
                        variant={role === r ? 'gradient' : 'outline'}
                        className="capitalize"
                        onClick={() => setRole(r)}
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full h-12 text-base"
                  variant="gradient"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : 'Send OTP'}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Or continue with </span>
                  <Link href="/auth/login" className="text-primary hover:underline font-medium ml-1">
                    Email
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    OTP sent to {phoneNumber}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12 text-center text-2xl tracking-widest"
                    maxLength={6}
                    required
                  />
                </div>

                <Button
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                  className="w-full h-12 text-base"
                  variant="gradient"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : 'Verify OTP'}
                  {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>

                <Button
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp('');
                    setConfirmationResult(null);
                  }}
                  variant="ghost"
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change phone number
                </Button>
              </>
            )}

            <div id="recaptcha-container" className="hidden" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
