import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

// ✅ Default image paths (local or hosted)
const DIGITAI_LOGO = "/digitai-logo.png"  // replace with your actual path or URL
const DEFAULT_USER = "/default-user.png"  // fallback human icon

// ---------- BASE AVATAR ----------
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white/30 shadow-md", className)}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// ---------- AVATAR IMAGE ----------
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    onError={(e) => {
      // fallback background if image fails
      e.target.style.background = "linear-gradient(to-br, #10A51A, #273FCB)"
    }}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// ---------- AVATAR FALLBACK ----------
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// ---------- CUSTOM HOOK ----------
/**
 * A smart avatar wrapper that automatically selects
 * the right image depending on message type.
 * @param {"ai" | "user"} type
 * @param {string} photoURL
 */
export const ChatAvatar = ({ type = "ai", photoURL }) => {
  const src = type === "ai" ? DIGITAI_LOGO : (photoURL || DEFAULT_USER)
  const alt = type === "ai" ? "DigitAI" : "User"

  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{type === "ai" ? "A" : "U"}</AvatarFallback>
    </Avatar>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
