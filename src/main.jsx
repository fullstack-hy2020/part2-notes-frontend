import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter as Router,
} from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
