import Image from 'next/image';

interface IImageCardProps {
  thumbnailUrl: string;
  title: string;
}

function ImageCard({ thumbnailUrl, title }: any) {
  return (
    <div className="relative flex flex-row items-center bg-white p-4 my-4 shadow rounded-lg">
      <div className="relative w-[150px] h-[150px] mr-4">
        <Image src={thumbnailUrl} alt="thumbnail" layout="fill" objectFit='contain' />
      </div>
      <h6 className="text-sm font-medium">{title}</h6>
    </div>
  );
}

export default ImageCard;
