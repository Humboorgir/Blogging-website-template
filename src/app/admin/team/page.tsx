import Link from "next/link";

export default function TeamPage() {
  return (
    <main className="admin-frame">
      <header className="admin-header">
        <Link href="/admin" className="wordmark">
          FIELD<span> / </span>NOTES
        </Link>
        <nav className="site-nav">
          <Link href="/admin">Dashboard</Link>
        </nav>
      </header>
      <section className="team-page">
        <p className="eyebrow">Private workspace / Access</p>
        <h1>Team access.</h1>
        <p className="admin-muted">Manage the people who can publish to this publication.</p>
        <div className="team-row">
          <div>
            <strong>Admin account</strong>
            <span>admin@example.com</span>
          </div>
          <button className="admin-button secondary">Change password</button>
        </div>
        <div className="invite-box">
          <h2>Add an admin</h2>
          <p>Give another owner access to the writing desk.</p>
          <form className="admin-form">
            <label>
              Email
              <input type="email" placeholder="owner@example.com" />
            </label>
            <button className="admin-button" type="button">
              Add admin <span>+</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
