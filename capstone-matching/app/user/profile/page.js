import Image from "next/image";

export default function Home() {
  return (
    <div className="profile-page-container ">

      <p className="profile-header-text">Student Profile</p>

      <div className="profile-content-container">

        <div className="profile-content-lr">

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
                placeholder="I am an experienced junior backend-engineer with specialisation for the spring framework...">
              </textarea>
            </div>

          </div>

          <div className="profile-content-right">

            <div className="profile-form-row ">
              <div className="profile-skills-label-row ">
                <label className="profile-form-label w-140">
                  Experience:
                </label>
                <label className="profile-form-label text-right">
                  Years:
                </label>
              </div>



              <div className="profile-skills-row ">
                <input
                  className="profile-skills-company-field w-140"
                  id="fullname"
                  type="text"
                  placeholder="Generic Company LLC.">
                </input>
                <input
                  className="profile-skills-date-field w-20"
                  id="fullname"
                  type="number"
                  placeholder="2">
                </input>


              </div>


            </div>

          </div>

        </div>

        <div className="profile-content-bottom">
          <div className="progress-bar-container">
            <div className="progress-bar-value"></div>
          </div>

          <button className="button">Save Changes</button>
        </div>

      </div>

    </div>
  );
}
