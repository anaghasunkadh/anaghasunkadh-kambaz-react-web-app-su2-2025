export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>

      {/* First Example: Basic horizontal layout */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red">Column 3</div>
      </div>

      <br /><br />

      {/* Second Example: Using flex-grow */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>

      <br /><br />

      {/* Third Example: Fixed and flexible widths */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
        <div className="wd-bg-color-blue wd-flex-grow-1">Column 2</div>
        <div className="wd-bg-color-red wd-width-75px">Column 3</div>
      </div>
    </div>
  );
}
