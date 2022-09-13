import Image from "next/image";

function DropZoneImage({ image }) {
  console.log(image)
  return (
    <div>
      {/* <Image src={image.src} alt={image.alt} width={image.width} height={image.height} /> */}
      <Image src={image.src} alt="test" width="50" height="50" /> Image Name
    </div>
  );
}
export default DropZoneImage;