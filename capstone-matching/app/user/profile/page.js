import Image from "next/image";

export default function Home() {
  return (
    <div className="profile-page-container ">

      {/* Header */}
      <p className="profile-header-text">Student Profile</p>

      <form className="profile-content-container">

        <div className="profile-content-lr">

          {/* Standard Fields */}
          <div className="profile-content-left">

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Full Name:
              </label>
              <input
                className="profile-form-field"
                id="fullname"
                name="fullname"
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
                name="program"
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
                name="skills"
                type="text"
                placeholder="Java, HTML, Python, ...">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Availability:
              </label>
              <input
                className="profile-form-field"
                id="skills"
                name="availability"
                type="text"
                placeholder="Mon-Fri 9AM-5PM">
              </input>
            </div>

            <div className="profile-form-row ">
              <label className="profile-form-label">
                Bio:
              </label>
              <textarea
                className="profile-form-field h-20"
                id="skills"
                name="bio"
                type="text"
                placeholder="I am an experienced junior backend-engineer with specialisation for the spring framework...">
              </textarea>
            </div>

          </div>

          {/* Skills */}
          <div className="profile-content-right">

            <div className="profile-form-row ">
              <div className="profile-experience-label-row ">
                <label className="profile-form-label w-140">
                  Experience:
                </label>
                <label className="profile-form-label text-right">
                  Years:
                </label>
              </div>

              <div className="profile-experience-row ">
                <input
                  className="profile-experience-company-field w-140"
                  id="fullname"
                  type="text"
                  placeholder="Generic Company LLC.">
                </input>
                <input
                  className="profile-experience-date-field w-20"
                  id="fullname"
                  type="number"
                  placeholder="2">
                </input>
              </div>
              <button className="profile-add-experience-button">Add Experience</button>

              {/* Experience List */}
              <div className="profile-experience-item-list">
                <label className="profile-form-label w-140 ">
                  Experience Items:
                </label>

                <div className="profile-experience-item-container">
                  <div className="experience-item">
                    <p className="experience-item-text">ABC Corporation LTD. <span className="experience-item-years"> (3 Years)</span></p>
                  </div>
                  <button className="experience-item-delete">X</button>
                </div>

                <div className="profile-experience-item-container">
                  <div className="experience-item">
                    <p className="experience-item-text">ABC Corporation LTD. <span className="experience-item-years"> (3 Years)</span></p>
                  </div>
                  <button className="experience-item-delete">X</button>
                </div>

              </div>





            </div>

          </div>

        </div>

        <div className="profile-content-bottom">
          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-value"></div>
          </div>

          {/* Submit Button */}
          <button className="button">Save Changes</button>
        </div>

      </form>

    </div>
  );
}
