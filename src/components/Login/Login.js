import styles from './Login.module.scss'

export default function Login ({
  login,
  credentials,
  handleChangeAuth
}) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        login()
      }}
      >
        <input type='text' value={credentials.email} name='email' onChange={handleChangeAuth} placeholder='Email Here' />
        <input type='password' value={credentials.password} name='password' onChange={handleChangeAuth} placeholder='Password' />
        <input type='submit' value='Login as an Existing User' />
      </form>
    </>
  )
}
