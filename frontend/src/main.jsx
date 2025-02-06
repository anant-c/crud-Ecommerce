import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

// Define a custom theme with default color mode set to 'dark'
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Set default theme to dark
    useSystemColorMode: false, // Disable automatic system preference detection
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App/>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
