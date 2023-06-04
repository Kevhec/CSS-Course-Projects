import sharp from 'sharp'

/**
 * 
 * @param {string} format 
 * @param {Array<string> | string} input 
 */
function imgToModernFormats(format, input) {
  let paths = input
  if (typeof input === 'string') paths = [input]

  paths.forEach(async path => {
    let fileName = path.split('/').slice(-1)[0].split('.')[0]
    await sharp (path)
      .toFormat(format)
      .toFile(`public/assets/processed_images/${fileName}.${format}`)
  })
}

imgToModernFormats('webp', ['public/assets/original/app.jpg', 'public/assets/original/header.jpg'])
imgToModernFormats('avif', ['public/assets/original/app.jpg', 'public/assets/original/header.jpg'])
