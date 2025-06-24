"use client";
import { login } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { showError, showSuccess } from "@/libs/toast";
import { doLogin } from "@/store/slice/auth-slice";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ username: "", password: "" });
  const { loading, error } = useAppSelector((state) => state.auth);
  const { authenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      showSuccess("Login successful!");
      router.push("/");
    }
  }, [authenticated]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // tránh reload trang
    dispatch(doLogin(form));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="min-w-[200px] max-w-[500px] bg-white flex flex-col justify-center items-center md:border md:px-8 md:py-6 rounded-2xl md:shadow-2xl">
        <Image
          src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/438239357_1197871551199970_4062135167905877969_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHV9tnhydUXMgoL0xxeViRV2krt3c9t7ynaSu3dz23vKaqNObRhuzj73yqrZZTnv0s_kwTY8ENRweAXrGqIbGbs&_nc_ohc=O7Y-6lk3RYYQ7kNvwGkK1p4&_nc_oc=Adm88EWN0VVvokBgkLJZ8vo7BIIID6aCMw4-CEjfnkxYuAwSTdHCMonp_hgDLX6TIZk&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=wF4bewnfI2rCsaN2nrI_HQ&oh=00_AfN94rNKm24a1S07QcJHtJhiKkDLFgZGyJIwgAWWSb_hYw&oe=685C8B6D"
          width={100}
          height={100}
          alt="Tiệm vẽ Climping Rose"
          className="rounded-full md:mb-4"
        />

        <form className="w-full">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold py-2">Tiệm vẽ Climping Rose</h1>
            <p className="text-muted-foreground text-sm text-balance mb-3">
              Enter your email below to login to your account
            </p>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="username"
                placeholder="Enter your username"
                type="text"
                required
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading && <p className="text-sm">Loading...</p>}
              {!loading && <p className="text-sm">Login</p>}
            </Button>
            {/* {error && showError(error)} */}

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            <Button variant="outline" className="w-full">
              <svg
                width="180px"
                height="180px"
                viewBox="0 0 14.00 14.00"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                stroke="#000000"
                strokeWidth="0.00014"
                aria-hidden="true"
              >
                <path
                  fill="#4285f4"
                  d="M12.87999908 7.13331113c0-.49332777-.0400763-.85332837-.12666018-1.22665645H7.12000332v2.22664117h3.30664127c-.066603.55335156-.42664081 1.38668711-1.22665655 1.94665632l-.01121182.07452283 1.781156 1.37983931.12340638.01230915c1.13330234-1.04664784 1.78666048-2.5866559 1.78666048-4.41331233"
                ></path>
                <path
                  fill="#34a853"
                  d="M7.1199995 12.99998274c1.61997706 0 2.97996124-.53335826 3.9733286-1.45332779l-1.89334397-1.46670278c-.506656.35333936-1.18667175.59999942-2.07998463.59999942-1.58665638 0-2.9333128-1.04663353-3.41335881-2.49329787l-.07036253.0059747-1.85207197 1.43333564-.02421753.06736635c.98665649 1.95998474 3.01332819 3.30668669 5.36001523 3.30668669"
                ></path>
                <path
                  fill="#fbbc05"
                  d="M3.70664069 8.18665467c-.1266641-.37332817-.19996928-.7733588-.19996928-1.18667175 0-.41335838.07330146-.81334368.19330516-1.18667175l-.00335496-.07951328-1.87528168-1.45636157-.0613549.0291889c-.40664846.81334368-.63998411 1.7266948-.63998411 2.69335884 0 .96666415.23333565 1.87996937.63998507 2.69331295l1.94665651-1.5066412"
                ></path>
                <path
                  fill="#eb4335"
                  d="M7.1199995 3.31996768c1.12664872 0 1.88663348.48666365 2.31998468.89335887l1.69332861-1.65334353C10.0933434 1.59331888 8.73997656.9999829 7.1199995.9999829c-2.34668704 0-4.37335884 1.34665643-5.36001523 3.30664108l1.9399924 1.5066871c.48670993-1.44666397 1.83336635-2.4933434 3.42002274-2.4933434"
                ></path>
              </svg>
              Login with Google
            </Button>
          </div>

          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>

          <div className="w-full py-2 flex text-gray-500 mt-4">
            <MoveLeft size={20} />
            <Link
              href="/"
              className="underline underline-offset-4 text-sm float-left ml-1"
            >
              back to homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
