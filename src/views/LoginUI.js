
export default () => {

  return(`
     <div className="page-div">
  <div className="row">
    <div className="title-container"> 
      <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
        <path fillRule="evenodd" d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
      </svg>
      <h1> Billed </h1>
    </div>
  </div>
  <div className="row">
    <div className="card-body">
      <div className="col-sm-6">
        <div className="card">
          <form className="form-signin" data-testid="form-employee">
            <h2 className="h3 mb-3 font-weight-normal">Employee</h2>
            <label htmlFor="inputEmail">Email</label>
            <input type="email" data-testid="employee-email-input" className="form-control" placeholder="johndoe@email.com" required autofocus />
            <label htmlFor="inputPassword">Password</label>
            <input type="password" data-testid="employee-password-input" className="form-control" placeholder="******" required />
            <button className="btn btn-lg btn-primary btn-block" data-testid="employee-login-button" style={{backgroundColor: '#0E5AE5'}} type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
          <form className="form-signin" data-testid="form-admin">
            <h2 className="h3 mb-3 font-weight-normal">Administration</h2>
            <label htmlFor="inputEmail">Email</label>
            <input type="email" data-testid="admin-email-input" className="form-control" placeholder="johndoe@email.com" required autofocus />
            <label htmlFor="inputPassword">Password</label>
            <input type="password" data-testid="admin-password-input" className="form-control" placeholder="******" required />
            <button type="submit" className="btn btn-lg btn-primary btn-block" data-testid="admin-login-button" style={{backgroundColor: '#0E5AE5'}}>Log in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  `)
}
  