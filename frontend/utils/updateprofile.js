
export function updateProfile(userProfile) {
    if ($$("profile_view")) {
        $$("profile_view").parse({
            fullName: userProfile.fullName,
            email: userProfile.email
        });
    }
}
