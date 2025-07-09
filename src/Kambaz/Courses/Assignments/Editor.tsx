export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3>Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" /> <br /><br />

      <textarea id="wd-description" rows={6} cols={60}>
The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      <br /><br />

      <label htmlFor="wd-points"><b>Points</b></label><br />
      <input id="wd-points" type="number" defaultValue={100} />


      <label htmlFor="wd-group"><b>Assignment Group</b></label><br />
      <select id="wd-group">
        <option>ASSIGNMENTS</option>
        <option>Labs</option>
        <option>Evaluation</option>
      </select><br /><br />

      <label htmlFor="wd-display-grade"><b>Display Grade as</b></label><br />
      <select id="wd-display-grade">
        <option>Percentage</option>
        <option>Points</option>
        <option>Letter</option>
      </select><br /><br />

      <label htmlFor="wd-submission-type"><b>Submission Type</b></label><br />
      <select id="wd-submission-type">
        <option>Online</option>
        <option>In Person</option>
      </select><br /><br />

      <b>Online Entry Options</b><br />
      <input type="checkbox" id="text-entry" />
      <label htmlFor="text-entry"> Text Entry</label><br />
      <input type="checkbox" id="url" />
      <label htmlFor="url"> Website URL</label><br />
      <input type="checkbox" id="media" />
      <label htmlFor="media"> Media Recordings</label><br />
      <input type="checkbox" id="annotation" />
      <label htmlFor="annotation"> Student Annotation</label><br />
      <input type="checkbox" id="upload" />
      <label htmlFor="upload"> File Uploads</label><br /><br />

      <label htmlFor="wd-assign-to"><b>Assign to</b></label><br />
      <input id="wd-assign-to" value="Everyone" /><br /><br />

      <label htmlFor="wd-due"><b>Due</b></label><br />
      <input type="date" id="wd-due" defaultValue="2025-07-15" />


      <label htmlFor="wd-available-from"><b>Available from</b></label><br />
     <input type="date" id="wd-available-from" defaultValue="2025-07-10" />


      <label htmlFor="wd-available-until"><b>Until</b></label><br />
      <input type="date" id="wd-available-until" defaultValue="2025-07-20" />


      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
