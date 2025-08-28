"use client";

import { Button } from "@/components/ui/button";
import { ShimmerProfileMenu, ShimmerButton } from "@/components/ui/shimmer";
import { ProfileMenu } from "./profile-menu";
import { LoginMenu } from "./login-menu";
import { useSession } from "@/hooks/use-session";



interface AuthButtonProps {
    variant?: "default" | "mobile";
}

export const AuthButton = ({ variant = "default" }: AuthButtonProps) => {
    const { user, isLoading, error } = useSession();

    // Show shimmer while loading OR during the brief moment when loading is done but no clear state yet
    if (isLoading) {
        if (variant === "mobile") {
            return <ShimmerButton />;
        }
        return <ShimmerProfileMenu />;
    }

    // If we have a user, show profile menu
    if (user && !error) {
        return <ProfileMenu />;
    }

    // If loading is complete and no user, show login menu
    if (!isLoading && !user) {
        return <LoginMenu variant={variant} />;
    }

    // Fallback: show shimmer to prevent empty state
    if (variant === "mobile") {
        return <ShimmerButton />;
    }
    return <ShimmerProfileMenu />;
};