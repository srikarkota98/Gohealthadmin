import { User, Shield, Bell, Database, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-slate-900 mb-1">Settings</h2>
        <p className="text-slate-500">Manage your admin profile and system configurations.</p>
      </div>

      {/* Admin Profile */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            <CardTitle className="text-slate-900">Admin Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" defaultValue="Admin" />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" defaultValue="User" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@gohealth.com" defaultValue="admin@gohealth.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
          <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-slate-900">Security</CardTitle>
          </div>
          <CardDescription>Manage your password and security preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <CardTitle className="text-slate-900">Notifications</CardTitle>
          </div>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-slate-500">Receive notifications via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Alerts</Label>
              <p className="text-slate-500">Get notified about new payments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New User Signups</Label>
              <p className="text-slate-500">Alert when new users register</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Updates</Label>
              <p className="text-slate-500">Important system notifications</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-slate-900">Roles & Permissions</CardTitle>
          </div>
          <CardDescription>Manage admin roles and access levels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-slate-900 mb-1">Super Admin</p>
              <p className="text-slate-500">Full system access</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-slate-900 mb-1">Content Manager</p>
              <p className="text-slate-500">Manage meal plans and content</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-slate-900 mb-1">Support Admin</p>
              <p className="text-slate-500">User support and messages</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-slate-900 mb-1">Financial Admin</p>
              <p className="text-slate-500">Payments and billing access</p>
            </div>
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            Manage Roles
          </Button>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-600" />
            <CardTitle className="text-slate-900">System Configuration</CardTitle>
          </div>
          <CardDescription>General system settings and preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" placeholder="GoHealth" defaultValue="GoHealth" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Support Email</Label>
            <Input id="supportEmail" type="email" placeholder="support@gohealth.com" defaultValue="support@gohealth.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input id="timezone" placeholder="UTC-5" defaultValue="UTC-5 (Eastern Time)" />
          </div>
          <Button variant="outline">Update Configuration</Button>
        </CardContent>
      </Card>
    </div>
  );
}
