import { ReactNode } from 'react';
import Image from 'next/image';

interface ResourceCardProps {
  image: string;
  imageAlt: string;
  link: string;
  content: ReactNode;
  backgroundColor: string;
  className?: string
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  image,
  imageAlt,
  link,
  content,
  backgroundColor,
  className
}) => {
  return (
    <div className="card shadow-xl">
      <a
        target="_blank"
        href={link}
        className="cursor-pointer"
        style={{ backgroundColor }}
      >
        <figure
          style={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingTop: '56.25%'
          }}
        >
          <Image
            src={image}
            alt={imageAlt}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill={true}
            objectFit="cover"
            objectPosition="top"
            className={className}
          />
        </figure>
      </a>
      <div className="card-body text-center">{content}</div>
    </div>
  );
};

export default ResourceCard;
