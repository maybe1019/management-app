# Secberus UI Components

## Set up

### To run Storybook

1. Run `yarn`
2. Run `yarn storybook`


### To encode svgs for use in css:

1. Add `.svg` files to the public `/images` dir
2. Run `yarn encode-svgs`
3. Add to theme object as `url("${encodedSvg}")` so we can access them wherever we import this library
