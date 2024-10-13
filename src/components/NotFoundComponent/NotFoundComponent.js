import Link from "next/link";

export default function NotFoundComponent() {
  return (
    <div className="w-full h-svh bg-blue p-6 flex flex-col justify-center items-center">
      {/* Error message indicating the page was not found */}
      <h1 className="uppercase text-center text-gold mb-4">
        Oops!{" "}
        <span className="font-serif font-bold text-5xl sm:text-9xl">404</span>
      </h1>
      <h3 className="uppercase text-center text-white mb-6">
        The page you are looking for does not exist.
      </h3>
      {/* Link to return to the homepage */}
      <Link href="/" className="btn btn-gold">
        Return Home
      </Link>
    </div>
  );
}
