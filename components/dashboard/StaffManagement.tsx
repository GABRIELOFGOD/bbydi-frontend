"use client";

import { DragEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { StaffAccount, StaffProfile } from "@/lib/content";
import { useUser } from "@/providers/userProvider";

type ProfileForm = {
  name: string;
  position: string;
  category: "leadership" | "staff" | "volunteer";
  bio: string;
  accountId: string;
};

const emptyProfile: ProfileForm = { name: "", position: "", category: "staff", bio: "", accountId: "" };

export default function StaffManagement() {
  const { user } = useUser();
  const [profiles, setProfiles] = useState<StaffProfile[]>([]);
  const [accounts, setAccounts] = useState<StaffAccount[]>([]);
  const [profileForm, setProfileForm] = useState<ProfileForm>(emptyProfile);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [editingProfile, setEditingProfile] = useState<StaffProfile | null>(null);
  const [accountForm, setAccountForm] = useState({ name: "", email: "", position: "", bio: "" });
  const [editingAccount, setEditingAccount] = useState<StaffAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedProfileId, setDraggedProfileId] = useState("");

  const load = useCallback(async () => {
    try {
      const [profileResult, accountResult] = await Promise.all([
        apiRequest<StaffProfile[]>("/staff/profiles/all"),
        apiRequest<{ data: StaffAccount[] }>("/staff/accounts/all"),
      ]);
      setProfiles(profileResult);
      setAccounts(accountResult.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load staff");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role !== "admin") return;
    let active = true;
    Promise.all([
      apiRequest<StaffProfile[]>("/staff/profiles/all"),
      apiRequest<{ data: StaffAccount[] }>("/staff/accounts/all"),
    ])
      .then(([profileResult, accountResult]) => {
        if (!active) return;
        setProfiles(profileResult);
        setAccounts(accountResult.data);
      })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load staff");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.role]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    const body = new FormData();
    Object.entries(profileForm).forEach(([key, value]) => body.append(key, value));
    if (profileImage) body.append("image", profileImage);
    try {
      const path = `/staff/profiles${editingProfile ? `/${editingProfile._id}` : ""}`;
      await apiRequest(path, { method: editingProfile ? "PATCH" : "POST", body });
      toast.success(editingProfile ? "Team profile updated" : "Team profile created");
      setProfileForm(emptyProfile);
      setProfileImage(null);
      setEditingProfile(null);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save team profile");
    } finally {
      setSaving(false);
    }
  };

  const editProfile = (profile: StaffProfile) => {
    setEditingProfile(profile);
    setProfileForm({
      name: profile.name,
      position: profile.position,
      category: profile.category,
      bio: profile.bio ?? "",
      accountId: profile.accountId ?? "",
    });
    setProfileImage(null);
  };

  const toggleProfile = async (profile: StaffProfile) => {
    try {
      await apiRequest(`/staff/profiles/${profile._id}`, {
        method: "PATCH",
        body: { active: !profile.active },
      });
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update team profile");
    }
  };

  const persistProfileOrder = async (category: StaffProfile["category"], sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    const sectionProfiles = profiles.filter((profile) => profile.category === category);
    const sourceIndex = sectionProfiles.findIndex((profile) => profile._id === sourceId);
    const targetIndex = sectionProfiles.findIndex((profile) => profile._id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    const reordered = [...sectionProfiles];
    const [movedProfile] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, movedProfile);
    setProfiles((current) => [
      ...current.filter((profile) => profile.category !== category),
      ...reordered.map((profile, displayOrder) => ({ ...profile, displayOrder })),
    ]);
    try {
      await apiRequest("/staff/profiles/reorder", {
        method: "POST",
        body: { category, profileIds: reordered.map((profile) => profile._id) },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save team profile order");
      await load();
    }
  };

  const handleProfileDrop = (event: DragEvent<HTMLElement>, profile: StaffProfile) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain") || draggedProfileId;
    setDraggedProfileId("");
    if (sourceId) void persistProfileOrder(profile.category, sourceId, profile._id);
  };

  const editAccount = (account: StaffAccount) => {
    setEditingAccount(account);
    setAccountForm({ name: account.name, email: account.email, position: account.position, bio: account.bio ?? "" });
  };

  const saveAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingAccount) return;
    setSaving(true);
    try {
      await apiRequest(`/staff/accounts/${editingAccount._id}`, {
        method: "PATCH",
        body: accountForm,
      });
      toast.success("Staff account updated");
      setEditingAccount(null);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update staff account");
    } finally {
      setSaving(false);
    }
  };

  const createAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await apiRequest("/staff", { method: "POST", body: accountForm });
      toast.success("Staff account created and setup link sent to the organization webmail.");
      setAccountForm({ name: "", email: "", position: "", bio: "" });
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create staff account");
    } finally {
      setSaving(false);
    }
  };

  const invite = async (account: StaffAccount) => {
    try {
      const result = await apiRequest<{ message: string }>(`/staff/${account._id}/invite`, { method: "POST" });
      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send setup invitation");
    }
  };

  const toggleAccount = async (account: StaffAccount) => {
    try {
      await apiRequest(`/staff/accounts/${account._id}`, {
        method: "PATCH",
        body: { isBlocked: !account.isBlocked },
      });
      toast.success(account.isBlocked ? "Staff account reactivated" : "Staff account deactivated");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update staff account");
    }
  };

  if (user?.role !== "admin") {
    return <p className="rounded border p-5 text-sm">Only administrators can manage staff and public team profiles.</p>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-xl font-bold">Staff & team directory</h1>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-bold">Public team directory</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading team profiles...</p> : (["leadership", "staff", "volunteer"] as const).map((category) => {
            const sectionProfiles = profiles.filter((profile) => profile.category === category);
            return (
              <section key={category} className="space-y-2">
                <h3 className="pt-2 text-sm font-semibold">{category === "leadership" ? "Leadership" : category === "staff" ? "Programmes, research & operations" : "Volunteers"}</h3>
                {sectionProfiles.map((profile, index) => (
                  <article
                    key={profile._id}
                    draggable
                    onDragStart={(event) => {
                      setDraggedProfileId(profile._id);
                      event.dataTransfer.setData("text/plain", profile._id);
                      event.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => setDraggedProfileId("")}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => handleProfileDrop(event, profile)}
                    className={`flex flex-wrap items-center justify-between gap-3 rounded border p-3 ${draggedProfileId === profile._id ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" title="Drag to rearrange" className="cursor-grab select-none text-lg text-muted-foreground">⠿</span>
                      <div>
                        <p className="font-semibold">{profile.name}</p>
                        <p className="text-sm text-muted-foreground">{profile.position} · {profile.category}</p>
                        <p className="text-xs">{profile.active ? "Visible on public site" : "Deactivated"}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" aria-label={`Move ${profile.name} up`} disabled={index === 0} onClick={() => void persistProfileOrder(category, profile._id, sectionProfiles[index - 1]?._id ?? profile._id)} className="rounded border px-2 py-1.5 text-sm disabled:opacity-40">↑</button>
                      <button type="button" aria-label={`Move ${profile.name} down`} disabled={index === sectionProfiles.length - 1} onClick={() => void persistProfileOrder(category, profile._id, sectionProfiles[index + 1]?._id ?? profile._id)} className="rounded border px-2 py-1.5 text-sm disabled:opacity-40">↓</button>
                      <button type="button" onClick={() => editProfile(profile)} className="rounded border px-3 py-1.5 text-sm">Edit</button>
                      <button type="button" onClick={() => void toggleProfile(profile)} className="rounded border px-3 py-1.5 text-sm">
                        {profile.active ? "Deactivate" : "Reactivate"}
                      </button>
                    </div>
                  </article>
                ))}
                {!editingAccount && <p className="text-xs text-muted-foreground">The staff member will receive a secure account setup link at this address after creation.</p>}
              </section>
            );
          })}
        </div>
        <form onSubmit={saveProfile} className="h-fit space-y-4 rounded border p-5">
          <h2 className="font-semibold">{editingProfile ? "Edit team profile" : "Add public team profile"}</h2>
          <label className="block space-y-1.5 text-sm font-medium">Name
            <input required value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} className="mt-1 block h-10 w-full rounded border px-3" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">Position
            <input required value={profileForm.position} onChange={(event) => setProfileForm((current) => ({ ...current, position: event.target.value }))} className="mt-1 block h-10 w-full rounded border px-3" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">Directory section
            <select value={profileForm.category} onChange={(event) => setProfileForm((current) => ({ ...current, category: event.target.value as ProfileForm["category"] }))} className="mt-1 block h-10 w-full rounded border px-3">
              <option value="leadership">Leadership</option>
              <option value="staff">Programmes, research & operations</option>
              <option value="volunteer">Volunteers</option>
            </select>
          </label>
          <label className="block space-y-1.5 text-sm font-medium">Login account
            <select value={profileForm.accountId} onChange={(event) => setProfileForm((current) => ({ ...current, accountId: event.target.value }))} className="mt-1 block h-10 w-full rounded border px-3">
              <option value="">Not linked to an account</option>
              {accounts.filter((account) => !account.isBlocked).map((account) => (
                <option key={account._id} value={account._id}>{account.name} — {account.email}</option>
              ))}
            </select>
            <span className="block text-xs font-normal text-muted-foreground">Linking an account displays its biography and published posts on this profile.</span>
          </label>
          <label className="block space-y-1.5 text-sm font-medium">Biography
            <textarea value={profileForm.bio} onChange={(event) => setProfileForm((current) => ({ ...current, bio: event.target.value }))} maxLength={5000} rows={6} className="mt-1 block w-full rounded border p-3" placeholder="Add a public biography for this team member." />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">Photo
            <input type="file" accept="image/*" onChange={(event) => setProfileImage(event.target.files?.[0] ?? null)} className="mt-1 block w-full text-sm" />
          </label>
          <div className="flex gap-2">
            <button disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : "Save profile"}</button>
            {editingProfile && <button type="button" onClick={() => { setEditingProfile(null); setProfileForm(emptyProfile); setProfileImage(null); }} className="rounded border px-4 py-2 text-sm">Cancel</button>}
          </div>
        </form>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-bold">Login-capable staff accounts</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading accounts...</p> : accounts.map((account) => (
            <article key={account._id} className="flex flex-wrap items-center justify-between gap-3 rounded border p-3">
              <div>
                <p className="font-semibold">{account.name}</p>
                <p className="text-sm text-muted-foreground">{account.email} · {account.position}</p>
                <p className="text-xs">{account.isBlocked ? "Deactivated" : account.isVerified ? "Active" : "Invitation pending"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!account.isBlocked && !account.isVerified && <button type="button" onClick={() => void invite(account)} className="rounded border px-3 py-1.5 text-sm">Send invite</button>}
                <button type="button" onClick={() => editAccount(account)} className="rounded border px-3 py-1.5 text-sm">Edit</button>
                <button type="button" onClick={() => void toggleAccount(account)} className="rounded border px-3 py-1.5 text-sm">{account.isBlocked ? "Reactivate" : "Deactivate"}</button>
              </div>
            </article>
          ))}
        </div>
        <form onSubmit={editingAccount ? saveAccount : createAccount} className="h-fit space-y-4 rounded border p-5">
          <h2 className="font-semibold">{editingAccount ? "Edit staff account" : "Create staff account"}</h2>
          {([
            ["name", "Name", "text"],
            ["email", "Organization webmail", "email"],
            ["position", "Position", "text"],
          ] as const).map(([field, label, type]) => (
            <label key={field} className="block space-y-1.5 text-sm font-medium">{label}
              <input type={type} required={field !== "position"} value={accountForm[field]} onChange={(event) => setAccountForm((current) => ({ ...current, [field]: event.target.value }))} className="mt-1 block h-10 w-full rounded border px-3" />
            </label>
          ))}
          <label className="block space-y-1.5 text-sm font-medium">Biography
            <textarea value={accountForm.bio} onChange={(event) => setAccountForm((current) => ({ ...current, bio: event.target.value }))} maxLength={5000} rows={5} className="mt-1 block w-full rounded border p-3" placeholder="Staff biography" />
          </label>
          <div className="flex gap-2">
            <button disabled={saving} className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : editingAccount ? "Save account" : "Create account and send setup link"}</button>
            {editingAccount && <button type="button" onClick={() => { setEditingAccount(null); setAccountForm({ name: "", email: "", position: "", bio: "" }); }} className="rounded border px-4 py-2 text-sm">Cancel</button>}
          </div>
        </form>
      </section>
    </div>
  );
}
