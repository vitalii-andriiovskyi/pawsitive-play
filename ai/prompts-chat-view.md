# Prompts

## Prompt for Ask Mode demo

I need to optimize images on the website. It’s recommended to apply the concept of responsive images. Could you explain this concept and share some examples? Please, include sources you took information from.

## Prompt for Service Component

Add the component that displays information about a service a company provides. It should show a title, subtitle, description, and an image.

The view should be split into two columns. The image should be in the left column, and the rest of the content should be in the right column.

The component takes a property `content` with the data to show to a customer. An example of this data is:

``` typescript
{
  title: "Dog Walking",
  subtitle: "Professional Dog Walking Services",
  description: "We offer professional dog walking services to keep your furry friend happy and healthy.",
  image: {
    src: "/images/dog-walking.jpg",
    alt: "A happy dog being walked",
    width: 600,
    height: 400,
  },
};
```

Use TailWind to style the view.

While creating the TypeScript interface to describe component’s properties, use the Image interface from the file #Image

For the image in UI, use component <Image /> like it is shown on the page
https://nextjs.org/docs/app/api-reference/components/image

Add property sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" to <Image /> component