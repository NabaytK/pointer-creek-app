import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  userDepartment: string;
}

export function SettingsView({ userName, userEmail, userDepartment }: SettingsViewProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="mb-6">Settings & Profile</h1>

      {/* Profile Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Azure AD Profile</CardTitle>
          <CardDescription>Your account is managed through Azure Active Directory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-[#5a7a7c] text-white text-xl">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3>{userName}</h3>
              <p className="text-muted-foreground">{userEmail}</p>
              <p className="text-muted-foreground text-sm">{userDepartment} Department</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={userEmail} disabled className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" value={userDepartment} disabled className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value="AI Platform User" disabled className="bg-gray-50" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Profile information is synced from Azure AD and cannot be edited here.
          </p>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your AI Platform experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your AI sessions
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Save Chat History</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save all conversations for future reference
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch to dark theme for reduced eye strain
              </p>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics</Label>
              <p className="text-sm text-muted-foreground">
                Help us improve by sharing anonymous usage data
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Last Sign In</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>

          <Separator />

          <div>
            <Label>Authentication Method</Label>
            <p className="text-sm text-muted-foreground mt-1">Azure AD Single Sign-On (SSO)</p>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button variant="outline" className="hover:bg-gray-50">
              View Activity Log
            </Button>
            <Button variant="outline" className="hover:bg-gray-50">
              Manage Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
