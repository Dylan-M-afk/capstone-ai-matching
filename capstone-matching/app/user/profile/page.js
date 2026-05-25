import Image from "next/image";

export default function Home() {
  return (
    <div className="profile-page-container ">

      <p className="profile-header-text">Student Profile</p>

      <div className="profile-content-container">

        <div className="profile-content-left">

          <div className="profile-form-row ">
            <label className="profile-form-label">
              Full Name:
            </label>
            <input
              className="profile-form-field"
              id="fullname"
              type="text"
              placeholder="Jane Doe">
            </input>
          </div>

          <div className="profile-form-row ">
            <label className="profile-form-label">
              Program:
            </label>
            <input
              className="profile-form-field"
              id="program"
              type="text"
              placeholder="Bachelors of Engineering">
            </input>
          </div>

          <div className="profile-form-row ">
            <label className="profile-form-label">
              Skills (comma seperated):
            </label>
            <input
              className="profile-form-field"
              id="skills"
              type="text"
              placeholder="Java, HTML, Python, ...">
            </input>
          </div>

          <div className="profile-form-row ">
            <label className="profile-form-label">
              Skills (comma seperated):
            </label>
            <input
              className="profile-form-field"
              id="skills"
              type="text"
              placeholder="Java, HTML, Python, ...">
            </input>
          </div> 

          <div className="profile-form-row ">
            <label className="profile-form-label">
              Bio:
            </label>
            <textarea
              className="profile-form-field h-20"
              id="skills"
              type="text"
              placeholder=" I am an experienced junior backend-engineer with specialisation for the spring framework...">
            </textarea>
          </div> 

        </div>

        <div className="profile-content-right">
          test
        </div>
      </div>

    </div>
  );
}
