export default function Footer() {
  return (
    <footer className='mt-10 sm:mt-0 sm:fixed bottom-0 right-0 left-0 m-auto py-2'>
      <p className='text-center text-gray-500 text-sm'>
        Imágenes pixeladas con{' '}
        <a
          href='https://cloudinary.com/'
          target='_blank'
          rel='noreferer'
          className='underline'
        >
          Cloudinary
        </a>
        . Pistas por{' '}
        <a
          href='https://wikipedia.com/'
          target='_blank'
          rel='noreferer'
          className='underline'
        >
          Wikipedia
        </a>
      </p>
      <p className='text-center text-gray-500 text-sm'>
        Hecho con{' '}
        <a
          href='https://astro.build/'
          target='_blank'
          rel='noreferer'
          className='underline'
        >
          Astro
        </a>{' '}
        por
        <a
          href='https://github.com/joaquinarias989'
          className='font-bold text-gray-400'
        >
          Joaquín Arias 🙍🏽‍♂️
        </a>
      </p>
    </footer>
  );
}
