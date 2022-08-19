import { useState } from 'react'
import Loggito from './utils/loggito'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Feedback from './components/Feedback'
import Context from './utils/Context'

function App() {

    const logger = new Loggito('App')

    const [view, setView] = useState(sessionStorage.token ? 'home' : 'login')
    const [feedback, setFeedback] = useState({ message: null, level: null })

    const handleNavigationToRegister = () => {

        setView('register')

        logger.debug('setView', 'register')
    }

    const handleNavigationToLogin = () => {

        setView('login')

        logger.debug('setView', 'login')
    }

    const handleNavigationToHome = () => {

        setView('home')

        logger.debug('setView', 'home')
    }

    const handleLogoutClick = () => {
        delete sessionStorage.token

        handleNavigationToLogin()
    }

    const handleAcceptFeedback = () => {
        const feedback = { message: null, level: null }

        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    const handleFeedback = feedback => {
        setFeedback(feedback)

        logger.debug('setFeedback', feedback)
    }

    const toggleTheme = () => document.documentElement.classList.toggle('dark')

    logger.info('render')

    return <Context.Provider value={{handleFeedback, toggleTheme} }>
        <div className="App container container--full">
            {view === 'login' && <LoginPage onLinkClick={handleNavigationToRegister} onLogin={handleNavigationToHome} />}

            {view === 'register' && <RegisterPage onLinkClick={handleNavigationToLogin} onRegister={handleNavigationToLogin} />}

            {view === 'home' && <HomePage onLogoutClick={handleLogoutClick} />}

            {feedback.message && <Feedback level={feedback.level} message={feedback.message} onClick={handleAcceptFeedback} />}
        </div>
    </Context.Provider >
}

export default App
