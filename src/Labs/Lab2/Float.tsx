export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float</h2>

      {/* Part 1: Floating images with text */}
      <div>
        <img className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        Lorem ipsum dolor sit amet consectetur adipisicing elit...
        <img className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        More Lorem ipsum...
        <img className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        Even more Lorem...
        <img className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        Final paragraph text...
        <div className="wd-float-done"></div>
      </div>

      <br /><br /><br />

      {/* Part 2: Horizontal layout using float */}
      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <img className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
}
