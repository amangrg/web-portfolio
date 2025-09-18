import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

const TOTAL_IMAGES = 18

const images = Array.from({ length: TOTAL_IMAGES }, (_, index) => ({
  src: `/images/art-${index}.png`,
  alt: `Artwork ${index + 1}`,
}))

export default function ArtCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentIndex((previous) => (previous + 1) % TOTAL_IMAGES)
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((previous) =>
      (previous - 1 + TOTAL_IMAGES) % TOTAL_IMAGES
    )
  }, [])

  const selectImage = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext()
      }
      if (event.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext, handlePrevious])

  const currentImage = useMemo(
    () => images[currentIndex],
    [currentIndex]
  )

  return (
    <div className="art-carousel">
      <div className="art-carousel__stage">
        <Image
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt}
          width={1125}
          height={750}
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? undefined : 'lazy'}
          sizes="(max-width: 768px) 100vw, 1125px"
          className="next-image art-carousel__image"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div className="art-carousel__controls" aria-live="polite">
        <button
          type="button"
          onClick={handlePrevious}
          className="art-carousel__control-button"
        >
          Previous
        </button>
        <span className="art-carousel__counter">
          {currentIndex + 1} / {TOTAL_IMAGES}
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="art-carousel__control-button"
        >
          Next
        </button>
      </div>

      <div
        className="art-carousel__thumbnails"
        role="list"
        aria-label="Artwork thumbnails"
      >
        {images.map((image, index) => (
          <button
            type="button"
            key={image.src}
            onClick={() => selectImage(index)}
            className="art-carousel__thumbnail"
            aria-label={`Show ${image.alt}`}
            aria-current={index === currentIndex}
            role="listitem"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={133}
              loading="lazy"
              sizes="(max-width: 600px) 33vw, 200px"
              className="art-carousel__thumbnail-image"
              style={{ width: '100%', height: 'auto' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
