// Later we will have to add multiple import statements for different
// components and that will add a huge input over there, so to avoid that we 
// are importing as an object from the components folder,
// that's why we are using this file. So index.js will handle all these imports.
export { default as Header } from './Header'
export { default as MainContainer  } from './MainContainer'
export { default as CreateContainer } from './CreateContainer'
export { default as HomeContainer } from './HomeContainer'
export { default as Loader } from './Loader'

