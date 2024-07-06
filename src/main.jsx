import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from 'src/redux/store.js'
import { Toaster } from 'react-hot-toast'
import {ThemeProvider} from "@/utils/ThemeContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          // Define default options
          // className: '',
          // duration: 5000,
          // style: {
          //   background: '#363636',
          //   color: '#fff',
          // },

          // Default options for specific types
          success: {
            duration: 5000,
            // theme: {
            //   primary: 'green',
            //   secondary: 'black',
            // },
          },
        }}
      />
    </BrowserRouter>
    </ThemeProvider>

  </Provider>,
)

// import { CircleAlert, CircleCheckBig } from 'lucide-react'
// import { Toaster } from 'src/components/ui/sonner'
{
  /* <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-white bg-green-700',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
          className: 'text-base	 ',
        }}
        icons={{
          success: <CircleCheckBig />,
          warning: <CircleAlert />,
          error: <CircleAlert />,
        }}
      /> */
}
