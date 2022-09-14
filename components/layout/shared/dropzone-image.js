import Image from "next/image";

function DropZoneImage({ image }) {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "20%" }}>
      {/* <Image src={image.src} alt={image.alt} width={image.width} height={image.height} /> */}
      <Image src={image.src} alt="" layout="fill" objectFit="contain" />
    </div>
  );
}
export default DropZoneImage;