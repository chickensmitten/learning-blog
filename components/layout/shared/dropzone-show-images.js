import DropZoneImage from "./dropzone-image";

function DropZoneShowImages({images}) {
  const show = (image) => {
    return <DropZoneImage key={image.id} image={image} />
  };
  return <div className="container">{images.map(show)}</div>;
}

export default DropZoneShowImages;