"use client";

interface ComingSoonProps {
  pageTitle?: string;
}

export default function ComingSoon({ pageTitle }: ComingSoonProps) {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] rounded-2xl shadow-lg w-full max-w-4xl aspect-video text-center text-white flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Coming Soon
        </h1>
        <p className="text-lg text-white/90 max-w-md mx-auto">
          We're working hard to bring you an amazing experience.
        </p>
      </div>
    </div>
  );
}
