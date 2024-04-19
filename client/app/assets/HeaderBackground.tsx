import Image from "next/image";

export function BackgroundImage() {
  return (
    <Image
      src={`/background.png`}
      alt="background"
    />
  );
}
