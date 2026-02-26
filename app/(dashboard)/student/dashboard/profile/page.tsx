'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, MapPin, Phone, Briefcase, Camera, 
  Edit2, CheckCircle2, Loader2, Save, X,
  Linkedin, Github, Twitter, Globe
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Cloudinary upload function
const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'your_preset');
  formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'your_cloud');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.secure_url;
};

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  occupation: string;
  company: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  avatar: string;
  updatedAt: string;
}

const defaultProfile: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  occupation: '',
  company: '',
  website: '',
  linkedin: '',
  github: '',
  twitter: '',
  avatar: '',
  updatedAt: new Date().toISOString(),
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>(defaultProfile);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
          setEditForm(parsed);
        } catch (e) {
          console.error('Failed to parse profile:', e);
        }
      }
    }
  }, []);

  // Initialize with auth user data if no local data
  useEffect(() => {
    if (user && !profile.firstName && !profile.lastName) {
      const initialData = {
        ...defaultProfile,
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        email: user.email || '',
        avatar: user.profile?.avatar || '',
      };
      setProfile(initialData);
      setEditForm(initialData);
      localStorage.setItem('userProfile', JSON.stringify(initialData));
    }
  }, [user, profile.firstName, profile.lastName]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedData = {
      ...editForm,
      updatedAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedData));
    setProfile(updatedData);
    setIsEditing(false);
    setIsSaving(false);
    
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      
      // Update local state
      const updated = {
        ...profile,
        avatar: imageUrl,
        updatedAt: new Date().toISOString(),
      };
      
      setProfile(updated);
      setEditForm(updated);
      localStorage.setItem('userProfile', JSON.stringify(updated));
      
      toast.success('Profile picture updated!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getInitials = useCallback(() => {
    const first = profile.firstName?.[0] || '';
    const last = profile.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  }, [profile.firstName, profile.lastName]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Please Sign In</h3>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </Card>
      </div>
    );
  }

  const displayData = isEditing ? editForm : profile;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal information
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-2"
            >
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="viewing"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Profile Card */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-purple-600" />
        
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6">
            {/* Avatar with Upload */}
            <div className="relative group self-center md:self-auto">
              <Avatar className="w-32 h-32 border-4 border-card shadow-xl">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              
              {/* Upload Button */}
              <label 
                className={`absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary/90 transition-all ${isUploading ? 'opacity-50' : ''}`}
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Name & Role */}
            <div className="flex-1 text-center md:text-left mb-2">
              <h2 className="text-2xl font-bold">
                {profile.firstName || profile.lastName 
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Complete Your Profile'
                }
              </h2>
              <p className="text-muted-foreground">{profile.email || user.email}</p>
              {profile.occupation && (
                <Badge variant="secondary" className="mt-2">
                  {profile.occupation}
                </Badge>
              )}
            </div>

            {/* Social Links (View Mode Only) */}
            {!isEditing && (
              <div className="flex gap-2 justify-center md:justify-end">
                {profile.linkedin && (
                  <a 
                    href={profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.github && (
                  <a 
                    href={profile.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.twitter && (
                  <a 
                    href={profile.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {profile.website && (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="John"
                />
              ) : (
                <p className="text-lg font-medium p-2 bg-muted/30 rounded-md min-h-[40px]">
                  {profile.firstName || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Doe"
                />
              ) : (
                <p className="text-lg font-medium p-2 bg-muted/30 rounded-md min-h-[40px]">
                  {profile.lastName || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              )}
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </label>
              <p className="text-lg font-medium p-2 bg-muted/30 rounded-md text-muted-foreground">
                {profile.email || user.email}
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={displayData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <p className="text-lg font-medium p-2 bg-muted/30 rounded-md min-h-[40px]">
                  {profile.phone || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="City, Country"
                />
              ) : (
                <p className="text-lg font-medium p-2 bg-muted/30 rounded-md min-h-[40px]">
                  {profile.location || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              )}
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Occupation
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={displayData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Software Developer"
                />
              ) : (
                <p className="text-lg font-medium p-2 bg-muted/30 rounded-md min-h-[40px]">
                  {profile.occupation || <span className="text-muted-foreground italic">Not set</span>}
                </p>
              )}
            </div>
          </div>

          {/* Bio - Full Width */}
          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium">Bio</label>
            {isEditing ? (
              <textarea
                value={displayData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-base p-3 bg-muted/30 rounded-md min-h-[100px]">
                {profile.bio || <span className="text-muted-foreground italic">No bio added yet. Click edit to add your bio.</span>}
              </p>
            )}
          </div>

          {/* Social Links - Edit Mode Only */}
          {isEditing && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Social Links
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={displayData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Github className="w-4 h-4 text-gray-800" />
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={displayData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={displayData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={displayData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Last Updated */}
      {profile.updatedAt && (
        <p className="text-center text-xs text-muted-foreground">
          Last updated: {new Date(profile.updatedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}