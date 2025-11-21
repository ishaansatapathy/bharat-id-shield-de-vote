import { useEffect, useMemo, useRef, useState } from "react";
import { getUserByPhone } from "@/lib/db";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type ProfileData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
};

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayName = useMemo(() => {
    if (!data) return "";
    const first = data.firstName || "";
    const last = data.lastName || "";
    return `${first} ${last}`.trim();
  }, [data]);

  useEffect(() => {
    const raw = localStorage.getItem("auth-state");
    const auth = raw ? JSON.parse(raw) as { isAuthenticated: boolean; phone?: string } : null;
    if (!auth?.isAuthenticated || !auth.phone) {
      navigate('/auth', { replace: true });
      return;
    }
    (async () => {
      try {
        const fromDb = await getUserByPhone(auth.phone!);
        if (fromDb) {
          setData({
            firstName: fromDb.firstName,
            lastName: fromDb.lastName,
            email: fromDb.email,
            phone: fromDb.phone,
          });
        } else {
          const fromLocal = localStorage.getItem("profile-data");
          const localParsed = fromLocal ? (JSON.parse(fromLocal) as ProfileData) : null;
          setData(localParsed);
        }
      } catch {
        const fromLocal = localStorage.getItem("profile-data");
        const localParsed = fromLocal ? (JSON.parse(fromLocal) as ProfileData) : null;
        setData(localParsed);
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text) as ProfileData;
      localStorage.setItem("profile-data", JSON.stringify(json));
      setData(json);
      toast({ title: "Profile loaded", description: "Details imported from document." });
    } catch (err) {
      setError("Invalid JSON file");
      toast({ title: "Import failed", description: "Invalid JSON file", });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Source: documents/profile.json or local import</p>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
                <Button variant="outline" onClick={handleImportClick}>Import JSON</Button>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading details...</p>
            ) : data ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-base font-medium">{displayName || "-"}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-base">{data.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-base">{data.phone || "-"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-base">{data.address || "-"}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">City</p>
                    <p className="text-base">{data.city || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">State</p>
                    <p className="text-base">{data.state || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">PIN Code</p>
                    <p className="text-base">{data.pincode || "-"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No profile found. Please place documents/profile.json or import a JSON file.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


