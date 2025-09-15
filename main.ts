namespace image {
   let images: Image[];

   export const BEHIND_SPRITES_PRIORITY = -1
   export const SPRITE_FRONT_OF_HUD_Z_PRIORITY = 200

   export enum ImageFlags {
        None = 0,
        AutoDestroy = 1 << 1, 
        Invisible = 1 << 2,
        ImageDestroyed = 1 << 3
    }

    let flags: number = 0

   export function setFlag(flag: ImageFlags, on: boolean) {
        if (on) flags |= flag
        else flags = ~(~flags | flag);
        __preUpdate()
   }
   
   export function addImage(image: Image) {
       images.push(image)
   }

   export function removeImage(image: Image) {
       images.removeElement(image)
   }

   export function __preUpdate() {
       __autoDestroy()
       __invisible()
       __imageDestroyed()
   }

    function __invisible() {
        scene.createRenderable(BEHIND_SPRITES_PRIORITY, (image) => {
         image.drawTransparentImage(
            img`.`,
            image.width,
            image.height 
         )
        })
     }

    function __autoDestroy() {
     if(flags === ImageFlags.AutoDestroy) {
       __create().drawTransparentImage(
           img`.`,
        __create().width,
        __create().height
       )
     }
   }

    function __imageDestroyed() { 
      if(flags === ImageFlags.ImageDestroyed) {
          scene.createRenderable(BEHIND_SPRITES_PRIORITY, (image: Image) => {
           image.drawTransparentImage(
               img`.`,
               image.width,
               image.height
           )
       })
      }
    }
    
// this will make issues
     function __createAsDefaultedImage() {
        scene.createRenderable(BEHIND_SPRITES_PRIORITY,(image) => {
            // __create() = image this makes a core issue because it is a function 
        })
    }
    
    //  for making the sprite to be up to the default screen width and height demension of the screen.
   export function __create() {return image.create(160, 120)}
}