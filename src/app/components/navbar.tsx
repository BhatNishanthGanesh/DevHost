import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { jwtDecode } from 'jwt-decode';
import { useRouter } from "next/navigation";
import { SlideTabsExample } from "@/app/components/SlideTabsExample";
import StaggeredDropDown from "@/app/components/StraggerdDropMenu";  

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const route = useRouter();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("auth_token");
    const userFromStorage = localStorage.getItem("user");
    if (tokenFromStorage && userFromStorage) {
      setUser(jwtDecode(tokenFromStorage));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    toast.success('Logged out successfully');
    setTimeout(() => {
      route.push('/');
      setUser(null);
    }, 2000);
  };

  return (
    <div className="flex justify-between fixed items-center shadow-lg bg-white dark:bg-gray-800 p-4 text-neutral-200 w-full z-50">
      <div className="flex items-center">
        {user ? (
          <>
            {/* <Link href="/admin/User" className="text-black dark:text-white ml-2">{user?.role}</Link> */}
            <Link
  href={user?.role === "user" ? "/admin/User" : "/admin/Aluminee"}
  className="text-black dark:text-white ml-2"
>
  {user?.role}
</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer ml-2">
                  <Avatar>
                    <AvatarImage src={user?.avatarUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrMZls0XjjU5szZzcmkHZH7Geb4ngV8-rGwA&s"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <p>Please log in.</p>
        )}
      </div>

      <div className="flex-grow flex justify-center items-center space-x-4">
        {/* <SlideTabsExample /> */}
      </div>
       
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] text-black transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StaggeredDropDown />
      {user?.role !== "alumni" && (
        <div className="ml-4">
          <Link href="/admin/User/postals">
            <Button>Get all the postings</Button>
          </Link>
        </div>
      )}
          
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-neutral-200">
          <FiMenu size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-neutral-900 p-4 md:hidden">
          <SlideTabsExample />
        </div>
      )}
    </div>
  );
};
