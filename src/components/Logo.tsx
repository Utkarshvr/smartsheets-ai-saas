import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <Image
        src="/logo-black.svg"
        alt="SmartSheets AI"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <h1 className="font-semibold text-2xl">
          {process.env.NEXT_PUBLIC_APP_NAME || "SmartSheets AI"}
        </h1>
        <span className="text-sm text-muted-foreground">
          {process.env.NEXT_PUBLIC_APP_TAGLINE || "Made for Teachers"}
        </span>
      </div>
    </div>
  );
}
