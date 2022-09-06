import registerUser from '../logic/registerUser'
import Loggito from '../utils/loggito'
import withContext from '../utils/withContext'

function RegisterPage({ onRegister, onLinkClick, context: { handleFeedback } }) {

    const logger = new Loggito(RegisterPage.name)

    logger.info('constructor')

    const handleFormSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const { name: { value: name },
            email: { value: email },
            password: { value: password }
        } = form

        try {
            registerUser(name, email, password, function (error) {
                if (error) {

                    handleFeedback({ message: error.message, level: 'error' })

                    logger.warn(error.message)

                    return
                }

                handleFeedback({ message: 'your user has been registered', level: 'success' })

                event.target.reset()

                onRegister()

            })
        } catch (error) {

            handleFeedback({ message: error.message, level: 'error' })

            logger.warn(error.message)
        }

    }

    const handleLinkClick = event => {
        event.preventDefault()

        onLinkClick()
    }

    logger.info('render')

    return <main className="register-page page">
        <form className="form" method="get" onSubmit={handleFormSubmit}>

            <label htmlFor="name">User</label>
            <input className="input" type="text" name="name" placeholder="name" id="name-reg" />

            <label htmlFor="email">Email</label>
            <input className="input" type="email" name="email" placeholder="e-mail" id="email-reg" />


            <label htmlFor="password">Password</label>
            <input className="input" type="password" name="password" placeholder="password" id="password-reg" />

            <button className="button" type="submit">Register</button>

        </form>
        <a className="anchor" href="login-page.html" onClick={handleLinkClick}>Login</a>
    </main>
}

export default withContext(RegisterPage)

