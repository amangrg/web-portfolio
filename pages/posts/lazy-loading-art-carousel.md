---
layout: post
title: 'Building a Lazy Loading Artwork Carousel'
description: How I replaced a long image list with a keyboard friendly, lazy loaded carousel
date: 2024-03-05
tag: web development
---

When I first published my art page I dropped eighteen high resolution images on the screen at once. It looked gorgeous but the
initial load was terrible—every file was fetched eagerly because each `<Image />` component had `priority` enabled. Visitors on
mobile or slower connections paid the price for my enthusiasm.

I wanted something that felt better to browse and also respected bandwidth, so I built a carousel. Here's how it works.

## 1. Only render the image you need

Instead of mapping over every artwork, the carousel holds an index in React state. The main stage only renders a single
`<Image />` component bound to that index. Because the rest of the images are not in the tree, Next.js waits to load them until
they are requested, which slashes the page's initial network waterfall.

```jsx
const [currentIndex, setCurrentIndex] = useState(0)
const currentImage = images[currentIndex]

<Image
  src={currentImage.src}
  alt={currentImage.alt}
  priority={currentIndex === 0}
  loading={currentIndex === 0 ? 'eager' : 'lazy'}
  sizes="(max-width: 768px) 100vw, 1125px"
  style={{ width: '100%', height: 'auto' }}
/>
```

The very first artwork still uses `priority` so the page feels instant on load, but every subsequent slide is lazy loaded by the
browser.

## 2. Add friendly controls

Buttons labelled “Previous” and “Next” drive the index forward and backward. I also register left and right arrow keys so that
browsing with a keyboard feels natural. The active slide indicator (“3 / 18”) updates automatically because it is derived from
the same piece of state.

```jsx
useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') handleNext()
    if (event.key === 'ArrowLeft') handlePrevious()
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [handleNext, handlePrevious])
```

## 3. Lazy thumbnails for quick jumps

Finally, I render a horizontal strip of thumbnail buttons. They use the same Next.js image component but rely on the default
lazy behaviour. That keeps the DOM light while still giving visitors a fast way to jump directly to a particular illustration.

```jsx
<button
  type="button"
  onClick={() => selectImage(index)}
  aria-current={index === currentIndex}
>
  <Image
    src={image.src}
    alt={image.alt}
    loading="lazy"
    sizes="(max-width: 600px) 33vw, 200px"
  />
</button>
```

The end result is a page that loads quickly, feels smooth on mobile, and stays fun to explore. I'm excited to keep iterating on
this pattern for future galleries.
