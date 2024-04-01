import '@translations/i18n'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { store } from 'src/redux'
import Router from './routes'
import { themes, useTheme } from '@theme'
import { AppToast } from './components'
// ..
AOS.init()

function App() {
  const { theme, themeLoaded } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(themes.theme.light)
  }, [themeLoaded])

  return (
    <Provider store={store}>
      <ThemeProvider theme={selectedTheme || themes.theme.light}>
        <BrowserRouter>
          <Router />
          <AppToast />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
