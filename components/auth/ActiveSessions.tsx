'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Globe, LogOut, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ActiveSessions() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    const res = await fetch('/api/auth/sessions');
    const result = await res.json();
    if (result.success) setSessions(result.data);
    setLoading(false);
  };

  useEffect(() => { fetchSessions(); }, []);

  const handleRemoteLogout = async (sessionId: string) => {
    const res = await fetch('/api/auth/sessions', {
      method: 'DELETE',
      body: JSON.stringify({ sessionId }),
    });
    if (res.ok) {
      toast.success("Device disconnected");
      fetchSessions();
    }
  };

  if (loading) return <Loader2 className="animate-spin h-6 w-6 text-primary mx-auto" />;

  return (
    <Card className="border-primary/10 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">Security: Active Devices</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <div key={session._id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border">
            <div className="flex items-center gap-4">
              {session.userAgent.includes('Mobile') ? <Smartphone className="text-zinc-400" /> : <Monitor className="text-zinc-400" />}
              <div>
                <p className="text-sm font-bold truncate max-w-[150px]">{session.userAgent.split(')')[0]})</p>
                <p className="text-[10px] text-muted-foreground font-mono">{session.ip}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:bg-red-50"
              onClick={() => handleRemoteLogout(session.refreshToken)}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
