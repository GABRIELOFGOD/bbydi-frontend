"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useUser } from "@/providers/userProvider";

export default function AccountSettings() {
  const { user, refreshUser } = useUser();
  const isAdmin = user?.role === "admin";
  const [profile, setProfile] = useState({ name: "", email: "", position: "", bio: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const frame = window.requestAnimationFrame(() => {
      setProfile({ name: user.name, email: user.email, position: user.position, bio: isAdmin ? user.bio ?? "" : "" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isAdmin, user]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileSaving(true);
    try {
      const result = await apiRequest<{ message: string }>("/auth/me", {
        method: "PATCH",
        body: { name: profile.name, email: profile.email, position: profile.position, ...(isAdmin ? { bio: profile.bio } : {}) },
      });
      await refreshUser();
      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordSaving(true);
    try {
      const result = await apiRequest<{ message: string }>("/auth/me/password", {
        method: "PATCH",
        body: { currentPassword, newPassword },
      });
      toast.success(result.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update password");
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <section className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-bold">Account settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile and sign-in password.</p>
      </div>
      <form onSubmit={saveProfile} className="space-y-4 rounded border p-5">
        <h2 className="font-semibold">Profile</h2>
        {([
          ["name", "Name", "text"],
          ["email", "Email", "email"],
          ["position", "Position", "text"],
        ] as const).map(([key, label, type]) => (
          <label key={key} className="block space-y-1.5 text-sm font-medium">
            <span>{label}</span>
            <input
              type={type}
              value={profile[key]}
              onChange={(event) => setProfile((current) => ({ ...current, [key]: event.target.value }))}
              required={key !== "position"}
              className="h-10 w-full rounded border px-3"
            />
          </label>
        ))}
        {isAdmin && <label className="block space-y-1.5 text-sm font-medium">
          <span>Biography</span>
          <textarea
            value={profile.bio}
            onChange={(event) => setProfile((current) => ({ ...current, bio: event.target.value }))}
            maxLength={5000}
            rows={7}
            className="w-full rounded border p-3"
            placeholder="Share your background, experience, and work at BBYDI."
          />
          <span className="block text-xs font-normal text-muted-foreground">Up to 5,000 characters. Your biography may appear on your public team profile.</span>
        </label>}
        <button disabled={profileSaving} className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {profileSaving ? "Saving..." : "Save profile"}
        </button>
      </form>
      <form onSubmit={updatePassword} className="space-y-4 rounded border p-5">
        <h2 className="font-semibold">Change password</h2>
        <label className="block space-y-1.5 text-sm font-medium">
          <span>Current password</span>
          <input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required className="h-10 w-full rounded border px-3" />
        </label>
        <label className="block space-y-1.5 text-sm font-medium">
          <span>New password</span>
          <input type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required minLength={8} className="h-10 w-full rounded border px-3" />
          <span className="block text-xs font-normal text-muted-foreground">Use a strong password with mixed case, numbers, and symbols.</span>
        </label>
        <button disabled={passwordSaving} className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {passwordSaving ? "Updating..." : "Update password"}
        </button>
      </form>
    </section>
  );
}
