import Image, { ImageProps } from 'next/image'

type CustomImageProps = Omit<ImageProps, 'alt'> & { alt?: string }

export function CustomImage({ alt = '', width = 36, height = 36, ...rest }: CustomImageProps) {
  // next/image에 넘길 때는 항상 문자열이 되도록 보정
  return <Image alt={alt} width={width} height={height} {...rest} />
}
