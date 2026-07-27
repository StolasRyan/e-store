import { SignInButton, useAuth } from "@clerk/react";
import { SparklesIcon } from "lucide-react";
import { Link } from "react-router";

const HeroSection = () => {
  const { isSignedIn } = useAuth();
  return (
    <section className="hero bg-linear-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 py-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-105" />
          <img
            src="/image.png"
            alt="Creator"
            className="relative h-72 lg:h-80 rounded-2xl "
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Share Your <span className="text-primary">Products</span>
          </h1>
          <p className="py-4 text-base-content/60">
            Upload, discover, and connect with creators.
          </p>
          {isSignedIn ? (
            <Link to="/create" className="btn btn-primary gap-1">
              <SparklesIcon className="size-4" />
              <span className="hidden sm:inline">Start Selling</span>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="btn btn-primary gap-1">
                <SparklesIcon className="size-4" />
                <span className="hidden sm:inline">Start Selling</span>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
